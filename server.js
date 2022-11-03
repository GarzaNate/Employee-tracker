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
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update role for an employee":
                updateRole();
                break;
            case "End Session":
                connection.end();
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

    var sql = 'SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department_id';
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        initialQuestion();
    });
};

// View Employees
const viewEmployees = () => {
    console.log("Employee View");

    var sql = 'SELECT e.first_name, e.last_name, r.title, r.salary, d.name, CONCAT(manager.first_name, " ", manager.last_name) AS manager_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r department_id = d.id LEFT JOIN employee manager ON manager.id = e.manager_id ORDER BY salary DESC';
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

        connection.query(sql, answer.addDepartment, (err, res) => {
            if (err) throw err;
            console.log(answer.addDepartment + ' was added as a new department');
            console.table('All Departments');

            viewDepartments();
            initialQuestion();
        });
    });
};

// Add Role

const addRole = () => {
   
    const role = 'SELECT id, name FROM department';

    connection.query(role, (err, res) => {
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
            const input = [answer.role, answer.salary, answer.dept]

            const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);'

            connection.query(sql, input, (err, res) => {
                if (err) throw err;
                console.log('Added ' + answer.role + ' to roles');
                viewRoles();
            });
        });
    });
};

// Add Employee

const addEmployee= () => {

    connection.query('SELECT * from role', (err, res) => {
        const roles = res.map(({ id, title }) => ({ value: id, name: title }))

        
}


// Update Employee Role