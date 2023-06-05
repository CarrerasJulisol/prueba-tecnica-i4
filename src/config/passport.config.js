import passport from "passport";
import local from 'passport-local';
import { createHash, isValidPassword } from "../utils.js";
import services from "../services/services.js";

const LocalStrategy = local.Strategy;

const initializePassport = () =>{
    passport.use('singup',new LocalStrategy({passReqToCallback:true,usernameField:"username"},
    async (req, username, password, done)=>{
        try{
            const { name, lastname, repeatPass, email } = req.body;
            const fullName = {
                name,
                lastname,
            }
            //verificamos si el usuario existe
            console.log("por verificxar")
            const exists = await services.usersService.getUsername(username)
            console.log(exists)
            if(exists){
                return done(null,false,{message:"Ya existe un usuario registrado con este e-mail."})
            };
            //lo guardamos en la base
            const newUser = {
                name,
                lastname,
                username,
                email,
                password:createHash(password)
            }
            console.log(newUser)
            let result = await services.usersService.saveOne(newUser);
            return done(null,result)
        }catch(error){
            done(error)
        }
    }))

    passport.use('login',new LocalStrategy({usernameField:'username'},async(username, password, done)=>{
        try {
            if(username,password){
                let user = await services.usersService.getUsername(username);
                if(user){
                    if(isValidPassword(user,password)){
                        return done(null,user)
                    }else{
                        return done(null,false,{message:"La contraseña es incorrecta."});
                    }
                }else{
                    return done(null,false,{message:"No existe este nombre de usuario en el sistema."});
                }
            }else if(!username||!password){
                return done(null,false,{message:"Valores incompletos"});
            }
        } catch (error) {
            return done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })

    passport.deserializeUser(async(id,done)=>{
        let result = await services.usersService.getID(id);
        return done(null,result);
    })
}

export default initializePassport;