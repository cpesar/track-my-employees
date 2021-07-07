// REQUIRE dotenv for password
require('dotenv').config()

//REQUIRED DEPENDENCIES
const mysql = require('mysql2');
const inquirer = require('inquirer');
const fs = require ('fs');
const cTable = require('console.table');

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
      "View all departments", 
      "View all roles", 
      "View all employees", 
      "Add an employee", 
      "Update an employee's title",
      "Add a role", 
      "Add a department", 
    ]
  }



// FUNCTION TO WRITE TO CREATE TABLE
]).then (response => 
  {
    switch(response.choice){
      case "View all departments":
        viewDepartments();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "View all employees":
        viewAllEmployees();
        break;

      case "Add an employee":
        addEmployee();
        break;

      case "Update employee's role":
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


// VIEW ALL DEPARTMENTS TABLE
function viewDepartments(){
  db.query(`SELECT * FROM department`, function(err, res){
    if(err) throw err
    console.table(res)
    runApp(); 
  })
}


// VIEW ALL ROLES TABLE
function viewRoles(){
  db.query(
    `SELECT * FROM role, department
      WHERE department_id = department.id`, 
  function(err, res){
    if(err) throw err
      console.table(res)
      runApp(); 
    })
  }

// VIEW ALL EMPLOYEES TABLE
function viewAllEmployees(){
  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.job_title, role.role_salary, department.department_name,
    CONCAT(e.first_name, " ", e.last_name) AS Manager from employee 
    INNER JOIN role on role.id = employee.role_id
    INNER JOIN department on department.id = role.department_id
    LEFT JOIN employee e on employee.manager_id = e.id`, 
  function (err, res){
    if(err) throw err
    console.table(res)
    runApp(); 
  })
}

// CREATE ROLE ARRAY

// CREATE MANAGER ARRAY

//ADD AN EMPLOYEE
function addEmployee(){
  db.query(`SELECT * FROM employee`, function(err, res){
  if(err) throw err;

  inquirer.prompt([
    {
     name: "first_name",
     type: "input",
     message: "What is your employee's first name?"
    },
    {
     name: "last_name",
     type: "input",
     message: "What is your employee's last name?" 
    },
    {
      name: "role_id",
      type: "list",
      messages: "What is your employee's role id?",
      choices: res.map(item => item.role_id)
    },
    {
      name: "manager_id",
      type: "rawlist",
      message: "What is your manager's id?",
      choices: res.map(item => item.manager_id)
    }

  ]).then (answer => {
    const employeeRole = res.find(item => item.role_id === answer.role_id);
    const managerId = res.find(item => item.manager_id === answer.manager_id);
    db.query(`INSERT INTO employee SET ? `, { 
      first_name: answer.first_name,
      last_name: answer.last_name,
      role_id: employeeRole.id,
      manager_id: managerId.id
    }, function(err, res){
      if(err) throw err
      console.log("Successfully added new employee!");
      runApp(); 
    });
  }); 
});
}


// UPDATE A ROLE
function updateRole (){
  db.query(`SELECT * FROM employee`, function(res, err){
    if(err) throw err;
    inquirer.prompt([
      {
        name: 'updatedRole',
        type: 'list',
        message: 'What is your employee first name?',
        choices: res.map(employee => employee.first_name)
      },
    ]).then(answer => {
      const updatedRole = (answer.updatedRole);
      db.query(`SELECT * FROM role`, function (err, res) {
        if(err) throw err;
        inquirer.prompt ([
          {
            name: 'role_id',
            type: 'list',
            message: 'What is your employee new role?',
            // choices: res.map(role => role.job_title )
          }
        ]).then(answer => {
          const roleChosen = res.find (role => roles.job_title === answer.role_id)
          db.query(`UPDATE employee SET ? WHERE first_name = ` + "'" + updatedRole + "'" , {
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


// ADD A ROLE
function addRole (){
    inquirer.prompt([
      {
       name: "title",
       type: "input",
       message: "What is the jobs title?"
      },
      {
       name: "salary",
       type: "number",
       message: "What salary does this role have?" 
      },
      {
        name: "department_name",
        type: "list",
        message: "What is department name?",
        choices: res.find(item => item.department_name)
      },
    ]).then(answer => {
      // const selectedDepartment = res.map(item => item.department_id === answer.department_id)

      db.query(`INSERT INTO role SET ?`, {
        job_title: answer.title,
        role_salary: answer.salary,
        // department_id: selectedDepartment.id
        department_name: answer.department_name
      }, function(err, res){
        if(err) throw err
        console.log("Successfully added new role!");
        runApp(); 
    })
    })
}


// // ADD A ROLE
// function addRole (){
//   db.query(`SELECT * FROM role`, function(res, err){
//     // if (err) throw err;
//     inquirer.prompt([
//       {
//        name: "title",
//        type: "input",
//        message: "What is the jobs Title?"
//       },
//       {
//        name: "salary",
//        type: "number",
//        message: "What Salary does this role have?" 
//       },
//       // {
//       //   name: "department_name",
//       //   type: "list",
//       //   messages: "What is department name?",
//       //   choices: res.find(item => item.job_title)
//       // },
//     ]).then(answer => {
//       const selectedDepartment = res.map(item => item.department_id === answer.department_id)

//       db.query(`INSERT INTO roles SET ?`, {
//         job_title: answer.Title,
//         role_salary: answer.Salary,
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
     message: "What is the department name?"
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



