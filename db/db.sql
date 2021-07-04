
-- DROP DATABASE IS EXISTS: enables the creation of a new database and only attempt to drop the database if it already exists
DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;
USE employee_tracker;


                -- User Story
-- AS A business owner
-- I WANT to be able to view and manage the departments, roles, and employees in my company
-- SO THAT I can organize and plan my business




            -- Acceptance Criteria



-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
-- WHEN I choose to add a department
-- THEN I am prompted to enter the name of the department and that department is added to the database
-- WHEN I choose to add a role
-- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
-- WHEN I choose to add an employee
-- THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
-- WHEN I choose to update an employee role
-- THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
-- Mock