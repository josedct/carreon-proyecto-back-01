class ListProducts{
    constructor(){
        this.list = []
    }

    /* Method that gets the length of the list of products. */
    getLength = () => this.list.length

    /* Method that creates a unique, auto-incrementing id. */
    createId = () => this.getLength() ? this.list[this.getLength() - 1].id + 1 : 1

    /* Method that initializes the list of products. */
    setList = contFile => this.list = JSON.parse(contFile)

    /* Method that returns the complete list of products. */
    getList = () => this.list 

    /* Method that returns the first N products in the list, if the number is 
    greater than the existing products, it will only return the existing 
    products. */
    getElements = numElements => this.list.slice( 0, numElements )  

    /* Method that returns a product, uses the id of the product to search for 
    it, if it does not find it, it returns undefined. */
    getElementById = id => this.list.find( ele => ele.id === id )
    
    /* Method that returns the index of a product, uses the id of the product 
    to search for it, if it does not find it, it returns -1. */
    getIndexElementById = id => this.list.findIndex( ele => ele.id === id)

    /* Method that adds a product to the list, receives an object with the 
    following required properties: title, description, code, price, status, 
    stock, category; the thumbnails property is an array and is optional. If 
    the mandatory properties are not met, it returns false; if the insertion 
    is successful, it returns true. */
    addElement = data => {
        let { title, description, code, price, status, stock, category, thumbnails } = data

        if( title === undefined || description === undefined || code === undefined || price === undefined || status === undefined || stock === undefined || category === undefined ){
            return false
        }

        if( thumbnails === undefined ){
            thumbnails = []
        }

        let oldLength = this.list.length

        this.list.push({
            id: this.createId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        })

        let newLength = this.list.length

        if( newLength > oldLength ){
            return true
        }

        return false
    }

    /* Method that updates a product, uses the id to find the product to 
    update. If it does not find the id of the product, it returns false, if it 
    does, it will return an array with the names of the properties that could 
    be updated. */
    updateElementById = ( id, data ) => {
        const indexId = this.getIndexElementById( id )

        if(indexId < 0 ){
            return false
        }

        const element = this.list[ indexId ]
        const { title, description, code, price, status, stock, category, thumbnails } = data
        const updated = []

        const isUpdated = {
            title : false,
            description: false,
            code: false,
            price: false,
            status: false,
            stock: false,
            category: false,
            thumbnails: false
        }

        if(title !== undefined && !(element.title === title)){
            element.title = title
            isUpdated.title = true
        }
        
        if(description !== undefined && !(element.description === description)){
            element.description = description
            isUpdated.description = true
        }

        if(code !== undefined && !(element.code === code)){
            element.code = code
            isUpdated.code = true
        }

        if(price !== undefined && !(element.price === price)){
            element.price = price
            isUpdated.price = true
        }

        if(status !== undefined && !(element.status === status)){
            element.status = status
            isUpdated.status = true
        }

        if(stock !== undefined && !(element.stock === stock)){
            element.stock = stock
            isUpdated.stock = true
        }

        if(category !== undefined && !(element.category === category)){
            element.category = category
            isUpdated.category = true
        }

        if(thumbnails !== undefined && !(element.thumbnails.length === thumbnails.length && element.thumbnails.every( strurl => thumbnails.includes(strurl)) )){
            element.thumbnails = thumbnails
            isUpdated.thumbnails = true
        }

        for (const property in isUpdated) {
            if (isUpdated[property] === true) {
                updated.push(property)
            }
        }

        return updated
    }

    /* Method that removes a product, uses the id to search for the item to 
    remove. In case of not finding the id of the product, it returns -1, if it 
    finds it, it will eliminate it and return the index of the deleted element. */
    deleteElementById = id => {
        const indexId = this.getIndexElementById( id )
        
        if( !(indexId < 0) ){
            this.list.splice( indexId, 1 )
        }
        
        return indexId
    }
    
    /* Method that empties the list of products. */
    emptyList = () => this.list.length = 0 
}

module.exports = ListProducts