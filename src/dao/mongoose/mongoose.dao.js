import mongoose from "mongoose";
import config from "../../config/config.js";

export default class MongooseDao {
    constructor(){
        mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}@prueba-tecnica.diaueww.mongodb.net/${config.mongo.DB}`)
    }
}