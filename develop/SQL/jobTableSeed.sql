/*seed file for job (role) table*/

USE employee_cms;

INSERT INTO job(title,salary,department_id)
VALUES("Engineering_Manager",150000,1),("Engineer_II",120000,1),("Engineer_1",85000,1),
("Finance_Manager",200000,2),("Accountant",150000,2),("Sales_Rep",100000,2),
("Feild_Supervisor",110000,3),("Feild_Tech_II",80000,3),("Feild_Tech_1",60000,3),
("Human_Resources_Manager",150000,4),("HR_Administrator",80000,4),("HR_Associate",50000,4);
