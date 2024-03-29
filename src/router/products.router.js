const { Router } = require('express')
const { getProductsFromServer,getViewAllProduct, getRealTimeAllProducts, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer } = require('./../controllers/filesystem/ProductController')

const router = Router()

// GET  /api/products[?:limit=N] 
router.get('/', getProductsFromServer )

//GET /api/products/home
router.get('/home',getViewAllProduct)

//GET /api/products/realtimeproducts
router.get('/realtimeproducts',getRealTimeAllProducts)

// GET 	/api/products/:pid  
router.get('/:pid', getProductFromServer )

// POST /api/products
router.post('/', addProductOnServer )

// PUT /api/products/:pid 
router.put('/:pid', updProductOnServer ) 

// DELETE /api/products/:pid
router.delete('/:pid', delProductOnServer)

module.exports = router