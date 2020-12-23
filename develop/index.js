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
        type: "rawlist",
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

async function departmentView() {
  let mySqlQuery = "SELECT * FROM department";
  //   connection.query(mySqlQuery, function (err, res) {
  //     if (err) throw err;
  //     // let data = res;

  //     // for (var i = 0;i<res.length;i++){

  //     // }
  //     console.log(res);
  //     console.table(res);
  //     connection.query("SELECT name FROM department", function (err, res) {
  //       if (err) throw err;
  //       console.log(res);
  //       console.log(res[0]);
  //     });
  //   });
  await inquirer
    .prompt([
      {
        type: "rawlist",
        name: "department",
        message: "Pick a department, bub",
        choices: async function (answers) {
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          let things = await connection.query("SELECT name FROM department");
          console.log("BBBBB", things);

           let data = [];
          for (let i = 0; i < things.length; i++) {
              let o = {};
              o.name = things[i].name;
              o.value = things[i].name;
              data.push(o);
          }

          return data;
        },
      },
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
