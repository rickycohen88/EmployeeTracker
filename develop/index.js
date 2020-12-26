//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const myTable = require("console.table");
const asciiArt = require("ascii-art");
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
connection.connect(function (err) {
  if (err) throw err;
  // asciiArt.create("EMPLOYEE_CMS", "DOOM",function(rendered){

  // })
  mainMenu();
});
// functions to Query DB for department total
function budget(x) {
 connection.query(budgetQuery,[x]);
}

let budgetQuery = "UPDATE department SET department.operating_budget = ( SELECT sum( employee_cms.job.salary) FROM employee_cms.job WHERE department_id =?) WHERE id =?;";

function viewThisfromThat(SelItem,SelTbl){inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "Select The department you would like to view.",
        choices: async function () {
          let things = await connection.query("SELECT ? FROM ?",[SelItem,SelTbl]);
          
            let data = [];

          for (let i = 0; i < things.length; i++) {
              let x = {};
              x.name = things[i].name;
              x.value = things[i].name;
              data.push(x);
          }

          return data;
          
        },
      
      },
    ])};
// async function asyncQueryChoices(queryString){
//   let things = await util.promisify(connection.query(queryString));
//   console.log(things);
//   let data = [];

//   for (let i = 0; i < things.length; i++) {
//       let x = {};
//       x.name = things[i].name;
//       x.value = things[i].name;
//       console.log(x);
//       data.push(x);
//       console.log(data);
//   }
//   console.log(data);
//   return data;
  
// };

//inquirer format- and stuffs
// blank.prompt()
// .then()
// .catch();

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

function viewMain(){
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
      name:"departmentsChoice",
      message:"Please choose the department you would like to view.",
      choices:async function () {
        let things = await connection.query("SELECT * FROM department");
        
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
        return responce.viewMain.indexOf('departments')>-1;
      }
    },
    {
      type:"list",
      name:"jobTitles",
      message:"",
      Choices:async function () {
        let things = await connection.query("SELECT * FROM job");
        
          let data = [];

        // for (let i = 0; i < things.length; i++) {
        //     let x = {};
        //     x.name = things[i].name;
        //     x.value = things[i].name;
        //     data.push(x);
        // }

        console.log(things);

        return data;
        
      },
      when:function(responce){
        return responce.viewMain.indexOf('roles')>-1;
      }
    },
    {
      type:"list",
      name:"employeeChoices",
      message:"how would you like to view the company personell",
      Choices:[
        {name:"all",value:"all"},
        {name:"by manager",value:"manager"},
        {name:"by department",value:"department"}
      ],
      when:function(responce){
        return responce.viewMain.indexOf('employee')>-1;
      }
    },
    {
      type:"list",
      name:"employees",
      message:"please select an employee",
      Choices: async function () {
        let things = await connection.query("SELECT * FROM employee");
        
          let data = [];

        // for (let i = 0; i < things.length; i++) {
        //     let x = {};
        //     x.name = things[i].name;
        //     x.value = things[i].name;
        //     data.push(x);
        // }

        console.log(things);

        return data;
        
      },
      when:function(responce){
        return responce.employeeChoices.indexOf('all')>-1
      }
    },
    {
      type:"list",
      name:"byManager",
      message:"please select an employee",
      Choices: async function () {
        let things = await connection.query("SELECT * FROM employee ");
        
          let data = [];

        // for (let i = 0; i < things.length; i++) {
        //     let x = {};
        //     x.name = things[i].name;
        //     x.value = things[i].name;
        //     data.push(x);
        // }

        console.log(things);

        return data;
        
      },
      when:function(responce){
        return responce.employeeChoices.indexOf('manager')>-1
      }
    },
    {
      type:"list",
      name:"employees",
      message:"please select an employee",
      Choices: async function () {
        let things = await connection.query("SELECT * FROM employee");
        
          let data = [];

        // for (let i = 0; i < things.length; i++) {
        //     let x = {};
        //     x.name = things[i].name;
        //     x.value = things[i].name;
        //     data.push(x);
        // }

        console.log(things);

        return data;
        
      },
      when:function(responce){
        return responce.employeeChoices.indexOf('department')>-1
      }
    },
    {
      type:"",
      name:"",
      message:"",
      Choices:"",
      when:function(){}
    }
  ])
}

function ExitFunction() {
  connection.end();
  console.log("mysql connection ended");
  process.exit(0);
}

 function viewSomeTable(selTbl) {
    connection.query("SELECT * FROM ?",[selTbl], function (err, res) {
      if (err) throw err;
      console.table(res);
    });
   
    
};

function change() {
  inquirer.prompt([
    {
      type:"list",
      name:"main",
      message:"What would you like to change",
      choice:[
        {name:"Departments",value:"departments"},
        {name:"Titles/roles",value:"roles"},
        {name:"Employees",value:"employee"}
      ]
    },
    {
      type:"",
      name:"",
      message:"",
      choices:[

      ],
      when:function(){}
    }
  ])
  
};



function example() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "mainmenu",
        merssage: "What would you like to do?",
        choices: [
          { name: "VIEW :departments,roles,employees or budget" },
          { name: "UPDATE: departments, roles or employees" },
          { name: "Exit the program." },
        ],
      },
    ])
    .then(function (userChoice) {
      switch (userChoice.mainmenu) {
        case "VIEW :departments,roles,employees or budget":
          break;
        case "UPDATE: departments, roles or employees":
          break;
        case "Exit the program.":
          break;
      }
    });
}
