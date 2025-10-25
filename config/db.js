require('dotenv').config(); // load environment

const mysql = require('mysql2/promise'); // promise based client

// parse db url
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
    throw new Error ('Database URL belom di pasang di .env')
} 

const url = new URL(dbUrl);

const pool = mysql.createPool({
    host : url.hostname,
    user : url.username,
    password : url.password,
    database : url.pathname.replace(/^\//,''),
    port : url.port ? Number(url.port) : 3306,
    waitForConnections: true,
    connectionLimit : 10,
    queueLimit : 0,
    dateStrings: true
});

module.exports = pool;