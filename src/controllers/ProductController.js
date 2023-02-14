const ProductManager = require('./../helpers/ProductManager')
let info = {}

//helper function to get all products
const getAllProductsFromServer = async () => {
    const products = new ProductManager('./src/datastorage/testP.json')
    const listProducts = await products.getAllProducts()
    let info = {}

    if(listProducts === false || (Array.isArray(listProducts) && listProducts.length === 0)){
        info = {
            status: "error",
            length: 0,
            message: "could not get the products, empty or non-existent file.",
            data: []
        }
        return info
    }

    const length = listProducts.length

    info = {
        status: "success",
        length: length,
        message: "products returned successfully",
        data: listProducts
    }

    return info
}

//helper function to get a number of products
const getNProductsFromServer = async (limit) => {
    const products = new ProductManager('./src/datastorage/testP.json')
    const listProducts = await products.getProducts(limit)
    let info = {}

    if(listProducts === false || (Array.isArray(listProducts) && listProducts.length === 0)){
        info = {
            status: "error",
            length: 0,
            message: "could not get the products, empty or non-existent file.",
            data: []
        }
        return info
    }

    const length = listProducts.length

    info = {
        status: length === limit ? "success" : "partial",
        length: length,
        message: length === limit ? "products returned successfully" : "Not all the requested products were available.",
        data: listProducts
    }
    return info
}

// Get all or N products from server /api/products[?:limit=N]
const getProductsFromServer = async (req, res) => {
    let arrayQuery = Object.keys(req.query)

    if (!(arrayQuery.length > 0)) {
        let info = await getAllProductsFromServer()
        return res.status(200).json(info)
    }

    if (!arrayQuery.includes('limit') || arrayQuery.length > 1) {
        info = {
            status: "error",
            length: 0,
            message: "query with syntax error",
            data: []
        }
        return res.status(400).json(info)
    }

    let { limit } = req.query
    limit = parseInt(limit)

    if (!isNaN(limit) && limit > 0) {
        let info = await getNProductsFromServer(limit)
        return res.status(200).json(info)       
    }

    info = {
        status: "error",
        length: 0,
        message: "limit value is not a positive integer",
        data: []
    }
    return res.status(400).json(info)
}

// Get a product from server /api/products/:pid 
const getProductFromServer = async (req, res) => {
    let { pid } = req.params
    pid = parseInt(pid)
    let info = {}
    
    if(isNaN(pid)){
        console.log(pid)
        info = {
            status: "error",
            message: "the product id is not a correct number",
            data: {}
        }
        return res.status(400).json(info)
    }

    const products = new ProductManager('./src/datastorage/testP.json')
    const product = await products.getProductById(pid)

    if(product === undefined || product === false){
        info = {
            status: "error",
            message: "a product with that id does not exist or the file could not be read",
            data: {}
        }
        return res.status(400).json(info)
    }

    info = {
        status: "success",
        message: "product found successfully",
        data: product
    }
    return res.status(200).json(info)
}

// Add a product to the server
const addProductOnServer = async (req, res) => {
    
    res.send('POST one of /products')
}

// Update a product to the server
const updProductOnServer = async (req, res) => {
    res.send('PUT one of /products')
}

// Delete a product to the server
const delProductOnServer = async (req, res) => {
    res.send('PUT one of /products')
}

module.exports = { getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer }
