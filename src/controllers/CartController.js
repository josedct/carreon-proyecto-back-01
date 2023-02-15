const CartManager = require('./../helpers/CartManager')
const ProductManager = require('./../helpers/ProductManager')
const pathCarts = './src/datastorage/carts.json'
const pathProducts = './src/datastorage/products.json'

// Get a cart from server
const getProductsCartFromServer = async (req, res) => {
    let {cid} = req.params
    cid = parseInt(cid)
    let info = {}
    
    cid = isNaN(cid) ? undefined : cid

    if(cid === undefined){
        info = {
            status: "error",
            message: "the cart id is not a correct number",
            id: 0,
            data: []
        }
        return res.status(400).json(info)
    }

    const carts = new CartManager(pathCarts)
    const cart = await carts.getCartById(cid)

    if(cart === undefined || cart === false){
        info = {
            status: "error",
            message: "cart with that id does not exist or the file could not be read",
            id: 0,
            data: []
        }
        return res.status(400).json(info)
    }

    info = {
        status: "success",
        message: "product found successfully",
        id: cart.id,
        data: cart.products
    }
    return res.status(200).json(info)
}

// add o creates a cart to the server
const addCartOnServer = async (req, res) => {
    const carts = new CartManager(pathCarts)
    const isAdd = await carts.addCart()
    let info = {}

    if(isAdd){
        info = {
            status: "success",
            message: "cart created and added successfully."
        }
        return res.status(200).json(info)
    }

    info = {
        status: "error",
        message: "could not create cart."
    }
    return res.status(400).json(info)
}

// add or update an existing product to an existing cart on the server
const addProductCartOnServer = async (req, res) => {
    let {cid, pid} = req.params
    cid = parseInt(cid)
    pid = parseInt(pid)
    let info = {}
    
    cid = isNaN(cid) ? undefined : cid
    pid = isNaN(pid) ? undefined : pid

    if(cid === undefined || pid === undefined){
        info = {
            status: "error",
            message: "the cart id or product id is not a correct number."
        }
        return res.status(400).json(info)
    }

    const products = new ProductManager(pathProducts)
    const product = await products.getProductById(pid)

    if(product === undefined || product === false){
        info = {
            status: "error",
            message: "product id does not exist."
        }
        return res.status(400).json(info)
    }
    
    const carts = new CartManager(pathCarts)
    const cart = await carts.getCartById(cid)

    if(cart === undefined || cart === false){
        info = {
            status: "error",
            message: "cart id does not exist."
        }
        return res.status(400).json(info)
    }

    const isAddProductToCart = await carts.addProductToCart(cid, pid)

    if(isAddProductToCart){
        info = {
            status: "success",
            message: `The product with id ${pid} was added successfully.`
        }
        return res.status(200).json(info)
    }

    info = {
        status: "error",
        message: `Product with id ${pid} could not be added.`
    }
    return res.status(400).json(info)

}

module.exports = {getProductsCartFromServer, addCartOnServer, addProductCartOnServer}