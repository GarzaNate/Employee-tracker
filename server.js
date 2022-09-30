// package requirments
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table')
// connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

// if db doesn't connect, throw error
db.connect(err => {
    if (err) throw err;
    initialQuestion();
});

const initialQuestion = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Welcome to the employee tracker! What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "End Session"]
        }
        // switch cases for each option
    ]).then((response) => {
        switch (response.action) {
            case "View all departments":
                viewDepartments();
                break;
            case "View all roles":
                viewRoles();
                break;
            case "View all employees":
                viewEmployees();
                break;
            case "Add a department":
                addNewDepartment();
                break;
            case "Add a role":
                addNewRole();
                break;
            case "Add an employee":
                addNewEmployee();
                break;
            case "Update role for an employee":
                updateRole();
                break;
            case "End Session":
                connection.end();
                break;
            default:
                break;
        }
    })
}

// View Departments
const viewDepartments = () => {
    console.log("Department View");

}

// View Roles
const viewRoles = () => {
    console.log("Role View");

}

// View Employees
const viewEmployees = () => {
    console.log("Employee View");

}

// Add Department


// Add Role


// Add Employee

// Update Employee Role