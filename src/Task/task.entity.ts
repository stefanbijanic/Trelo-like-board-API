import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import {User} from "../user/user.entity";

export enum statusTypes {
    TODO = "Todo",
    IN_PROGRESS = "In Progress",
    DONE = "Done"
}

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    title: string;

    @Column("text")
    description: string;

    
    @Column('text')
    status: statusTypes;

    @ManyToOne(
        () => User,
        user => user.task,
    )
    user: User;
}