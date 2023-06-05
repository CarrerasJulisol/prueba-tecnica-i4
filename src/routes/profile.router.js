import { Router } from "express";
import viewsController from "../controllers/views.controller.js";
import userController from "../controllers/singin.controller.js";

const router = new Router();

router.get('/',viewsController.viewProfile);

router.post('/',userController.changeData);

export default router;