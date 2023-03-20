const mongoose = require('mongoose')

const uri = 'mongodb+srv://backecommerce:DRnbvYV25Av9YcXz@codercluster.gg34oks.mongodb.net/ecommerce?retryWrites=true&w=majority'

const bdConected = async () => {
    await mongoose.connect(uri)
    console.log('BD conectada')
}

module.exports = {bdConected}