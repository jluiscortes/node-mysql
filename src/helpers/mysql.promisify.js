const { mysqlConnection } = require("../database/mysql.database");
const util = require("util");
module.exports = {
  execute: util.promisify(mysqlConnection.query).bind(mysqlConnection),
};
