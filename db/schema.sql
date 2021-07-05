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
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

--------------------EMPLOYEE TABLE
CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY(id),

-- Sets the relationship between the employee table and the role table
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee(id) ON DELETE SET NULL,
-- Self references manager with employee in the employee table
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);


