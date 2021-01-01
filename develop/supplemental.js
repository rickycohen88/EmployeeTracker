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
connection.connect(function (err) {
  if (err) throw err;
 
// render ascii logo
console.log(asciiArt(conFig).render());

// let testvar;
// let count = 0;
// function runlast(x){
  
//   if(count == 0){
//    switch(x){
//      case 'test1':
//        count++;
//        test1();
//         break;
//       case 'test2':
//         count++;
//         test2();
//           break;
//    }
//   }
//    console.log("x was called");
// };



// function test1(){
//   console.log("first function called");
//   testvar = test1.name;
//   test2();

// };
// function test2(){
//   console.log("inside test2 function");
//   console.log(testvar);
//   testvar = test2.name;
//   runlast(testvar);

// };

// // test1();

//   async function test(){
//     let things = await connection.query("SELECT * FROM employee");
//     let data = [];

//         for (let i = 0; i < things.length; i++) {
//             let x = {};
//             x.name = things[i].first_name +things[i].last_name;
//             x.value = things[i].first_name + things[i].last_name;
//             data.push(x);
//         }

//         console.log(data);
//         console.log(things);

//         return data;
        
//   }

mainMenu();
});
// functions to Query DB for department total
function budget(x) {
 connection.query(budgetQuery,[x]);
}

let budgetQuery = "SELECT sum( employee_cms.job.salary) FROM employee_cms.job WHERE department_id =?;";

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

const viewSomeTable = (selTbl) => {
    connection.query("SELECT * FROM ?",[selTbl], function (err, res) {
      if (err) throw err;
      console.table(res);
    });
   
};

exports.viewSomeTable = viewSomeTable;