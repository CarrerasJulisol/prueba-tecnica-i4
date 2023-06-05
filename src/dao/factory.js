import config from "../config/config.js";

const PERSISTENCE = config.app.PERSISTENCE

export default class PersistenceFactory {
    static getPersistence = async() => {
        switch(PERSISTENCE){
            case "MONGODB":
                let {default:MongooseDao} = await import("../dao/mongoose/mongoose.dao.js")
                let {default:UsersDao} = await import("../dao/mongoose/users.dao.js")
                return {
                    services: new MongooseDao(),
                    users: new UsersDao()
                }
        }
    }
}