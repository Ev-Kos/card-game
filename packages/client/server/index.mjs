import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import serialize from 'serialize-javascript';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
const port = process.env.CLIENT_PORT || 3000;
const __dirname = path.resolve();
const clientPath = __dirname;
const isDev = process.env.NODE_ENV === 'development';
const api = process.env.API;
async function createServer() {
    const app = express();
    app.use((req, _res, next) => {
        const nonce = crypto.randomBytes(16).toString('base64');
        req.nonce = nonce;
        next();
    });
    app.use(cookieParser());
    let vite;
    if (isDev) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            root: clientPath,
            appType: 'custom',
        });
        app.use(vite.middlewares);
    }
    else {
        app.use(express.static(path.join(clientPath, 'dist/client'), { index: false }));
    }
    app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        const nonce = req.nonce;
        const cspDirectives = [
            `default-src 'self'`,
            `script-src 'self' ${isDev
                ? "'unsafe-inline' 'unsafe-eval'"
                : `'nonce-${nonce}'`}`,
            `style-src 'self' ${isDev
                ? "'unsafe-inline'"
                : `'nonce-${nonce}'`} https://fonts.googleapis.com`,
            `font-src 'self' https://fonts.gstatic.com`,
            `img-src 'self' data: ${api}`,
            `form-action 'self'`,
            `connect-src 'self' ${api} ${isDev ? 'ws://localhost:*' : ''}`,
            `frame-src 'none'`,
            `object-src 'none'`,
        ].join('; ');
        console.log(cspDirectives);
        res.setHeader('Content-Security-Policy', cspDirectives);
        try {
            let render;
            let template;
            if (vite) {
                template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render;
            }
            else {
                template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8');
                const pathToServer = path.join(clientPath, 'dist/server/entry-server.mjs');
                render = (await import(pathToServer)).render;
            }
            const { html: appHtml, initialState } = await render(req);
            const html = template
                .replace(`<!--ssr-outlet-->`, appHtml)
                .replace(`<!--ssr-initial-state-->`, `<script nonce="${nonce}">window.APP_INITIAL_STATE = ${serialize(initialState, { isJSON: true })}</script>`)
                .replace(/%nonce%/g, nonce);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            if (isDev && vite) {
                vite.ssrFixStacktrace(e);
            }
            next(e);
        }
    });
    app.listen(port, () => {
        console.log(`Client is listening on port: ${port}`);
    });
}
createServer();
