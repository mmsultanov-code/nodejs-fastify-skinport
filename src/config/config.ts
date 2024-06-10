import dotenv from 'dotenv'

dotenv.config()

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    database: {
        dev: {
            username: process.env.DB_USER_DEV,
            password: process.env.DB_PASS_DEV,
            name: process.env.DB_NAME_DEV,
            host: process.env.DB_HOST_DEV,
            port: process.env.DB_PORT_DEV
        },
        production: {
            username: process.env.DB_USER_PROD,
            password: process.env.DB_PASS_PROD,
            name: process.env.DB_NAME_PROD,
            host: process.env.DB_HOST_PROD,
            port: process.env.DB_PORT_PROD
        }
    }
}

export default config