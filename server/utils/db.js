const mongoose = require("mongoose")
require("dotenv").config()

async function connectTODb(){
    try {
        await mongoose.connect(process.env.MONGO_URL + "blog-Auth")
        console.log(">>>>>>>>>>>>>>>>>>>> Connected To Database <<<<<<<<<<<<<<<<<<<<")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectTODb;