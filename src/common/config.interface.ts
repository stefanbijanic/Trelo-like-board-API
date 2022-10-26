export default interface ConfigInterface {
    server: {
        port: number | undefined,
    },
    database: {
        host: string | undefined,
        port: number | undefined,
        username: string | undefined,
        password: string | undefined,
        database: string | undefined,
        timezone: string | undefined,
        charset: string | undefined,
    },
    jwt:{
        secretOrPrivateKey: string,
        algorithm: string,
        issuer: string,
    },
}