import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Car} from "./Car";

@Entity()
export class Brand {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Car, (car) => car.brand)
    cars: Car[]
}
