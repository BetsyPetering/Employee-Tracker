DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE depts (
  dept_id INT NOT NULL,
  dept_name VARCHAR(30),
  PRIMARY KEY (dept_id)
)

CREATE TABLE emp_roles (
  role_id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  dept_id INT NOT NULL,
  PRIMARY KEY (role_id)
);

CREATE TABLE employees (
  emp_id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (emp_id)
);

SELECT * FROM employees;
select * from depts;
select * from emp_roles;
