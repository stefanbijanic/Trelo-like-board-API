import {Request, Response, NextFunction} from "express";
import {TaskService} from "./task.service";

const taskService = new TaskService();

export class TaskController {
    public async getAllTasks(req: Request, res: Response, next: NextFunction) {
        const allTasks = await taskService.getAllTasks();
        res.send(allTasks)
    }

    public async getByTitle(req: Request, res: Response, next: NextFunction) {
        const title = req.body.title
        const task = await taskService.getByTitle(title);
        res.send(task);
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        const id = +(req.params.id);
        const task = await taskService.getById(id);

        res.send(task);
    }

    public async createTask(req: Request, res: Response, next: NextFunction) {
        const data = req.body;

        const task = await taskService.createTask(data);
        res.send(task);
    }

    public async editTask(req: Request, res: Response, next: NextFunction) {
        const taskId = +(req.params.taskId);
        const data = req.body;

        const task = await taskService.editTask(taskId, data);

        res.send(task); 
    }

    public async deleteTask(req: Request, res: Response, next: NextFunction) {
        const taskId = +(req.params.taskId);
        const task = await taskService.deleteTask(taskId);
        res.send(task);
    }
}