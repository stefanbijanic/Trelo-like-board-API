
import { Express} from "express";
import {AuthMiddleware} from "../common/middleware/auth.middleware";
import {TaskController} from "./task.controller";

function taskRoutes(app: Express) {
    const taskController = new TaskController();

    app.get(
        "/tasks", 
        AuthMiddleware.verifyAuthToken, 
        taskController.getAllTasks
    );
    app.get(
        "/tasks/title", 
        AuthMiddleware.verifyAuthToken, 
        taskController.getByTitle
    );
    app.get(
        "/tasks/task/:id", 
        AuthMiddleware.verifyAuthToken, 
        taskController.getByTitle
    );
    app.post(
        "/tasks", 
        AuthMiddleware.verifyAuthToken, 
        taskController.createTask
    );
    app.put(
        "/tasks/task/:taskId", 
        AuthMiddleware.verifyAuthToken, 
        taskController.editTask
    );
    app.delete(
        "/tasks/task/:taskId", 
        AuthMiddleware.verifyAuthToken, 
        taskController.deleteTask
    );
}

export default taskRoutes;