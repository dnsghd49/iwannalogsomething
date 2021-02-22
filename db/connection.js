const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees"
});

connection.connect();
// Setting up this file to use promises, so I don't have to do callbacks, which allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;