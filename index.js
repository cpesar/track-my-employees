require('dotenv').config()
//IMPORT MYSQL2
const mysql = require('mysql2');

//REQUIRED PACKAGES
const generateServer = require('./server');
const inquirer = require('inquirer');
const fs = require ('fs');
// const password = process.env.password

// const db = require('dotenv')
// db.connect({
//   host: process.env.DB_HOST,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS
// })




// FUNCTION TO CONNECT TO DB
// Encrypt my password??????
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password:process.env.DB_PASS,
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
      case "Add an employee":
        addEmployee();
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


// function addEmployee(){
//   db.query(`SELECT * FROM roles`, function(err, res){
//   if(err) throw err;


//   inquirer.prompt([
//     {
//      name: "first_name",
//      type: "input",
//      message: "What is your first name?"
//     },
//     {
//      name: "last_name",
//      type: "input",
//      message: "What is your last name?" 
//     },
//     {
//       name: "role_id",
//       type: "raw-list",
//       messages: "What is your role id?",
//       choices: res.map(item => {
//         item.role_title
//       })
//     },
//     {
//       name: "manager_id",
//       type: "raw-list",
//       message: "What is your manager id?",
//       choices: res.map(item => {
//         item.first_name
//       })
      
//     }
//   ]).then (answer => {
//     const employeeRole = res.find(item => item.role_title === answer.role_id)
//     db.query(`INSERT INTO employee SET ? `, { 
//       first_name: answer.first_name,
//       last_name: answer.last_name,
//       role_id: employeeRole.id
//     }, function(err, res){
//       if(err) throw err
//       console.log("Successfully added new employee!");
//       runApp(); 
//     });
//   }); 
// });
// }

function addEmployee() {
  db.query("SELECT * FROM roles", function (err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the new employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the new employee's last name?"
      },
      {
        name: "roleId",
        type: "list",
        choices: results.map(item => item.role_title),
        message: "Select a role for the employee"
      }
    ]).then(function (answers) {
      const selectedRole = results.find(item => item.role_title === answers.roleId);
      db.query("INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: selectedRole.id
        }, function (err, res) {
          if (err) throw err;
          console.log("Added new employee named " + answers.firstName + " " + answers.lastName + "\n");
          runApp();
        })
    })
  })
};



}