import {AppDataSource} from "../app";
import ErrorResponseInterface from "../common/error-responce.interfase";
import {User} from "./user.entity";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {Config} from "../common/config";

export default class UserService {
    public async createUser(username: string, password: string): Promise<User | ErrorResponseInterface> {
        try {
            const users: User[] = await this.getAllUsers();

            for (const element of users) {
                if (element.username === username) throw Error
            }

            const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g;
            
            if (password.match(passwordRegex) === null) {
                return({
                    errorCode: 1001,
                    errorMessage: "Password must contain at least 8 characters,\n " +
                                    "One uppercase letter,\n" +  
                                    "One lowercase letter,\n" + 
                                    "One number and\n" +
                                    "One special character",
                })
            }

            const passwordHash = await bcryptjs.hash(password, 10)

            const user = new User();
            user.username = username;
            user.password = passwordHash;

            return AppDataSource.manager.save(user);
        } catch (error) {
            return {
                errorCode: 1002,
                errorMessage: "Could not create user",
            }
        }
    }

    public async getAllUsers(): Promise<User[]> {
        return AppDataSource.manager.find(User)
    }

    public async login(username: string, password: string) {
        try {
            const users = AppDataSource.getRepository(User);
            const user = await users.findOneBy({username: username})

            if (!user) throw Error;

            if (!bcryptjs.compareSync(password, user?.password)) {
                return {
                    errorCode: 1008,
                    errorMessage: "Incorrect password",
                }
            }

            const authTokenData = {
                id: user.Id,
                username: user.username, 
            }

            const authToken = jwt.sign(authTokenData, Config.jwt.secretOrPrivateKey)
            console.log(authToken);
            return {
                user: username,
                authToken: authToken,
            };
        } catch (error) {
            return {
                errorCode: 1009,
                errorMessage: "Could not Login"
            }
        }
    }

    public async editUser(userId: number,password: string) {
        try {
            const users = AppDataSource.getRepository(User);
            const user = await users.findOneBy({Id: userId})

            if (!user) throw Error

            const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g;
            
            if (password.match(passwordRegex) === null) {
                return({
                    errorCode: 1001,
                    errorMessage: "Password must contain at least 8 characters,\n " +
                                    "One uppercase letter,\n" +  
                                    "One lowercase letter,\n" + 
                                    "One number and\n" +
                                    "One special character",
                })
            }

            const passwordHash = await bcryptjs.hash(password, 10)

            user.password = passwordHash;

            return await AppDataSource.manager.save(user);
        } catch (error) {
            return {
                errorCode: 1010,
                errorMessage: "Could not change password"
            }
        }
    }
}