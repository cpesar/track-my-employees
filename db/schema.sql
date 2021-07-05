DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;
 

----------------------DEPARTMENT TABLE
CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(15),
  PRIMARY KEY (id)
);

----------------------ROLE TABLE
CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  job_title VARCHAR(15),
  department_id INTEGER,
  role_salary DECIMAL,
  PRIMARY KEY(id),
  -- Sets the relationship between the role table and the department table
  FOREIGN_KEY (department_id) REFERENCES department(id)  
);

-- Sets the relationship between the role table and the department table
--------------------EMPLOYEE TABLE
CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY(id),

-- Sets the relationship between the employee table and the role table
  FOREIGN_KEY (role_id) 
  REFERENCES role(id) 
  ON DELETE CASCADE SET NULL
-- Self references manager with employee in the employee table
  FOREIGN_KEY (manager_id) 
  REFERENCES employee(id) 
  ON DELETE SET NULL
);


