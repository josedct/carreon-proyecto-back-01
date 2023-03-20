const fs = require('fs')
const ListCarts = require('./ListCarts')

class CartManager {
    constructor(path) {
        this.path = path
    }

    /* Method that gets the content of the shopping carts file returns the following.
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

    /* Method that writes the content of the shopping cart file, returns the following.
        True – Whether the file was successfully written to.
        False – If there was a problem writing to the file. */
    setContentFile = async content => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(content, null, 4))
        } catch (error) {
            return false
        }
        return true
    }

    /* Method that gets a shopping cart from the file, receives the id of the requested 
    shopping cart as a parameter, returns the following.
        An Object – If it finds the requested shopping cart.
        Undefined – If the requested shopping cart is not found.
        False – If the file is not found, or if the file exists, but is empty. */
    getCartById = async idCart => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const carts = new ListCarts()
        carts.setList(content)

        return carts.getElementById(idCart)
    }

    /* Method that creates a new shopping cart, returns the following.
        True – Whether the cart could be created successfully.
        False – If there was a problem creating or registering the shopping cart. */
    addCart = async () => {
        const content = await this.getContentFile()
        const carts = new ListCarts()

        if (content !== false) {
            carts.setList(content)
        }

        if (carts.addElement()) {
            return await this.setContentFile(carts.getList())
        }

        return false
    }

    /* Method that adds or updates a product to the existing shopping cart, receives the 
    id of the shopping cart and the id of the product to add as parameters, returns the following.
        True – Whether the product could be successfully added or updated.
        False – If the file is not found, or if the file exists, but is empty. If the shopping 
            cart was not found to add the product. */
    addProductToCart = async (idCart, idProduct) => {
        const content = await this.getContentFile()

        if (content === false) {
            return false
        }

        const carts = new ListCarts()
        carts.setList(content)
        if (carts.addElementByIds(idCart, idProduct)) {
            return await this.setContentFile(carts.getList())
        }

        return false
    }
}

module.exports = CartManager