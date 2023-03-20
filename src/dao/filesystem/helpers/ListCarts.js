class ListCart {
	constructor() {
		this.list = []
	}

	/* Method that returns the length of the list of shopping carts. */
	getLength = () => this.list.length

	/* Method that creates a unique, auto-incrementing id. */
	createId = () => this.getLength() ? this.list[this.getLength() - 1].id + 1 : 1

	/* Method that initializes the list of shopping carts */
	setList = contFile => this.list = JSON.parse(contFile)

	/* Method that returns the complete list of shopping carts */
	getList = () => this.list

	/* Method that returns the index of an item or shopping cart, uses the id 
	or shopping cart property to search for it, if not found it returns -1. */
	getIndexElementById = id => this.list.findIndex(ele => ele.id === id)

	/* Method that returns the index of a child element or product, uses the 
	id property of the product to search for it, in case it is not found it 
	returns -1. */
	getIndexChildElementById = (indexParent, idChild) => this.list[indexParent].products.findIndex(child => child.product === idChild)

	/* Method that creates a new cart with a unique id and an empty array of 
	products. */
	addElement = () => this.list.push({ id: this.createId(), products: [] })

	/* Method that returns an item or shopping cart, uses the id property of 
	the shopping cart to search for it, if it doesn't find it, it returns 
	undefined. */
	getElementById = id => this.list.find(ele => ele.id === id)

	/* Method that adds a child element or product to the shopping cart, 
	uses the shopping cart id and the product id to find the cart and add 
	or increment the number of products, returns true if it could be added 
	and false if it did not find the product in the shopping cart. */
	addElementByIds = (idParent, idChild) => {
		const indexParent = this.getIndexElementById(idParent)
		if (indexParent < 0) {
			return false
		}

		const indexChild = this.getIndexChildElementById(indexParent, idChild)

		if (indexChild < 0) {
			this.list[indexParent].products.push({ product: idChild, quantity: 1 })
		} else {
			this.list[indexParent].products[indexChild].quantity++
		}

		return true
	}
}

module.exports = ListCart