import config from '../config/config.js';
import jwt from 'jsonwebtoken';
import services from '../services/services.js';
import jwt_decode from 'jwt-decode';

const login = async(req,res)=>{
    try {
        const loginUser = {
            fullName:`${req.user.name} ${req.user.lastname}`,
            username:req.user.username,
            id:req.user._id,
        }
        const token = jwt.sign(loginUser,config.jwt.SECRET,{expiresIn:3600});
        res.cookie(config.jwt.COOKIE,token,{maxAge:3600000,httpOnly:true}).redirect('/home')
    } catch (error) {
        res.render('error',{error:error})
    }
}

const loginFail = (req, res) =>{
    res.status(500).render('error',{error:"500: Error del servidor"});
}

const logout = (req, res)=> {
    try {
        if(req.cookies){
            res.clearCookie(config.jwt.COOKIE).redirect('/account/login');
        }
    } catch (error) {
        res.render('error',{error:error})
    }
}

const singup = async(req,res)=>{
    res.send({status:"success",message:"Usuario creado con exito"})
}

const singupFail = async(req,res)=>{
    res.status(500).render('error',{error:"500: Error del servidor"})
}

const current =  async (req, res)=> {
    try {
        const token = req.cookies[config.jwt.COOKIE];
        if(!token) {
            res.render('error',"No hay una sesión abierta.")
        }
        const user = jwt.verify(token,config.jwt.SECRET);
        res.send(user);
    } catch (error) {
        if(error.expiresAt){
            res.render('error',{error:error})
        }
    }
}

const changeData = async (req,res)=>{
    try {
        const body = req.body
        const name = config.jwt.COOKIE;
        const info = jwt_decode(req.cookies[name]);
        const user = await services.usersService.getID(info.id)
        console.log(user)
        if(body.username != user.username){
            await services.usersService.changeUsername(user,body.username)
        }
        if(body.email != user.email){
            await services.usersService.changeEmail(user,body.email)
        }
        if(body.name != user.name){
            await services.usersService.changeName(user,body.name)
        }
        if(body.lastname != user.lastname){
            await services.usersService.changeLastname(user,body.lastname)
        }
        const reloadUser = await services.usersService.getID(info.id)
        const loginUser = {
            fullName:`${reloadUser.name} ${reloadUser.lastname}`,
            username:reloadUser.username,
            id:reloadUser._id,
        }
        const token = jwt.sign(loginUser,config.jwt.SECRET,{expiresIn:3600});
        res.cookie(config.jwt.COOKIE,token,{maxAge:3600000,httpOnly:true}).json({});
    } catch (error) {
        res.render('error',{error:error})
    }
}

const recover = async (req,res) => {
    const { email } = req.body
    const mailer = new MailingService()
    let result = await mailer.changePassword({
        from:"Recuperar contraseña",
        to:email,
        subject:"Cambiar contraseña",
        html:`<div>
        <h1>Solicitud de cambio de contraseña</h1>
        <p>Haga click en el siguiente enlace para cambiar su contraseña:</p>
        <a href="http://localhost:8080/account/restore?tkn=${jwt.sign({email},config.jwt.SECRET,{expiresIn:3600})}">Click aquí</a>
        </div>`
    })
    res.render('correoEnviado')
}

const changePass = async (req, res) => {
    try {
        const { password, newPassword, token } = req.body
        let { email } = jwt.verify(token,config.jwt.SECRET)
        if(!password||!newPassword){
            return res.send({status:"success",message:"Completa los campos"})
        }
        if(password===newPassword){
            const user = await services.usersService.getEmail(email)
            user.password = await createHash(newPassword)
            await services.usersService.changePassword(user)
            return res.send({status:"success",message:"Constraseña cambiada con exito"}).redirect('/account/login')
        }else{
            return res.send({status:"error",message:"Las constraseñas no coinciden"})
        }
    } catch (error) {
        res.render('error',{error:error})
    }
}


export default {
    login,
    loginFail,
    singup,
    singupFail,
    logout,
    current,
    recover,
    changePass,
    changeData
}