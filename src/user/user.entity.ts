import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Task} from "../Task/task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(
        () => Task,
        task => task.Id,
    )
    task: Task

}