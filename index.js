//IMPORT MYSQL2
const mysql = require('mysql2');

//REQUIRED PACKAGES
const generateServer = require('./server');
const inquirer = require('inquirer');
const fs = require ('fs');
const password = process.env.password

// FUNCTION TO CONNECT TO DB
//Encrypt my password??????
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: password,
    database: 'employee_tracker'
  },
  console.log('Connected to the employee tracker database.')
);

//BUILT IN MYSQL METHOD TO CONNECT DB TO SERVER
db.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + db.threadId + "\n");
  
});
runApp();

//ARRAY OF USER OPTIONS
function runApp(){
inquirer.prompt ([
  {
    type: "list",
    name: "options",
    message: "Please select from the following options (use arrows)",
    choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
  },

])


// FUNCTION TO WRITE TO SERVER FILE
.then (response => 
  {
    fs.writeFileSync('server.js')
    console.log('Successfully wrote to server.js');
})






}