const mysql = require('mysql2');
// connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
});