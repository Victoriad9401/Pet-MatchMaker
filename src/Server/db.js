require('dotenv').config(); //loads env variables from .env

//configure connection to postgres database
const Pool = require("pg").Pool;
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

module.exports = pool;