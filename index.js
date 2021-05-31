//REQUIRED PACKAGES
const generateServer = require('./server');
const inquirer = require('inquirer');
const fs = require ('fs');


//ARRAY OF USER OPTIONS
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