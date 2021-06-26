//REQUIRE dotenv for password
require('dotenv').config()

//IMPORT MYSQL2
const mysql = require('mysql2');



// FUNCTION TO CONNECT TO DB
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:process.env.DB_PASS,
    database: 'employee_tracker'
  },
  console.log('Connected to the employee tracker database.')
);

//BUILT IN MYSQL METHOD TO CONNECT DB TO SERVER
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + db.threadId + "\n");
  runApp();
});

module.exports = db;