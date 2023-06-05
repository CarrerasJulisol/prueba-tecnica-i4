import dotenv from 'dotenv';
import __dirname from '../utils.js';

const mode = process.argv.slice(2)[0];
console.log(mode);

dotenv.config({
    path:mode==="PROD"?__dirname+'/.env.production':__dirname+'/.env.development'
});

console.log(process.env.PORT)
console.log(process.env.PERSIST)


export default {
    app:{
        MODE:process.env.MODE,
        PORT:process.env.PORT,
        DEBUG:process.env.DEBUG,
        DOMAIN:process.env.DOMAIN,
        PERSISTENCE:process.env.PERSIST
    },
    session:{
        ADMIN_EMAIL:process.env.ADMIN_EMAIL,
        ADMIN_PWD: process.env.ADMIN_PWD
    },
    mongo:{
        USER:process.env.MONGO_USER,
        PWD:process.env.MONGO_PWD,
        DB:process.env.MONGO_DATABASE
    },
    jwt:{
        SECRET:process.env.JWT_SECRET,
        COOKIE:process.env.JWT_COOKIE
    },
    gmail:{
        MAILING_EMAIL:process.env.GMAIL_EMAIL,
        MAILING_PWD:process.env.GMAIL_PWD
    },
    certificate:{
        KEY:process.env.KEY_FILENAME,
        FILENAME:process.env.FILENAME
    }
}