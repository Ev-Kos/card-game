import { badRequestError } from '../utils/errors'
import { findTopicsService } from '../services/topic-service'
import { Request, Response } from 'express'

export const findTopics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { limit, offset } = req.body

    const topics = await findTopicsService(Number(limit), Number(offset))

    if (topics.length === 0) {
      res.status(200).json([])
    } else {
      res.status(200).json(topics)
    }
  } catch (error) {
    badRequestError(res, error as Error)
  }
}
