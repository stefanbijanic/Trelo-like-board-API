import {UserController} from "./user.controller";
import { Express} from "express";
import {AuthMiddleware} from "../common/middleware/auth.middleware";

function userRoutes(app: Express) {
    const userController = new UserController();

    app.post("/user", userController.createUser);
    app.get(
        "/users", 
        AuthMiddleware.verifyAuthToken, 
        userController.getAllUsers
    );
    app.post("/users/login", userController.login);
    app.put(
        "/user/:userId", 
        AuthMiddleware.verifyAuthToken, 
        userController.editUser
    );
}

export default userRoutes;