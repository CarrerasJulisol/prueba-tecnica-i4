import jwt from 'jsonwebtoken';
import services from '../services/services.js';
import config from '../config/config.js';
import jwt_decode from 'jwt-decode';

const viewHome = async (req,res) => {
    try {
        const name = config.jwt.COOKIE;
        if(req.cookies[name]){
            const info = jwt_decode(req.cookies[name]);
            const username = info.username;
            res.render('home',{username});
        }else{
            res.redirect('/account/login');
        }
    } catch (error) {
        res.render('error',{error:error});
    }
}

const viewLogin = async(req,res) => {
    try {
        const name = config.jwt.COOKIE;
        if(req.cookies[name]){
            res.redirect('/account/home');
        }else{
            res.render('login');
        }
    } catch (error) {
        res.render('error',{error:error});
    }
}

const viewSingup = async(req,res)=>{
    try {
        res.render('singup')
    } catch (error) {
        res.render('error',{error:error})
    }
}

const viewProfile = async (req,res) => {
    try {
        const name = config.jwt.COOKIE;
        if(req.cookies[name]){
            const info = jwt_decode(req.cookies[name]);
            const user = await services.usersService.getID(info.id)
            res.render('profile',{user});
        }else{
            res.redirect('/account/login');
        }
    } catch (error) {
        res.render('error',{error:error});
    }
}

const redirectLoginHome = async(req,res) => {
    try {
        const name = config.jwt.COOKIE
        if(req.cookies[name]){
            res.redirect('/home')
        }else if(!req.cookies[name]){
            res.redirect('/account/login')
        }
    } catch (error) {
        res.render('error',{error:error})
    }
}


const forgotPassword = async(req,res) => {
    try {
        res.render('recover')
    } catch (error) {
        res.render('error',{error:error})
    }
}

const changedPassword = async(req,res) => {
    try {
        res.render('newPassword')
    } catch (error) {
        res.render('error',{error:error})
    }
}

export default {
    viewHome,
    viewLogin,
    viewSingup,
    redirectLoginHome,
    changedPassword,
    forgotPassword,
    viewProfile
}