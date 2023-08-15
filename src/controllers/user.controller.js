const {getShemaWithLimitOffset,addSchemaRow} = require("../services/mysql.service")
const Message = require("../models/message.model");
const User = require("../models/user.model");
const createError = require("http-errors");

async function getUsers(req, res,next) {
    try{
        const rowsUsers = await getShemaWithLimitOffset("users",100,0);
        console.log({
            rowsUsers
        })
        return res.json(rowsUsers);
        //return new Message(200, "Operation successfully completed.", rowsUsers).send(res);
    }catch(error){
        next(createError.InternalServerError(error.message));
        //return new Message(500, `Error : ${error.message}` , []).send(res);
    }
}

async function addUser(req, res,next) {
    try {

        const {error, value} = await userSchema.validate(req.body);
        if(error){
            return new Message(400, error.message , []).send(res);
        }
        const user = new User(value);
        const responseAddUser = await addSchemaRow("users",user);

    } catch (error) {
        next(createError.InternalServerError(error.message));
    }
}

module.exports = {
    getUsers,
    addUser
}