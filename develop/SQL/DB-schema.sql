DROP DATABASE IF EXISTS employee_cms;
CREATE DATABASE employee_cms;

USE employee_cms;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR (30),
PRIMARY KEY(id),
manager VARCHAR(30) NULL
);
CREATE TABLE job(
id INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY (id),
title VARCHAR (30),
salary FLOAT(10,2),
department_id INT,
FOREIGN KEY(department_id) REFERENCES department(id)
);
CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY(id),
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT NULL,
FOREIGN KEY(role_id) REFERENCES job(id)
);
