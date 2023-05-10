import {Router} from "express";
import carController from "../controller/carController";

const carRouter = Router();
carRouter.get("/", carController.all)
carRouter.get("/:id", carController.one)

carRouter.post("/", carController.save)

carRouter.put("/:id", carController.edit)
carRouter.delete("/:id", carController.remove)
export default carRouter;