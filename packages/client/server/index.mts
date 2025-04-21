import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

import express, { Request as ExpressRequest } from 'express'
import path from 'path'

import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import cookieParser from 'cookie-parser'
import crypto from 'crypto';

declare module 'express' {
  interface Request {
    nonce?: string
  }
}

const port = process.env.CLIENT_PORT || 3000
const __dirname = path.resolve()
const clientPath = __dirname
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()

  app.use((req: ExpressRequest, _res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64');
    req.nonce = nonce
    next();
  })

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
    // const nonce = req.nonce;

    // const cspDirectives = [
    //   `default-src 'self'`,
    //   `script-src 'self' ${
    //     isDev 
    //       ? "'unsafe-inline' 'unsafe-eval'" 
    //       : `'nonce-${nonce}'`
    //     }`,
    //   `style-src 'self' ${
    //     isDev 
    //       ? "'unsafe-inline'" 
    //       : `'nonce-${nonce}'`
    //     } https://fonts.googleapis.com`,
    //   `font-src 'self' https://fonts.gstatic.com`,
    //   `img-src 'self' data: https://ya-praktikum.tech`,
    //   `form-action 'self'`,
    //   `connect-src 'self' https://ya-praktikum.tech${isDev ? ' ws://localhost:*' : ''}`,
    //   `worker-src 'self' blob:`,
    //   `frame-src 'none'`,
    //   `object-src 'none'`,
    // ].join('; ');

    // res.setHeader('Content-Security-Policy', cspDirectives);

    try {
      let render: (req: ExpressRequest) => Promise<{ html: string, initialState: unknown }>
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

      const { html: appHtml, initialState } = await render(req)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
          isJSON: true,
        })}</script>`
      )

      // const html = template
      //   .replace(`<!--ssr-outlet-->`, appHtml)
      //   .replace(
      //     `<!--ssr-initial-state-->`,
      //     `<script nonce="${nonce}">window.APP_INITIAL_STATE = ${serialize(initialState, { isJSON: true })}</script>`
      //   )
      //   .replace(/%nonce%/g, nonce || '');

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
