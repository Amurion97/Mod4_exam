import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm"
import {Brand} from "./Brand";

@Entity()
export class Car {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        default:""
    })
    description: string
    @Column()
    price: number

    @ManyToOne(() => Brand, (brand) => brand.cars)
    brand: number
}
