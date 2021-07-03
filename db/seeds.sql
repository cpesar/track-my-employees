-- INSERT INTO <table name> let's us know which table we will load the data into

-- WHERE CLAUSE: allows us to filter through data in a table

    -- DEPARTMENT TABLE
    -- department_id will fill in succession
INSERT INTO department (department_name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

    -- ROLES TABLE
    -- role_id will fill in sucession
INSERT INTO roles (job_title, role_salary, department_id)
VALUES
  ("Graphic-Designer", 50000, 1),
  ("Sales-Manager", 45000, 1),
  ("Salesperson", 45000, 1),
  ("Lead-Tech", 55000, 2),
  ("Tech", 35000, 2),
  ("Finance-Manager", 90000, 3),
  ("Accountant", 70000, 3),
  ("Business-Analyst", 60000, 1),
  ("Copywriter", 40000, 4),
  ("Lawyer", 80000, 4);


    -- EMPLOYEE TABLE
    -- employee_id will fill in succession
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Jim", "Lahey", 1, 1),
  ("Cal", "Ripken", 2,  NULL),
  ("Jim", "Palmer", 3, 1),
  ("Billy", "Bob", 4, NULL),
  ("Matthew", "McConughey", 5, 4),
  ("Barry", "Bonds", 6, NULL),
  ("Derek", "Jeter", 7, 6),
  ("Lamar", "Jackson", 8, 1),
  ("Brett", "Farve", 9, 4),
  ("Bill", "Lumburgh", 10, NULL);