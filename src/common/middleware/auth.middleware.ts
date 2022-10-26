import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {Config} from "../config";

export class AuthMiddleware {
    public static verifyAuthToken(req: Request, res: Response, next: NextFunction) {
        const token: string | undefined = req.headers.authorization;
        if (!token) {
            return res.status(401).send("No auth token specified");
        }

        const [ tokenType, tokenString ] = token.trim().split(" ");

        if (tokenType !== "Bearer") {
            return res.status(401).send("Invalid auth token type");
        }

        const jwtResult = jwt.verify(tokenString, Config.jwt.secretOrPrivateKey)
        
        if (typeof jwtResult !== "object") {
            return res.status(401).send("Bad auth token data.");
        }

        next();
    }
}