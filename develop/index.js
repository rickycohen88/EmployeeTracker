//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const myTable = require("console.table");
const asciiArt = require("asciiart-logo");
const conFig = require('../package.json');
const util = require("util");
const { restoreDefaultPrompts } = require("inquirer");
const { connect } = require("http2");
// fs = require("fs");
// path = require("path");
// express = require("express");

//MySQL Database Connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "2951367",
  database: "employee_cms",
});
connection.query = util.promisify(connection.query);

// query db for a table
function viewTable(selTbl){
  connection.query("SELECT * FROM ?",[selTbl],function(err, res){
    if (err) throw err;
    console.table(res);
  });
 
};

// function to Query DB for department total

function budget(x) {
  let budgetQuery = "SELECT sum( employee_cms.job.salary) FROM employee_cms.job WHERE department_id =?;";
  return connection.query(budgetQuery,[x]);
  
 };

 // aysnc function to be used for queries outside of choices in prompt when await needed for variables
 async function getMgId(){
  let things = await connection.query("SELECT * FROM employee");
  let data = [];

      for (let i = 0; i < things.length; i++) {
          let x = {};
          x.name = things[i].first_name +things[i].last_name;
          x.value = things[i].first_name + things[i].last_name;
          data.push(x);
      }

      console.log(data);
      console.log(things);

      return data;
      
};


 //opens connection to db and calls mainMenu function.
connection.connect(function (err) {
  if (err) throw err;
// render ascii logo
console.log(asciiArt(conFig).render());
//call main menu
mainMenu();
});

//  opens connection to db and calls mainMenu function.
//  connection.connect(function (err) {
//   if (err) throw err;
// connection.query()
// });
// main menu function
function mainMenu() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "main",
          message: "Where would you like to start?",
          choices: [
            {
               name: "view departments,Job Titles,Employees,Managers",
              value: "view",
            },
            {  name: "change or add departments, roles, employees or Managers", 
              value: "change" 
            },
            {  name: "Exit the Program.",
              value: "exit" 
            },
          ],
        },
      ])
      .then(function (userChoice) {
        switch (userChoice.main) {
          case "view":
            view();
            break;
          case "change":
            change();
            break;
          case "exit":
            ExitFunction();
            break;
        }
      });
};
// function to exit cms system.
function ExitFunction() {
  connection.end();
  console.log("mysql connection ended");
  process.exit(0);
}

// find what is to be viewed then didplay it and find out whats next.
function view(){
    inquirer.prompt([
      {
        name:"viewMain",
        message:"What would you like to view?",
        type:"list",
        choices:[
          {name:"Departments(manager,roles, personnel, operating budget)",value:"departments"},
          {name:"Job Titles(all roles within the company the department they belong to and the current salary)",value:"roles"},
          {name:"Employees(all or by manager)",value:"employee"},
          {name:"Back to main menu",value:"backToMain"}
        ]
      },
      {
        type:"list",
        name:"titleMain",
        message:"Would you like to look by department or all? ",
        choices:[
          {name:"all",value:"all"},
          {name:"By Department",value:"dept"}
        ],
        when:function(responce){
          return responce.viewMain.indexOf('roles')>-1;}
      },
      {
        type:"list",
        name:"titleDepartment",
        message:"Which department? ",
        choices:async function(){
          let things = await connection.query("SELECT * FROM employee_cms.department;");
          let data = [];
          for (let i = 0; i < things.length; i++) {
             let x = {};
             x.name = things[i].name;
             x.value = things[i].id;
             data.push(x);
          }
          return data;
        },
        when:function(responce){
          if(responce.viewMain.indexOf('roles')>-1){
              if(responce.titleMain.indexOf('dept')>-1){
                return true;
              }
              else{return false;}
          }
          else{return false;}
        }
      },
      {
        type:"list",
        name:"employeeChoices",
        message:"how would you like to view the company personell",
        choices:[
          {name:"all",value:"all"},
          {name:"by manager",value:"manager"},
          {name:"by department",value:"department"},
          ],
        when:function(responce){
          return responce.viewMain.indexOf('employee')>-1;
        }
      },
      {
        type:"list",
        name:"employeeManager",
        message:"how would you like to view the company personnell",
        choices:async function(){
             let things = await connection.query("SELECT * FROM employee WHERE manager_id IS NULL;");
             let data = [];
          for (let i = 0; i < things.length; i++) {
                let x = {};
                x.name = things[i].first_name+" "+things[i].last_name;
                x.value = things[i].id;
                data.push(x);
          }
         return data;
        },
        when:function(responce){
          if(responce.employeeChoices == 'manager'){
            return true;
          }
          else{return false;}
        }
      },
      {
        type:"list",
        name:"employeeDepartment",
        message:"how would you like to view the company personnell",
        choices:async function(){
          let things = await connection.query("SELECT * FROM department;");
          let data = [];
          for (let i = 0; i < things.length; i++) {
             let x = {};
             x.name = things[i].name;
             x.value = things[i].id;
             data.push(x);
          }
          return data;
        },
        when:function(responce){
          if(responce.employeeChoices == 'department'){
            return true;
        }
          else{return false};
          
        },
        
      },
     
    ]).then(function (responce){ 
      console.log(responce);
      let buildQuery;
      switch(true){
        
        case (responce.employeeChoices =='all'):
              connection.query("SELECT * FROM employee;",function(err,res){
                if(err) throw err;
                console.table(res);
                mainMenu();
              });
          break;
        case(responce.employeeChoices =='manager'):
              buildQuery = responce.employeeManager;
             connection.query("SELECT * FROM employee WHERE manager_id = ?",[buildQuery],function(err,res){
                if(err) throw err;
                console.table(res);
                mainMenu();
              });
          break;

          case(responce.employeeChoices =='department'):
                buildQuery = responce.employeeDepartment;
               connection.query("SELECT * FROM employee_cms.employee WHERE role_id in (SELECT id FROM employee_cms.job WHERE department_id = ?);",
               [buildQuery],function(err,res){ if(err) throw err;
                console.table(res);
                mainMenu();
               });
            break;
        
        case (responce.titleMain =='all'):
          connection.query("SELECT * FROM job",function(err,res){
            if(err) throw err;
            console.table(res);
            mainMenu();
          });
          break;
        case (responce.titleMain =='dept'):
          buildQuery = responce.titleDepartment;
          connection.query("SELECT * FROM job WHERE department_id = ?",[buildQuery],function(err,res){
            if(err) throw err;
            console.table(res);
            mainMenu();
          });
          break;
        case (responce.viewMain.indexOf('departments')>-1):
          connection.query("SELECT * FROM department;",function(err,res){
            if(err) throw err;
            console.table(res);
            mainMenu();
          });
          break;
          case (responce.backToMain>-1):
            mainMenu();
            break;
        default:
          console.log("you have hit the default switch case... whaaa whaaaaa.");
          mainMenu();
    
      };
    })
    .catch((err => {console.log("There was an ErRoR..with prompt",err);}));
      
};

// navigate to what needs to be updated deleted or added.
function change(){
  inquirer.prompt([

    {
      type:"list",
      name:"changeMain",
      message:"What would you like to do?",
      choices:[
        {name:"Add(department, title/role or employee)",value:"Add"},
        {name:"Change(department, title/role or employee)",value:"Change"},
        {name:"Delete(department, title/role or employee)",value:"Delete"}
      ]
    },
    {
      type:"list",
      name:"addSelection",
      message:"What would you like to add",
      choices:[
        {name:"A department",value:"dept"},
        {name:"A job title/role",value:"job"},
        {name:"An employee",value:"emp"}
      ],
      when:function(responce){
        return responce.changeMain.indexOf('Add')>-1;
      }
    },
    {
      name:"addInputDepartment",
      type:"input",
      message:"Please enter the name for the department.",
      when:function(responce){
        return responce.addSelection.indexOf('dept')>-1;
      },
      validate:function(input){
        let regex = /['"`+*-]/;
        let x = input.search(regex);
        if(x == -1){
          return true;
        }
        else{
          return false;
        };
      }
    },
    {
      name:"addDepartmentManagerConfirm",
      type:"confirm",
      message:"would you like to add a manager?",
      when:function(responce){
        return responce.addSelection.indexOf('dept')>-1;
      }
    },
    {name:"addDepartmentManagerFirst",
     type:"input",
     message:"Please enter the first name of the manager. No caracters besides letters will be accepted. Should you get an invalid responce you will need to delete the entry that is invalid.ease enter the first name of the manager. No caracters besides letters will be accepted.",
     when:function(responce){
      return responce.addDepartmentManagerConfirm === true;
     },
     validate:function(input){
       let regex = /['"`+*-]/;
       let x = input.search(regex);
       if(x == -1){
         return true;
       }
       else{
         return false;
       };
     }
    },
    {name:"addDepartmentManagerLast",
     type:"input",
     message:"Please enter the last name of the manager. No caracters besides letters will be accepted. Should you get an invalid responce you will need to delete the entry that is invalid.",
     when:function(responce){
      return responce.addDepartmentManagerConfirm === true;
     },
     validate:function(input){
      let regex = /['"`+*-]/;
      let x = input.search(regex);
      if(x == -1){
        return true;
      }
      else{
        return false;
      };
     }
    },
    {
      name:"addInputTitle",
      type:"input",
      message:"Please enter the name for the Role/Title.",
      when:function(responce){
        return responce.addSelection.indexOf('job')>-1;
      },
      validate:function(input){
        let regex = /['"`+*-]/;
        let x = input.search(regex);
        if(x == -1){
          return true;
        }
        else{
          return false;
        };
       }
    },
    {
      name:"addInputSalary",
      type:"number",
      message:"Please enter the salary for the role",
      when:function(responce){
        return responce.addSelection.indexOf('job')>-1;
      },
      validate:function(input){
        if(typeof(input)=='number'){
          return true;
        }
        else{
          return false;
        };
       }
    },
    {
      type:"list",
      name:"addDepartmentRole",
      message:"what department will this role be a part of?",
      choices:async function(){
        let things = await connection.query("SELECT * FROM department;");
        let data = [];
        for (let i = 0; i < things.length; i++) {
           let x = {};
           x.name = things[i].name;
           x.value = things[i].id;
           data.push(x);
        }
        return data;
      },
      when:function(responce){
        return responce.addSelection.indexOf('job')>-1;
      },
    },
    {
      name:"employeeFirstName",
      type:"input",
      message:"Please enter the first name for the employee.",
      when:function(responce){
        return responce.addSelection.indexOf('emp')>-1;
      },
      validate:function(input){
        let regex = /['"`+*-]/;
        let x = input.search(regex);
        if(x == -1){
          return true;
        }
        else{
          return false;
        };
       }
    },
    {
      name:"employeeLastName",
      type:"input",
      message:"Please enter the first name for the employee.",
      when:function(responce){
        return responce.addSelection.indexOf('emp')>-1;
      },
      validate:function(input){
        let regex = /['"`+*-]/;
        let x = input.search(regex);
        if(x == -1){
          return true;
        }
        else{
          return false;
        };
       }
    },
    {
      type:"list",
      name:"employeeRole",
      message:"what role will this employee fill?",
      choices:async function(){
        let things = await connection.query("SELECT * FROM job;");
        let data = [];
        for (let i = 0; i < things.length; i++) {
           let x = {};
           x.name = things[i].title;
           x.value = things[i].id;
           data.push(x);
        }
        return data;
      },
      when:function(responce){
        return responce.addSelection.indexOf('emp')>-1;
      },
    },


  ])
  //start of then statement
  .then(function(responce){
    console.log(responce);
    switch(true){
      case (responce.addSelection.indexOf('dept')>-1):
            let newDeptName;
            let newDeptManager;
            if(responce.addDepartmentManagerConfirm == true){
              newDeptName = responce.addInputDepartment;
              newDeptManager = responce.addDepartmentManagerFirst+"_"+responce.addDepartmentManagerLast;
              connection.query("INSERT INTO department(name,manager) VALUES(?,?)",[newDeptName,newDeptManager],function(err,res){
                if(err) throw err;
                console.table(res);
              });
            }
            else{
              newDeptName = responce.addInputDepartment;
              connection.query("INSERT INTO department(name) VALUES(?)",[newDeptName],function(err,res){
                if(err) throw err;
                console.table(res);
              });
            }

        break;
      case (responce.addSelection.indexOf('job')>-1):

          break;
      case (responce.addSelection.indexOf('emp')>-1):

            break;
      default :
      console.log("you have hit the default switch case in 'change'... whaaa whaaaaa.");
          mainMenu();
    };
    
    mainMenu();})
};








  // {
  //   type:"list",
  //   name:"employees",
  //   message:"please select an employee",
  //   choices: async function () {
  //     let things = await connection.query("SELECT * FROM employee");
      
  //       let data = [];

  //     for (let i = 0; i < things.length; i++) {
  //         let x = {};
  //         x.name = things[i].first_name + " " + things[i].last_name;
  //         x.value = things[i].first_name + " " + things[i].last_name;
  //         data.push(x);
  //     }

  //     return data;
      
  //   },
  //   when:function(responce){
  //     return responce.employeeChoices.indexOf('all')>-1
  //   }
  // },