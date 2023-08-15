const {runQuery} = require("../services/mysql.service")
const Message = require("../models/message.model");

async function getUsers(req, res) {
    try{
        const query = `SELECT * FROM users`;
        const dataUsers = await runQuery(query);
        new Message(200, "Operation successfully completed.", dataUsers).send(res);
    }catch(error){
        console.log(error);
        new Message(500, "Error : " + error.message, []).send(res);
    }
}

module.exports = {
    getUsers
}