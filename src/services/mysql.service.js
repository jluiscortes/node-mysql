const { mysqlConnection } = require('../database/mysql.database');


async function runQuery(query, params) {
    try {
        return new Promise(async (resolve, reject) => {
            mysqlConnection.query(query, [params], (err, rows) => {
                if (err) {
                    resolve({
                        status: 500,
                        menssage: "data not found",
                        data: []
                    })
                    return
                }
                resolve({
                    status: 200,
                    menssage: "data found",
                    data: rows[0]
                })
            });
        });
    } catch (error) {
        throw new Error("Error in connection database");
    }
}

module.exports = {
    runQuery
}