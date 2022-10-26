import {AppDataSource} from "../app";
import ErrorResponseInterface from "../common/error-responce.interfase";
import {statusTypes, Task} from "./task.entity";


export class TaskService {

    public async getAllTasks() {
        try {
            const tasks = AppDataSource.getRepository(Task);
            return await tasks.find();
        } catch (error) {
            return {
                errorCode: 1003,
                errorMessage: "Could not retrive tasks"
            }
        }
    }

    public async getByTitle(title: string) {
        try {
            const tasks = AppDataSource.getRepository(Task);
            return await tasks.findOneBy({title: title})
        } catch (error) {
            return {
                errorCode: 1004,
                errorMessage: "Could not find task"
            }
        }
    }

    public async getById(id: number) {
        try {
            const tasks = AppDataSource.getRepository(Task);
            return await tasks.findOneBy({Id: id})
        } catch (error) {
            return {
                errorCode: 1004,
                errorMessage: "Could not find task"
            }
        }
        
    }

    public async createTask(data: any) {
        try {
            const task = new Task();
            task.title = data.title;
            task.description = data.description;
            task.status = data?.status || statusTypes.TODO;
            task.user = data?.user || null;

            return await AppDataSource.manager.save(task);
        } catch (error) {
            return {
                errorCode: 1005,
                errorMessage: "Could not create task"
            }
        }
    }

    public async editTask(taskId: number, data: any): Promise<Task | ErrorResponseInterface> {
        try {
            const tasks = AppDataSource.getRepository(Task);
            const task = await tasks.findOneBy({Id: taskId})
            if (!task) throw Error;
            
            task.title = data.title;
            task.description = data.description;
            task.status = data?.status || statusTypes.TODO;
            task.user = data?.user || null;

            return await AppDataSource.manager.save(task);
        } catch (error) {
            return {
                errorCode: 1006,
                errorMessage: "Could not edit task"
            }
        }
    }

    public async deleteTask(taskId: number): Promise<Task | ErrorResponseInterface> {
        try {
            const tasks = AppDataSource.getRepository(Task);
            const task = await tasks.findOneBy({Id: taskId})
            if (!task) throw Error;

            return await tasks.remove(task);   
        } catch (error) {
            return {
                errorCode: 1007,
                errorMessage: "Could not delete task"
            }
        }
    }
}