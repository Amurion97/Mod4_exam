import {AppDataSource} from "../data-source";
import {Car} from "../entity/Car";


class CarService {

    carRepository = AppDataSource.getRepository(Car);

    addCar = async (car) => {
        let newCar = Object.assign(new Car(), {
            name: car.name, brand: car.brand, description: car.description, price: car.price
        })
        return await this.carRepository.save(newCar)

    }

    editCar = async (carId, car) => {
        return await this.carRepository
            .createQueryBuilder()
            .update({
                name: car.name,
                brand: car.brand,
                description: car.description,
                price: car.price
            }).where({id:carId})
            .execute()
    }

    getOne = async (id) => {
        return await this.carRepository
            .createQueryBuilder("car")
            .where("car.id = :id", {id: id})
            .innerJoinAndSelect("car.brand", "brand")
            .getOne()
    }

    getMany = async (query) => {
        let sign = "="
        let asc = true;
        let column
        if (query.brand == "0") {
            sign = ">"
        }
        switch (query.sort) {
            case "0":
                column = "car.id"
                break;
            case "1":
                column = "car.price"
                break;
        }
        return await AppDataSource.createQueryBuilder()
            .select("car")
            .from(Car, "car")
            .leftJoinAndSelect("car.brand", "brand")
            .where(`car.brand ${sign} :brand`, {brand: query.brand})
            .orderBy(column, (asc)? "ASC":"DESC")
            .getMany()
    }

}

export default new CarService();
