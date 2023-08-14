const { getShemaWithLimitOffset,getSchemaWithWhereCondition } = require("../services/mysql.service")

/* runQuery("SELECT * FROM dummy_db.users;").then((result) => {
    console.log({
        result
    })
}) */

getShemaWithLimitOffset("dummy_db.users",10,0).then((result) => {
    console.log({
        result
    })
})