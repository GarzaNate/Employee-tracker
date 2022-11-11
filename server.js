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
        console.table(response)
        switch (response.action) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "End Session":
                db.end();
                break;
            default:
                break;
        };
    });
};

// View Departments
const viewDepartments = () => {
    console.log("Department View");

    var sql = 'SELECT department.id AS id, department.name AS department FROM department';
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        initialQuestion();
    });
};

// View Roles
const viewRoles = () => {
    console.log("Role View");

    var sql = 'SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id';
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        initialQuestion();
    });
};

// View Employees
const viewEmployees = () => {
    console.log("Employee View");

    var sql = 'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY role.salary DESC';
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        initialQuestion();
    });
}

// Add Department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Enter the name of the new department',
        }
    ]).then(answer => {
        var sql = 'INSERT INTO department (name) VALUES (?)';

        db.query(sql, answer.newDepartment, (err, res) => {
            if (err) throw err;
            console.log(answer.newDepartment + ' was added as a new department');
            console.table('All Departments');

            viewDepartments();
            initialQuestion();
        });
    });
};

// Add Role

const addRole = () => {
   
    const role = 'SELECT id, name FROM department';

    db.query(role, (err, res) => {
        if (err) throw err;

        const department = res.map(({ id, name }) => ({ value: id, name: name }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter new role'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the salary for this role'
            },
            {
                type: 'list',
                name: 'dept',
                message: 'Select the department for this role',
                choices: department
            }
        ]).then(answer => {
            const input = [answer.newRole, answer.salary, answer.dept]

            const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);'

            db.query(sql, input, (err, res) => {
                if (err) throw err;
                console.log('Added ' + answer.role + ' to roles');
                viewRoles();
            });
        });
    });
};

// Add Employee

const addEmployee= () => {

    db.query('SELECT * from role', (err, res) => {
        const roles = res.map(({ id, title }) => ({ value: id, name: title }))

        inquirer.prompt([
            {
                type: 'input',
                name: 'newEmployee',
                message: 'Please enter name of employee'
            },
            {
                type: 'list',
                name: 'role',
                message: ''
            }
        ])
    });
};


// Update Employee Role