require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;  
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;    
const DB_USER = process.env.DB_USER;    
const DB_PASSWORD = process.env.DB_PASSWORD;


module.exports = {  
    NODE_ENV,
    PORT,
    DB_NAME,    
    DB_HOST,
    DB_USER,
    DB_PASSWORD
}