const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGO_URL ?? "mongodb://localhost:27017/miDB";
//const MONGO_URL = process.env.MONGO_URL ?? "mongodb://root:example@localhost:27017/social-base?authSource=admin"

let isConnected
const conectarDataBase = async () => {
    if (!isConnected) {
        await mongoose.connect(MONGO_URL)
        console.log("Conexion exitosa")
        isConnected = true
    }
}

module.exports = { mongoose, conectarDataBase }