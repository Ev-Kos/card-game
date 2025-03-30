import { Response } from 'express'

const handlerError = (status: number, res: Response, error: unknown): void => {
  res
    .status(status)
    .json({ error: error instanceof Error ? error.message : String(error) })
}

export const badRequestError = (res: Response, error: unknown) => {
  handlerError(400, res, error)
}

export const forbiddenError = (res: Response, error: unknown) => {
  handlerError(403, res, error)
}

export const unauthorizedError = (res: Response, error: unknown) => {
  handlerError(401, res, error)
}

export const notFoundError = (res: Response, error: unknown) => {
  handlerError(404, res, error)
}

export const conflictError = (res: Response, error: unknown) => {
  handlerError(409, res, error)
}

export const serverError = (res: Response) => {
  res.status(500).json({ error: 'Internal server error' })
}

export const errorHandler = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(res.statusCode).json({ error: error.message })
  } else {
    serverError(res)
  }
}

export const handlerServiceError = (
  error: unknown,
  serviceName: string,
): void => {
  throw new Error(
    `Ошибка ${serviceName}:${error instanceof Error ? error.message : String(error)}`,
  )
}
