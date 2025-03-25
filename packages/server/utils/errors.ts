import { Response } from 'express'

export const badRequestError = (res: Response, error: unknown) => {
  return res
    .status(400)
    .json({ error: error instanceof Error ? error.message : error })
}

export const forbiddenError = (res: Response, error: unknown) => {
  return res
    .status(403)
    .json({ error: error instanceof Error ? error.message : error })
}

export const unauthorizedError = (res: Response, error: unknown) => {
  return res
    .status(401)
    .json({ error: error instanceof Error ? error.message : error })
}

export const notFoundError = (res: Response, error: unknown) => {
  return res
    .status(404)
    .json({ error: error instanceof Error ? error.message : error })
}
