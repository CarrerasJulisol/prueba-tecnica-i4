import { Router } from "express";
import viewsController from "../controllers/views.controller.js";

const router = new Router();

router.get('/',viewsController.redirectLoginHome);

router.get('/home',viewsController.viewHome);

export default router;