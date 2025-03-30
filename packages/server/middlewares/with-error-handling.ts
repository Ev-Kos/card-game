import { errorHandler } from '../utils/errors'
import { Request, Response } from 'express'

export const withErrorHandling = (
  handler: (req: Request, res: Response) => Promise<void>,
) => {
  return async (req: Request, res: Response) => {
    try {
      await handler(req, res)
    } catch (error) {
      errorHandler(res, error)
    }
  }
}
