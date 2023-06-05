// para usar type module
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import multer from 'multer';

//bcrypt
export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);

//dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;

//multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,__dirname+"/public/img")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname+"-"+Date.now())
    }
})

export const uploader = multer({storage:storage})