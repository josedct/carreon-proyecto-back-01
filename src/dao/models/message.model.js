const mongoose = require('mongoose')

const messageCollection = 'messages'

const messageSchema = new mongoose.Schema({
    user:"string",
    message: "string"
})

const messageModel = mongoose.model(messageCollection,messageSchema)
module.exports = messageModel