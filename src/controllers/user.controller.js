const {getShemaWithLimitOffset,getSchemaWithWhereCondition,addSchemaRow,updateSchemaRow,deleteSchemaRow} = require("../services/mysql.service");
const { userSchema,userSchemaUpdate } = require("../schemas/user.schema")
const Message = require("../models/message.model");
const { User, Users} = require("../models/user.model");
const createError = require("http-errors");

async function getUsers(req, res, next) {
    try{
        const rows = await getShemaWithLimitOffset("users",100,0);
        const rowsUsers = rows.map(row => new Users(row));
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
        const {affectedRows} = await addSchemaRow("users",user);
        if(!affectedRows){
            return new Message(400, "User not added." , []).send(res);
        }
        return new Message(200, "User added successfully.", []).send(res);
    } catch (error) {
        next(createError.InternalServerError(error.message));
    }
}
async function updateUser(req, res, next) {
    try {
        const {id} = req.params;
        if(!id) return new Message(400, "Id is required." , []).send(res);
        const {error, value} = await userSchemaUpdate.validate(req.body);
        if(error) return new Message(400, error.message , []).send(res);
        const user = new User(value).prepareToUpdate();
        const {affectedRows} = await updateSchemaRow("users", user, id);
         if(!affectedRows){
            return new Message(400, "User not updated." , []).send(res);
        } 
        return new Message(200, "User added successfully.", []).send(res); 
    } catch (error) {
        console.log({
            error
        })
        next(createError.InternalServerError(error.message));
    }
}
async function deleteUser(req,res,next){
    try {
        const {id} = req.params;
        if(!id) return new Message(400, "Id is required." , []).send(res);
        const {affectedRows} = await deleteSchemaRow("users", id);
        if(!affectedRows){
            return new Message(400, "User not deleted." , []).send(res);
        }
        return new Message(200, "User deleted successfully.", []).send(res);
    } catch (error) {
        console.log({
            error
        })
        next(createError.InternalServerError(error.message));
    }
}

module.exports = {
    getUsers,
    findUserById,
    addUser,
    updateUser,
    deleteUser
}