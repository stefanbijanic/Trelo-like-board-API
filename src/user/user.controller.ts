import {Request, Response, NextFunction} from "express";
import UserService from "./user.service";

const userService = new UserService()

export class UserController {

    public async createUser(req: Request, res: Response, next: NextFunction) {
        const {username, password} = req.body;
        
        const user = await userService.createUser(username, password);
        res.send(user)
    }

    public async getAllUsers(req: Request, res: Response, next: NextFunction) {
        const users = await userService.getAllUsers();
        res.send(users)
    }

    public async login(req: Request, res: Response, next: NextFunction) {
        const {username, password} = req.body;

        const userAndToken = await userService.login(username, password);
        res.send(userAndToken)
    }

    public async editUser(req: Request, res: Response, next: NextFunction) {
        const userId = +(req.params.userId);
        const password = req.body.password;

        const user = await userService.editUser(userId, password)
        res.send(user);
    }
}