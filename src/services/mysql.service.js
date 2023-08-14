const {mysqlConnection} = require('../database/mysql.database');


async function runQuery(query) {    
    try{
        const rows = await new Promise(async(resolve, reject) => {
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

async function getShemaWithLimitOffset(schema,limit,offset) {    
    try{
        const rows = await new Promise(async(resolve, reject) => {
            const query  = `SELECT * FROM ${schema} LIMIT ${limit} OFFSET ${offset}`;
            const getRows = mysqlConnection.query(query, (err, rows) => {
                if(err) new Error("Error in connection databae");
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
module.exports = {
    runQuery,
    getShemaWithLimitOffset,
    getSchemaWithWhereCondition
}