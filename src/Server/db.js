require('dotenv').config(); //loads env variables from .env

//configure connection to postgres database
const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    /*
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database:process.env.PG_DATABASE
    */
})


module.exports = pool;