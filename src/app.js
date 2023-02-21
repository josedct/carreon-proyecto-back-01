const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const productRouter = require('./router/products.router')
const cartRouter = require('./router/carts.router')

const server = express()

server.use('/api/products/home', express.static( path.join(__dirname,'public')))
server.engine('handlebars', handlebars.engine())
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'handlebars')

server.listen(8080, () => console.log('Server Up'))

server.use(express.json())
server.use(express.urlencoded({extends: true}))



server.use('/api/products', productRouter)
server.use('/api/carts', cartRouter)