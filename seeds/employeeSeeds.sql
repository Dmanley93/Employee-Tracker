DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id) 
);

CREATE TABLE employeeRole (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES
("500-Sanitation"),
("400-Design"),
("200-IT"),
("100-Management");

INSERT INTO employeeRole(title, salary, department_id)
VALUES
("1-CEO", 1000000.00, 100),
("2-Manager", 150000.00, 100),
("3-Software Developer", 70000.00, 200),
("4-Designer", 60000.00, 400),
("5-Janitor", 50000.00, 500);

INSERT INTO employee(first_name, last_name, role_id)
VALUES
('Daniel', 'Danielson', 1),
('Jon', 'Jonson', 2),
('Pete', 'Peteson', 3),
('Angela', 'Angelason', 4),
('Josie', 'Josieson', 5)