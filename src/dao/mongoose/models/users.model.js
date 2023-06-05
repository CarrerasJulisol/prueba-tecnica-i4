export default class User {
    static get model(){
        return 'users';
    }
    static get schema(){
        return {
            name:String,
            lastname:String,
            email:String,
            username:String,
            password:String
        }
    }
}