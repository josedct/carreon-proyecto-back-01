const fs = require('fs')
const ListProducts = require('./ListProducts')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    /* Method that gets the content of the products file returns the following.
        String - With content of the file.
        False – If the file is not found, or if the file exists, but is empty. */
    getContentFile = async () => {
        let content = ""
        try {
            content = await fs.promises.readFile(this.path, 'utf-8')
        } catch (error) {
            return false
        }

        if (content === '') {
            return false
        }

        return content
    }

    /* Method that writes the content of the products file, returns the following.
        True – Whether the file was successfully written to.
        False – If there was a problem writing to the file.
    If the file does not exist, it creates it. */
    setContentFile = async content => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(content, null, 4))
        } catch (error) {
            return false
        }
        return true
    }

    /* Method that gets all the products in the file, returns the following.
        Object Array – Whether the file contains an array (can be an empty array).
        False – If the file has no content to return or the file does not exist. */
    getAllProducts = async () => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getList()
    }

    /* Method that gets the first N products from the file, receives the number of 
    products to return as a parameter, returns the following.
        Object Array – Returns the requested products, in case of requesting more 
            products than there are, it will only return the maximum number of existing 
            products.
        False – If the file has no content to return or the file does not exist. */
    getProducts = async nProducts => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getElements(nProducts)
    }

    /* Method that gets a product from the file, receives the product id as a parameter, 
    returns the following.
        An Object – If it finds the product with the requested id.
        Undefined - If the product with the requested id is not found.
        False – If the file has no content to return or the file does not exist. */
    getProductById = async idProduct => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        return products.getElementById(idProduct)
    }

    /* Method that adds a product to the file, receives as a parameter an object with the 
    necessary properties of the object (title, description, code, price, status, stock, 
    category) and its optional property (thumbnails), returns the following.
        True – If the product insertion was successful.
        False – If there was any error (required properties not met, failed to register 
            product to file). */
    addProduct = async data => {
        const content = await this.getContentFile()
        const products = new ListProducts()

        if (content !== false) {
            products.setList(content)
        }

        if (products.addElement(data)) {
            return await this.setContentFile(products.getList())
        }

        return false
    }

    /* Method that updates a product in the file, receives the product id and an object 
    with the fields to update as parameters, returns the following.
        Array – If it was possible to update, it will return an array with the updated 
            properties, the array may be empty if there was no need to update the products.
        False – If the product could not be updated or registered to the file. */
    updateProductById = async (idProduct, dataUpdate) => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        const isUpdated = products.updateElementById(idProduct, dataUpdate)
        const isRegistered = await this.setContentFile(products.getList())

        if (Array.isArray(isUpdated) && isRegistered) {
            return isUpdated
        }

        return false
    }

    /* Method that removes a product from the file, receives the id of the product to 
    remove as a parameter, returns the following.
        True – Whether the product could be removed.
        False – If there was no content in the file, but the product was not found, or 
            if there was a problem writing to the file. */
    deleteProductById = async idProduct => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const products = new ListProducts()
        products.setList(content)

        if (!(products.deleteElementById(idProduct) < 0)) {
            return await this.setContentFile(products.getList())
        }

        return false
    }

}

module.exports = ProductManager