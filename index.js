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
    password: "WinterWins$1977",
    // password: password,
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
    switch(response.options){
      case "View all departments":
        viewDepartments();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        addDepartment();
        break;
    }
    
  })


//METHODS CALLED BY SWITCH CASE TO BE HOISTED
function viewDepartments(){
  //sql query, get applied to the function after
  db.query(`SELECT * FROM department`, function(err, res){
    if(err) throw err
    console.table(res)
    runApp(); 
  })
}

function viewRoles(){
  db.query(`SELECT * FROM roles`, function(err, res){
    if(err) throw err
    console.table(res)
    runApp(); 
  })
}

function viewAllEmployees(){
  db.query(`SELECT * FROM employee`, function(err, res){
    if(err) throw err
    console.table(res)
    runApp(); 
  })
}

function addDepartment(){
  inquirer.prompt([
    {
     name: "addDepartment",
     message: "Please add a department"
    }
  ]).then (answer => {
    db.query(`INSERT INTO department SET ? `, { 
      department_name: answer.addDepartment
    }, function(err, res){
      if(err) throw err
      console.log("Successfully added new department!");
      runApp(); 
    })
  }) 
}





}