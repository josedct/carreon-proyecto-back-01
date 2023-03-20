const express = require('express')
const {Server} = require('socket.io')
const path = require('path')
const handlebars = require('express-handlebars')
const productRouter = require('./router/products.router')
const cartRouter = require('./router/carts.router')
const chatRouter = require('./router/chat.router')
const {addMessage, getAllMessage} = require('./controllers/bd/ChatController')
const {bdConected} = require('./controllers/bd/bdConected')

const server = express()

server.use('/api/products/home', express.static( path.join(__dirname,'public')))
server.use('/api/products/realtimeproducts', express.static( path.join(__dirname,'public')))
server.use('/api/chat', express.static( path.join(__dirname,'public')))
server.engine('handlebars', handlebars.engine())
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'handlebars')

const serverHttp = server.listen(8080, () => console.log('Server Up'))

server.use(express.json())
server.use(express.urlencoded({extends: true}))

const socketServer = new Server(serverHttp)

server.set('socketio', socketServer)


server.use('/api/products', productRouter)
server.use('/api/carts', cartRouter)
server.use('/api/chat',chatRouter)

bdConected()

socketServer.on('connection', serverClient => {
    console.log(`Nuevo cliente conectado con idSocket: ${serverClient.id}`)

    serverClient.on('client:Logged', async data => {
        const allMsg = await getAllMessage()
        serverClient.emit('server:AllMsg', allMsg )
    })

    serverClient.on('client:SendMsg', async data => {
        const addMsg = await addMessage(data)
        socketServer.emit('server:UpdateMsg',addMsg)
    })
})