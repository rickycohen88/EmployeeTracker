//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const myTable = require("console.table");
const asciiArt = require("asciiart-logo");
const conFig = require('../package.json');
const util = require("util");
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
            {  name: "change departments, roles, employees or Managers", 
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
        name:"employeeChoices",
        message:"how would you like to view the company personell",
        choices:async function(){
             let things = await connection.query("SELECT * FROM employee_cms.employee WHERE manager_id is null;");
             let data = [];
          for (let i = 0; i < things.length; i++) {
                let x = {};
                x.name = things[i].first_name +things[i].last_name;
                x.value = things[i].first_name + things[i].last_name;
                data.push(x);
          }
         return data;
        },
        when:function(responce){
          return responce.employeeChoices.indexOf('manager')>-1;
        }
      },
      {
        type:"list",
        name:"employeeChoices",
        message:"how would you like to view the company personell",
        choices:async function(){
          let things = await connection.query("SELECT name FROM department;");
          let data = [];
          for (let i = 0; i < things.length; i++) {
             let x = {};
             x.name = things[i].name;
             x.value = things[i].name;
             data.push(x);
          }
          return data;
        },
        when:function(responce){
          return responce.employeeChoices.indexOf('department')>-1;
        }
      },
     
    ]).then(function (responce){ 
      console.log(responce);
      // if(responce.viewMain.indexOf('departments')>-1){
      //   query ='employee_cms.department;';
      //   viewTable(query);
      //   mainMenu();
      // };

      switch(true){

        case (responce.employeeChoices>-1):
            if(responce.employeeChoices.indexOf('all')>-1){
              connection.query("SELECT * FROM job;",function(err,res){
                if(err) throw err;
                console.table(res);
                mainMenu();
              });
            };
            if(responce.employeeChoices.indexOf('manager')){
              connection.query("SELECT * FROM job;",function(err,res){
                if(err) throw err;
                console.table(res);
                mainMenu();
              });
            }
          break;
        case (responce.titleMain>-1):
          
          //someFunction(query);
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
      message:"",
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
     message:"Please enter the last name of the manager. No caracters besides letters will be accepted. Should you get an invalid responce you will need to delete the entry that is invalid.ease enter the first name of the manager. No caracters besides letters will be accepted.",
     when:function(responce){
      return responce.addDepartmentManagerConfirm === true;
     },
     validate:function(input){
       console.log(input);
       let regex = /[~^*()#@$%&!?,<>|-{}\[\]:;+\\ \.\/\'\`\"0-9]/g;
       let x = input.search(regex);
       console.log(x)
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
      console.log(input);
      let regex = /[~^*()#@$%&!?,<>|-{}\[\]:;+\\ \.\/\'\`\"0-9]/g;
      let x = input.search(regex);
      console.log(x);
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
      }
    },

  ]).then(function(responce){console.log(responce);})
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