const express = require('express')
const {Server} = require('socket.io')
const path = require('path')
const handlebars = require('express-handlebars')
const productRouter = require('./router/products.router')
const cartRouter = require('./router/carts.router')

const server = express()

server.use('/api/products/home', express.static( path.join(__dirname,'public')))
server.use('/api/products/realtimeproducts', express.static( path.join(__dirname,'public')))
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

socketServer.on('connection', serverClient => {
    console.log(`Nuevo cliente conectado con idSocket: ${serverClient.id}`)
})