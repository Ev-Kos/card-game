import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

import express, { Request as ExpressRequest } from 'express'
import path from 'path'

import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import cookieParser from 'cookie-parser'
import crypto from 'crypto';

const port = process.env.CLIENT_PORT || 3000
const __dirname = path.resolve()
const clientPath = __dirname
const isDev = process.env.NODE_ENV === 'development'
const api = 'https://ya-praktikum.tech'
const host = 'https://deck-masters-card-game-46.ya-praktikum.tech'

async function createServer() {
  const app = express()

  app.use((req: ExpressRequest, res, next) => {
    const cspNonce = crypto.randomBytes(16).toString('base64');
    res.locals.cspNonce = cspNonce; // Сохраняем в res.locals
    next();
  });

  app.use(cookieParser()) 

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false }),
    )
  }

  app.get('*', async (req: ExpressRequest, res, next) => {
    const url = req.originalUrl
    const cspNonce = res.locals.cspNonce as string;

    const cspDirectives = [
      `default-src 'self'`,
      `script-src 'self' 'nonce-${cspNonce}' ${isDev ? "'unsafe-eval'" : ""}`,
      `style-src 'self' ${
        isDev 
          ? "'unsafe-inline'" 
          : `'nonce-${cspNonce}'`
        } https://fonts.googleapis.com`,
      `font-src 'self' https://fonts.gstatic.com`,
      `img-src 'self' data: ${api} blob: ${isDev ? 'http://localhost:3000' : host}`,
      `form-action 'self'`,
      `connect-src 'self' ${api}${isDev ? ' ws://localhost:*' : ''}`,
      `worker-src 'self' blob:`,
      `frame-src 'none'`,
      `object-src 'none'`,
    ].join('; ');

    res.setHeader('Content-Security-Policy', cspDirectives);

    try {
      let render: (req: ExpressRequest, cspNonce: string) => Promise<{ html: string, initialState: unknown }>
      let template: string
      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8',
        )

        template = await vite.transformIndexHtml(url, template)

        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx'),
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8',
        )

        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.mjs',
        )

        render = (await import(pathToServer)).render
      }

      const { html: appHtml, initialState } = await render(req, cspNonce);

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script nonce="${cspNonce}">window.APP_INITIAL_STATE = ${serialize(initialState, { isJSON: true })}</script>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)

    } catch (e) {
      if (isDev && vite) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

createServer()
