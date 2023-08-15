const { mysqlConnection } = require('../database/mysql.database');
const db = require("../helpers/mysql.promisify")

async function runQuery(query) {    
    try{
        return await db.execute(query);
    }catch(error){
        console.log(error);
        throw new Error ("Error in connection database");   
    }
}

async function getShemaWithLimitOffset(schema,limit,offset) {    
    try{
        const query  = `SELECT * FROM ${schema} LIMIT ${limit} OFFSET ${offset}`;
        const data = await db.execute(query);
        return data;
    }catch(error){
        console.log(error);
        throw new Error (error);   
    }
}

async function getSchemaWithWhereCondition(schema,field,condition) {    
    try{
        const query = `SELECT * FROM ${schema} WHERE ${field} = ${condition}`;
        const data = await db.execute(query);
        return data;  
    }catch(error){
        console.log(error);
        throw new Error ("Error in connection database");   
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