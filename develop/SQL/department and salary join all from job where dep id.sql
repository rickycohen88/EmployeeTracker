SELECT department.id, department.name, department.manager, job.salary 
FROM employee_cms.department INNER JOIN employee_cms.job WHERE department.id = job.department_id;

SELECT * FROM employee_cms.job WHERE department_id = 1;