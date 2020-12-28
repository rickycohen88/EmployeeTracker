

update department
set department.operating_budget = ( SELECT sum( employee_cms.job.salary) FROM employee_cms.job WHERE department_id =4)
where id =4;

