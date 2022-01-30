const env = process.env

const config = {
db: {
    host: "localhost",
    user: "node",
    password: "!!N0d3p@55!!",
    database: "node_content",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
},
sequelize_db: {
    host: "localhost",
    username: "node",
    password: "!!N0d3p@55!!",
    database: "node_content",
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
    }
},
}


module.exports = config