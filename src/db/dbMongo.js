const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL

let isConnected
const conectarABase = async () => {
    if (!isConnected) {
        await mongoose.connect(MONGO_URL)
        console.log("Conexion exitosa")
        isConnected = true
    }
}

module.exports = { mongoose, conectarABase }