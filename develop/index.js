const inquirer = require("inquirer");

//Dependencies
inquirer = require("inquirer");
mysql = require("mysql");
myTable = require("console.table");
// fs = require("fs");
// path = require("path");
// express = require("express");

//MySQL Database Connection
const connection = mysql.createConnection(
    {
        host:'localhost',
        port: 3306,
        user:'root',
        password:'2951367',
        database:'EmployeeTracker_db',
    }
);
// functions to Query DB
function queryDBxyz(){
    //Connects to database using our variable and the .connect method
    connection.connect(function(err){
        if(err) throw err;
        console.log("connected as id "+ connection.threadId);
        // functions to do stuff

        connection.end();
        //ends database connection for query
    });
};

//inquirer format- and stuffs
// blank.prompt()
// .then()
// .catch();

const viewPersonnel = ()=>{

};

const mainMenu = ()=>{
    return inquirer.prompt([

                {
                    type:"",
                    name:"",
                    merssage:"",
                    choices:"",
                    when: function (){

                    }
                }
    ]);
};