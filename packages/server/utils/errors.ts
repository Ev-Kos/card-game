import { Response } from 'express'

export const badRequestError = (res: Response, error: unknown) => {
  res
    .status(400)
    .json({ error: error instanceof Error ? error.message : error })
}

export const forbiddenError = (res: Response, error: unknown) => {
  res
    .status(403)
    .json({ error: error instanceof Error ? error.message : error })
}

export const unauthorizedError = (res: Response, error: unknown) => {
  res
    .status(401)
    .json({ error: error instanceof Error ? error.message : error })
}

export const notFoundError = (res: Response, error: unknown) => {
  res
    .status(404)
    .json({ error: error instanceof Error ? error.message : error })
}

export const conflictError = (res: Response, error: unknown) => {
  res
    .status(409)
    .json({ error: error instanceof Error ? error.message : error })
}

export const serverError = (res: Response) => {
  res.status(500).json({ message: 'Internal server error' })
}

export const errorHandler = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    badRequestError(res, error)
  } else {
    serverError(res)
  }
}
