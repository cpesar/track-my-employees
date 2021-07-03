//START THIS WITH `node index.js`
// REQUIRE dotenv for password
require('dotenv').config()

//REQUIRED DEPENDENCIES
// const generateServer = require('./server');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require ('fs');

// const cTable = require('console.table');
// const db = require('./db/connection');

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

//ARRAY OF USER OPTIONS
function runApp(){
inquirer.prompt ([
  {
    type: "list",
    name: "choice",
    message: "Please select from the following options (use arrows)",
    choices: 
    [
      "View all employees", 
      "View all roles", 
      "View all departments", 
      "Add an employee", 
      "Update an employee role",
      "Add a role", 
      "Add a department", 
    ]
  },



// FUNCTION TO WRITE TO CREATE TABLE
]).then (response => 
  {
    switch(response.choice){
      case "View all employees":
        viewAllEmployees();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all departments":
        viewDepartments();
        break;

      case "Add an employee":
        addEmployee();
        break;

      case "Update employee role":
        updateRole();
        break;

      case "Add a role":
        addRole();
        break;

      case "Add a department":
        addDepartment();
        break;
    }
  })


//METHODS CALLED BY SWITCH CASE TO BE HOISTED

//EMPLOYEE TABLE
function viewAllEmployees(){
  console.log('does this work');
  db.query(`SELECT * FROM employees`, function(err, res){
    
    if(err) throw err
    
    console.table(res)
    runApp(); 
  })
}

//ROLES TABLE
function viewRoles(){
  db.query(`SELECT * FROM roles`, function(err, res){
    if(err) throw err
    console.table(res)
    runApp(); 
  })
}

//DEPARTMENTS TABLE
function viewDepartments(){
  //sql query, get applied to the function after
  db.query(`SELECT * FROM department`, function(err, res){
    if(err) throw err
    console.table(res)
    runApp(); 
  })
}

//ADD AN EMPLOYEE
function addEmployee(){
  db.query(`SELECT * FROM roles`, function(err, res){
  if(err) throw err;

  inquirer.prompt([
    {
     name: "first_name",
     type: "input",
     message: "What is your first name?"
    },
    {
     name: "last_name",
     type: "input",
     message: "What is your last name?" 
    },
    {
      name: "role_id",
      type: "list",
      messages: "What is your role id?",
      choices: res.map(item => 
        item.role_title
      )
    },
    // {
    //   name: "manager_id",
    //   type: "raw-list",
    //   message: "What is your manager's id?",
    //   choices: res.map(item => {
    //     item.first_name
    //   })
      
    // }
  ]).then (answer => {
    const employeeRole = res.find(item => item.role_title === answer.role_id)
    db.query(`INSERT INTO employees SET ? `, { 
      first_name: answer.first_name,
      last_name: answer.last_name,
      role_id: employeeRole.id
    }, function(err, res){
      if(err) throw err
      console.log("Successfully added new employee!");
      runApp(); 
    });
  }); 
});
}


//update role
function updateRole (){
  db.query(`SELECT * FROM employees`, function(res, err){
    if(err) throw err;
    inquirer.prompt([
      {
        name: 'updatedRole',
        type: 'list',
        message: 'Select the employee who you would like to update',
        choices: res.map(employee => employee.first_name)
      }
    ]).then(answer => {
      const updatedRole = (answer.updatedRole);
      db.query(`SELECT * FROM roles`, function (err, res) {
        if(err) throw err;
        inquirer.prompt ([
          {
            name: 'role_id',
            type: 'list',
            message: 'Select a role for the employee',
            choices: res.map(role => role.role_title )
          }
        ]).then(answer => {
          const roleChosen = res.find (role => role.role_title === answer.role_id)
          db.query(`UPDATE employees SET ? WHERE first_name = ` + "'" + updatedRole + "'" , {
            role_id: "" + roleChosen.id + "" 
          }, 
          function (err) {
            if(err) throw err;
            console.log('Employee role successfully updated!')
            runApp();
          })
        })
      })
    })
  })
}

//add a role
// function addRole (){
//   db.query(`SELECT * FROM department`, function(res, err){
//     // if (err) throw err;
//     inquirer.prompt([
//       {
//        name: "addRole",
//        type: "input",
//        message: "What role would you like to add?"
//       },
//       {
//        name: "salary",
//        type: "number",
//        message: "What salary does this role have" 
//       },
//       {
//         name: "department_id",
//         type: "list",
//         messages: "What is department id?",
//         choices: res.map(item => 
//           item.department_id
//         )
//       },
//     ]).then(answer => {
//       const selectedDepartment = res.find(item => item.department_id === answer.department_id)

//       db.query(`INSERT INTO role SET ?`, {
//         role_title: answer.addRole,
//         role_salary: answer.salary,
//         department_id: selectedDepartment.id
//       }, function(err, res){
//         if(err) throw err
//         console.log("Successfully added new role!");
//         runApp(); 
//     })
//     })
//   })
// }



//ADD DEPARTMENT 
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

// runApp();