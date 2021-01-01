SELECT * FROM employee_cms.department 
LEFT JOIN employee_cms.job ON employee_cms.department.id
WHERE employee_cms.department.id = employee_cms.job.department_id;

SELECT * FROM employee_cms.job WHERE department_id = 1;