import Message from '../models/messagesModel.js'

class ChatManager {
  async getAllMessages() {
    const messages = await Message.find()
    return messages
  }

  async newMessages(email, message) {
    const userMessage = new Message({ email, message })
    await userMessage.save()
    return userMessage
  }
}

export default ChatManager
