import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { createServer as createViteServer } from 'vite';
import serialize from 'serialize-javascript';
import cookieParser from 'cookie-parser';
const port = process.env.CLIENT_PORT || 3000;
const __dirname = path.resolve();
const clientPath = __dirname;
const isDev = process.env.NODE_ENV === 'development';
async function createServer() {
    const app = express();
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
            const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(`<!--ssr-initial-state-->`, `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
                isJSON: true,
            })}</script>`);
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
