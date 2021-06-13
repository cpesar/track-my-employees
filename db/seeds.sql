-- INSERT INTO <table name> let's us know which table we will load the data into

-- WHERE CLAUSE: allows us to filter through data in a table

    -- DEPARTMENT TABLE
INSERT INTO department (department_name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

    -- ROLES TABLE
INSERT INTO roles (role_title, role_salary, department_id)
VALUES
  ("Manager", 60000, 2),
  ("Salesperson", 45000, 1),
  ("Tech", 35000, 3),
  ("Lawyer", 80000, 4);


    -- EMPLOYEE TABLE
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ("Jim", "Lahey", 2, NULL),
  ("Cal", "Ripken", 4, NULL );