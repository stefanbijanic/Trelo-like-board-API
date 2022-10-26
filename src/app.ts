import "reflect-metadata";
import express, {Express ,NextFunction, Request, Response} from "express";
import {DataSource} from "typeorm";
import {Config} from "./common/config";
import {Task} from "./Task/task.entity";
import {User} from "./user/user.entity";
import userRoutes from "./user/user.routes";
import taskRoutes from "./Task/task.routers";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Config.database.host,
    port: Config.database.port,
    username: Config.database.username,
    password: Config.database.password,
    database: Config.database.database,
    entities: [
        User,
        Task,
    ],
    synchronize: true,
    logging: false,
})

async function main() {
    const app: Express = express();

    app.use(express.json())

    try {
        await AppDataSource.initialize();
        console.log(`Connected to database: ${Config.database.database}`)
    } catch (error) {
        console.log(error);
    }
    
    userRoutes(app);
    taskRoutes(app);

    app.listen(Config.server.port, async () => {
        console.log(`Server is running on port ${Config.server.port}`)
    });
}

main();