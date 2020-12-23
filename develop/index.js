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
  //add ascii image here!!!!!!
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
            name: "view departments(name-manager-employee-budget",
            value: "departments",
          },
          { name: "view employee roles in the company", value: "roles" },
          {
            name: "view employees in the company(by manager availible here)",
            value: "employees",
          },
          { name: "Exit the Program.", view: "exit" },
        ],
      },
    ])
    .then(function (userChoice) {
      switch (userChoice.main) {
        case "departments":
          departmentView();
          break;
        case "roles":
          roleView();
          break;
        case "employees":
          employeeView();
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

 function departmentView() {
    connection.query("SELECT * FROM department", function (err, res) {
      if (err) throw err;
      console.table(res);
    });
   inquirer
    .prompt([
      {
        type: "list",
        name: "departments",
        message: "Select The department you would like to view.",
        choices: async function (answers) {
          let things = await connection.query("SELECT name FROM department");
          
            let data = [];

          for (let i = 0; i < things.length; i++) {
              let x = {};
              x.name = things[i].name;
              x.value = things[i].name;
              data.push(x);
          }

          return data;
          
        }
      },
      {
          type:"list",
          name:"Engineering",
          message:"",


      }
    ]);
}

function roleView() {
  let query = "SELECT * FROM job";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res);
  });
}

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
