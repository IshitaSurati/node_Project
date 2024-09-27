const mongoose = require('mongoose')
const dbconnect = async () => {
    await mongoose.connect("mongodb+srv://ishitasurati83:12345@cluster0.p2xz8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected to MongoDB")
}


module.exports = dbconnect;