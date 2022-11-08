import { Router } from 'express'
import { getMessagesUser } from '../controllers/messageController.js'

const messageRouter = Router()

messageRouter.get('/:email', getMessagesUser)

export default messageRouter
