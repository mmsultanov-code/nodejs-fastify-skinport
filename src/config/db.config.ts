import config from './config'
const {Client} = require('pg')

const client = new Client({
    host: config.database.dev.host,
    user: config.database.dev.username,
    port: config.database.dev.port,
    password: config.database.dev.password,
    database: config.database.dev.name,
})

client.connect()

export {
    client
}