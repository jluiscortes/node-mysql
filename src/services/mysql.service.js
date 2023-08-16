const { func } = require('joi');
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
async function addSchemaRow(schema, values){
    try{
        console.log({
            schema,
            values
        })
        const query = `INSERT INTO ${schema} SET ?`;
        const responseMysql = await db.execute(query,values);
        return responseMysql;
    
    }catch(error){
        console.log(error);
        throw new Error ("Error in connection database");   
    }
}
async function updateSchemaRow(schema, values,id){
    try{
        const query = `UPDATE ${schema} SET ? WHERE id = ${id}`;
        const responseMysql = await db.execute(query,values);
        return responseMysql;
    
    }catch(error){
        console.log(error);
        throw new Error ("Error in connection database");   
    }
}
async function deleteSchemaRow(schema, id){
    try{
        const query = `DELETE FROM ${schema} WHERE id = ${id}`;
        const responseMysql = await db.execute(query);
        return responseMysql;
    
    }catch(error){
        console.log(error);
        throw new Error ("Error in connection database");   
    }
}
module.exports = {
    runQuery,
    getShemaWithLimitOffset,
    getSchemaWithWhereCondition,
    addSchemaRow,
    updateSchemaRow,
    deleteSchemaRow
}