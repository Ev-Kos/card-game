import { badRequestError, conflictError } from '../utils/errors'
import {
  createTopicService,
  deleteTopicService,
  findTopicsService,
  updateTopicService,
} from '../services/topic-service'
import { comment, topic } from '../db'
import { withErrorHandling } from '../middlewares/with-error-handling'

export const findTopics = withErrorHandling(async (req, res) => {
  const { limit, offset } = req.query
  const topics = await findTopicsService(Number(limit), Number(offset))

  res.status(200).json(topics)
})

export const createTopic = withErrorHandling(async (req, res) => {
  const { title, description } = req.body
  const user = req.user

  if (!title || !description) {
    badRequestError(res, 'title and description are required fields')
    return
  }

  if (title.length > 256) {
    badRequestError(res, 'the max len of the title cannot exceed 256')
    return
  }

  const existingTopic = await topic.findOne({ where: { title } })
  if (existingTopic) {
    conflictError(res, 'topic with this title already exists')
    return
  }

  if (user) {
    const newTopic = await createTopicService(title, description, user.login)
    res.status(201).json(newTopic)
  }
})

export const updateTopic = withErrorHandling(async (req, res) => {
  const { topic_id, title, description } = req.body
  const user = req.user

  const topicToUpdate = await topic.findOne({
    where: { id: topic_id },
  })

  const existingTopic = await topic.findOne({ where: { title } })

  if (existingTopic) {
    conflictError(res, 'topic with this title already exists')
    return
  }

  if (!topicToUpdate) {
    badRequestError(res, 'topic not found')
    return
  }

  if (topicToUpdate.author_login !== user?.login) {
    conflictError(res, 'only the author can update')
    return
  }

  const comments = await comment.findOne({
    where: { topic_id: topicToUpdate.id },
  })

  if (comments) {
    conflictError(res, 'topic has comments')
    return
  }

  const result = await updateTopicService(topic_id, { title, description })

  res.status(200).send(result)
})

export const deleteTopic = withErrorHandling(async (req, res) => {
  const { topic_id } = req.body
  const user = req.user

  const topicToDelete = await topic.findOne({
    where: { id: topic_id },
  })

  if (!topicToDelete) {
    badRequestError(res, 'topic not found')
    return
  }

  if (topicToDelete.author_login !== user?.login) {
    conflictError(res, 'only the author can delete')
    return
  }

  const comments = await comment.findOne({
    where: { topic_id: topicToDelete.id },
  })

  if (comments) {
    conflictError(res, 'topic has comments')
    return
  }

  const result = await deleteTopicService(topic_id)

  res.status(200).send(result)
})
