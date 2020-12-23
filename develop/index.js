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
// functions to Query DB
function queryDBxyz() {
  //Connects to database using our variable and the .connect method
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // functions to do stuff

    connection.end();
    //ends database connection for query
  });
}
function selectThisfromThat(SelItem,SelTbl){inquirer
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
             name: "view departments(name-manager-employee-budget)",
            value: "view",
          },
          {  name: "change departments, roles, or employees", 
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
      choice:
    }
  ])
  
};

function employeeView() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });
}

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
