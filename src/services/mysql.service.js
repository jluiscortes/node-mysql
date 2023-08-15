const { mysqlConnection } = require('../database/mysql.database');
const mysql = require("../helpers/mysql.promisify")

async function runQuery(query) {    
    try{
        return mysql.query(query);
    }catch(error){
        console.log(error);
        throw new Error ("Error in connection database");   
    }finally{
        mysqlConnection.end();
    } 
}

async function getShemaWithLimitOffset(schema,limit,offset) {    
    try{
        return new Promise(async(resolve, reject) => {
            const query  = `SELECT * FROM ${schema} LIMIT ${limit} OFFSET ${offset}`;
            const getRows = mysqlConnection.query(query, (err, rows) => {
                if(err) reject(err);
                resolve(rows);  
            });
            await mysqlConnection.query(query, getRows);
        })

    }catch(error){
        console.log(error);
        throw new Error (error);   
    }finally{
        mysqlConnection.end();
    } 
}

async function getSchemaWithWhereCondition(schema,limit,offset,whereCondition) {    
    try{
        const rows = await new Promise(async(resolve, reject) => {
            const query = `SELECT * FROM ${schema} WHERE ${whereCondition} LIMIT ${limit} OFFSET ${offset}`;
            const getRows = mysqlConnection.query(query, (err, rows) => {
                if(err) reject([]);
                resolve(rows);  
            });
            await mysqlConnection.query(query, getRows);
        })

        return rows;  
    }catch(error){
        console.log(error);
        throw new Error ("Error in connection database");   
    }finally{
        mysqlConnection.end();
    } 
}
async function addSchemaRow(schema, data){
    try{
        return await new Promise(async(resolve, reject) => {
            const query = `INSERT INTO ${schema} SET ?`;
            const getRows = mysqlConnection.query(query, data, (err, rows) => {
                if(err) reject(error);
                resolve(rows);  
            });
            await mysqlConnection.query(query, getRows);
        })
    }catch(error){
        console.log(error);
        throw new Error ("Error in connection database");   
    }finally{
        mysqlConnection.end();
    } 
}
module.exports = {
    runQuery,
    getShemaWithLimitOffset,
    getSchemaWithWhereCondition,
    addSchemaRow
}