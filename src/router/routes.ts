import {Router} from "express";
import carRouter from "./carRouter";

export const router = Router();
router.use('/cars', carRouter);