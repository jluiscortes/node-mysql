const {getShemaWithLimitOffset,getSchemaWithWhereCondition,addSchemaRow} = require("../services/mysql.service")
const Message = require("../models/message.model");
const User = require("../models/user.model");
const createError = require("http-errors");

async function getUsers(req, res, next) {
    try{
        const rows = await getShemaWithLimitOffset("users",100,0);
        const rowsUsers = rows.map(row => new User(row));
        return new Message(200, "Operation successfully completed.", rowsUsers).send(res);
    }catch(error){
        console.log(error);
        next(createError.InternalServerError(error.message));
    }
}
async function findUserById(req, res, next) {
    try {
        if(!req.params.id) return new Message(400, "Id is required." , []).send(res);
        const rows = await getSchemaWithWhereCondition("users","id",req.params.id);
        const rowsUsers = rows.map(row => new User(row));
        return new Message(200, "Operation successfully completed.", rowsUsers).send(res);
    } catch (error) {
        next(createError.InternalServerError(error.message));
    }
}
async function addUser(req, res, next) {
    try {
        const {error, value} = await userSchema.validate(req.body);
        if(error) return new Message(400, error.message , []).send(res);
        const user = new User(value);
        const responseAddUser = await addSchemaRow("users",user);
    } catch (error) {
        next(createError.InternalServerError(error.message));
    }
}

module.exports = {
    getUsers,
    findUserById,
    addUser
}