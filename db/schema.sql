-- PRIMARY KEY: each value in the column must be unique for each record in the table

-- AUTO INCREMENT: increments with each successive row and assigns a new value to the id

-- Using the id keyword ensures that even if columns are identical, the id will be different allowing you to distinguish between records

-- foreign key: a field in one table that references the primary key of another table


-- DROP TABLE IF EXISITS: This will delete the tables everytime the schema.sql file is run, ensuring you start with a clean slate
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;





-- CREATE A DEPARTMENT TABLE
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  -- NOT NULL MEANS THAT THE COLUMN MUST CONTAIN A VALUE
  department_name VARCHAR(30) NOT NULL
);





-- CREATE A ROLES TABLE
CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30) NOT NULL,
  role_salary INTEGER,
  department_id INTEGER 
);




-- CREATE AN EMPLOYEE TABLE
CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER NULL 
);



