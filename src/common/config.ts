import ConfigInterface from "./config.interface";
import * as dotenv from "dotenv";

const dotEnv = dotenv.config();
if (dotEnv.error) {
    throw `.env config error: ${dotEnv.error}` 
}

export const Config: ConfigInterface = {
    server: {
        port: parseInt(<string>process.env?.SERVER_PORT),
    },
    database: {
        host: process.env?.DATABASE_HOST,
        port: parseInt(<string>process.env.DATABASE_PORT),
        username: process.env?.DATABASE_USER,
        password: process.env?.DATABASE_PASSWORD,
        database: process.env?.DATABASE_DATABASE,
        charset: process.env?.DATABASE_CHARSET,
        timezone: process.env?.DATABASE_TIMEZONE,
    },
    jwt: {
        secretOrPrivateKey: process.env?.JWT_SECREET || "",
        algorithm: "RS256",
        issuer: "localhost",
    }
}