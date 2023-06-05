import { Router } from "express";
import __dirname from "../utils.js";
import passport from 'passport';
import userController from "../controllers/singin.controller.js";
import viewsController from "../controllers/views.controller.js";
import { uploader } from "../utils.js";

const router = Router();
const Uploader = uploader;

// LOGIN
router.post('/login',passport.authenticate('login',{failureRedirect:'/account/loginfail',session:false}),userController.login);

router.get('/login',viewsController.viewLogin);

router.get('/loginfail',userController.loginFail);

// LOGOUT
router.get('/logout',userController.logout);

// REGISTER
router.get('/singup',viewsController.viewSingup);

router.post('/singup',passport.authenticate('singup',{failureRedirect:'/account/singupfail',session:false}),userController.singup);

router.get('/singupfail',userController.singupFail);

//EDIT DATA
router.get('/profile',viewsController.viewProfile);

router.post('/profile',userController.changeData);

// RECOVER ACCOUNT
router.get('/recover',viewsController.forgotPassword);

router.post('/recover',userController.recover);

router.get('/restore',viewsController.changedPassword);

router.put('/restore',userController.changePass);

router.get('/current',userController.current);

export default router;