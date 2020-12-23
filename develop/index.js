const inquirer = require("inquirer");

//Dependencies
inquirer = require("inquirer");
mysql = require("mysql");
myTable = require("console.table");
asciiArt = require("ascii-art");
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
        database:'employee_cms',
    }
);
connection.connect(function(err){
    if (err) throw err;
    //add ascii image here!!!!!!
    mainMenu();
})
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

function mainMenu(){
inquirer.prompt([
    {
        type:"rawlist",
        name:"main",
        message:"Where would you like to start?",
        choices:[
            {name:"view departments(name-manager-employee-budget", value:"departments"},
            {name:"view employee roles in the company", value:"roles"},
            {name:"view employees in the company(by manager availible here)", value:"employees"},
            {name:"Exit the Program.", view:"exit"}
        ]
    }
])
.then(function(userChoice){
    switch(userChoice.main){
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
})
};

function ExitFunction(){
    
    connection.end();
    console.log("mysql connection ended");
    process.exit(0);
};

function departmentView(){
    let query = "SELECT * FROM department";
    connection.query(query,function(err,res){
        if(err) throw err;
        for (var i = 0;i<res.length;i++){
            
        }
    })
};

function example(){
     inquirer.prompt([

                {
                    type:"rawlist",
                    name:"mainmenu",
                    merssage:"What would you like to do?",
                    choices:[
                        {name:"VIEW :departments,roles,employees or budget"},
                        {name:"UPDATE: departments, roles or employees"},
                        {name:"Exit the program."}
                    ]
                }
    ])
    .then(function(userChoice){
        switch(userChoice.mainmenu){
            case "VIEW :departments,roles,employees or budget":

                break;
            case "UPDATE: departments, roles or employees":

                break;
            case "Exit the program.":

                break;
        }
    })
};