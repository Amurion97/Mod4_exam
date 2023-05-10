import { AppDataSource } from '../data-source'
import {NextFunction, query, Request, Response} from "express"
import {Car} from "../entity/Car";
import carService from "../service/carService";


class CarController {

    songRepository = AppDataSource.getRepository(Car);

    all = async (req: Request, res: Response, next: NextFunction) => {
        console.log("cars accessed with query:", req.query);
        if (!req.query.brand) {
            req.query.brand = "0"
        }
        if (!req.query.sort) {
            req.query.sort = "0"
        }
        try {
            let cars = await carService.getMany(req.query);
            res.status(400).json({
                data: cars,
                success: true
            })
        } catch (e) {
            console.log("error in searching cars:", e);
            res.status(500).json({
                message: "get cars failed",
                success: false
            })
        }
    }
    one = async (req: Request, res: Response, next: NextFunction) => {
        console.log("get one car with id:", req.params.id)
        try {
            let car = await carService.getOne(req.params.id);
            res.status(400).json({
                data: car,
                success: true
            })
        } catch (e) {
            console.log("error in get a car:", e);
            res.status(500).json({
                message: "car not found",
                success: false
            })
        }
    }

    save = async (req: Request, res: Response, next: NextFunction) => {
        console.log("request.body:", req.body);
        try {
            await carService.addCar(req.body);
            res.status(400).json({
                message: "add new car successfully",
                success: true
            })
        } catch (e) {
            console.log("error in adding new car:", e);
            res.status(500).json({
                message: "add new car failed",
                success: false
            })
        }


    }
    edit = async (req: Request, res: Response, next: NextFunction) => {
        console.log("edit one car with id:", req.params.id)
        console.log("request.body to put:", req.body);
        try {
            await carService.editCar(req.params.id,req.body);
            res.status(400).json({
                message: "edit car successfully",
                success: true
            })
        } catch (e) {
            console.log("error in editing a car:", e);
            res.status(500).json({
                message: "edit car failed",
                success: false
            })
        }


    }

    remove = async (req: Request, res: Response, next: NextFunction) => {
        console.log("delete one car with id:", req.params.id)
        try {
            let car = await carService.getOne(req.params.id);
            if (!car) {
                throw new Error("Car not found")
            }
            await this.songRepository.remove(car)
            res.status(400).json({
                data: car,
                success: true
            })
        } catch (e) {
            console.log("error in delete a car:", e);
            res.status(500).json({
                message: "car not found",
                success: false
            })
        }
    }

}

export default new CarController();