// //Dependencies
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
});
// render ascii logo


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

  // async function test(){
  //   let things = await connection.query("SELECT * FROM employee");
  //   let data = [];

  //       for (let i = 0; i < things.length; i++) {
  //           let x = {};
  //           x.name = things[i].first_name +things[i].last_name;
  //           x.value = things[i].first_name + things[i].last_name;
  //           data.push(x);
  //       }

  //       console.log(data);
  //       console.log(things);

  //       return data;
        
  // };


  // let regex = [/~#@$%&!?,<>|-:;+.'`"/g];

  // console.log(regex);




// function viewThisfromThat(SelItem,SelTbl){inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "main",
//         message: "Select The department you would like to view.",
//         choices: async function () {
//           let things = await connection.query("SELECT ? FROM ?",[SelItem,SelTbl]);
          
//             let data = [];

//           for (let i = 0; i < things.length; i++) {
//               let x = {};
//               x.name = things[i].name;
//               x.value = things[i].name;
//               data.push(x);
//           }

//           return data;
          
//         },
      
//       },
//     ])};





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


// functions to Query DB for department total




// const viewSomeTable = (selTbl) => {
//     connection.query("SELECT * FROM ?",[selTbl], function (err, res) {
//       if (err) throw err;
//       console.table(res);
//     });
   
// };


let findRole = 9;
let employeeFirst = 'john';
let employeeLast = 'doe';
let findDepartment;
let managerID;
let managerA;
let managerFirst;
let managerLast;
let blank = async () =>{
    await connection.query("SELECT * FROM job WHERE id = ?",[findRole],function(err,res){
      if(err) throw err;
      mmm = res;
      console.log("mmm");
      findDepartment = mmm.department_id;
    }.then(await connection.query("SELECT * FROM department WHERE id = ?",[findDepartment],function(err,res){
        if(err) throw res;
        nnn = res;
        managerA = nnn.manager;
        managerB = managerA.split("_");
        managerFirst = managerB[0];
        managerLast = manager[1];
        console.log("nnn");

      }.then(await connection.query("SELECT * FROM employee WHERE first_name = ? AND last_name = ?",[managerFirst,managerLast],function(err,res){
      if(err) throw res;
      bbb = res;
      managerID = bbb.id;
      console.log("bbb");
    })))));
      
    
blank();


  console.log(managerID);
  console.log(managerFirst);
  console.log(managerLast);
  console.log(managerA);
  

  connection.query("INSERT INTO employee(first_name,last_name,role_id,manager_id)VALUES(?,?,?,?)",[employeeFirst,employeeLast,findRole,managerID],function(err,res){
    if(err) throw err
    console.table(res)
   });
  };




