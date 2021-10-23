const { response } = require('express');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'root',
        database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);

//User input Questions
const initialQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update An Employee Role',
                'Quit'
            ]
        },
    ])

        .then((response) => {
            switch (response.options) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update An Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    db.end(); //check for later
                    break;
            }
        })
}

//View All Departments
const viewAllDepartments = async (db) => {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        initialQuestions();
    })
}

//View All Roles
const viewAllRoles = async (db) => {
    db.query("SELECT * FROM role", (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        initialQuestions();
    })
}

//View All Employees
const viewAllEmployees = async (db) => {
    db.query("SELECT * FROM employee", (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        initialQuestions();
    })
}

//Add Department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartment",
            message: "Enter The Name Of The Department"
        }
    ])
        .then((response) => {
            db.query("INSERT INTO department (name) VALUES(?);", response.newDepartment, (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                console.log("Added New Department Successfully");
                initialQuestions();
            })
        })
}

//Add Role
const addRole = async () => {
    inquirer.prompt([
        {

            type: "input",
            name: "addrole",
            message: "Enter The Role"
        },
        {
            type: "list",
            name: "addsalary",
            message: "Enter The Salary",
        },
        {
            type: "list",
            name: "departmentOptions",
            message: "Enter The Department",
            choices: [
                "Sales",
                "Finance",
                "Engineering",
                "Legal"
            ]
        }
    ])
        .then((response) => {
            db.query("INSERT INTO department (title,salary,department_id) VALUES(?);", [response.addrole, response.addsalary, response.departmentOptions], (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                console.log("Added New Role Successfully");
                initialQuestions();
            })
        })
}

//Add Employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstname",
            message: "Enter The First Name Of The Employee"
        },
        {
            type: "input",
            name: "lastname",
            message: "Enter The Last Name Of The Employee"
        },
        {
            type: "list",
            name: "roleoptions",
            message: "Enter The Role Of The Employee",
            choices: [
                "Sales Lead",
                "SalesPerson",
                "Lead Engineer",
                "Software Engineer",
                "Account Manager",
                "Accountant",
                "Legal Team Lead",
                "Lawyer"
            ]
        },
        {
            type: "input",
            name: "manager",
            message: "Who Is The Employee Manager"
        }
    ])
        .then((response) => {
            db.query("INSERT INTO department (first_name,last_name,role_id,manager_id) VALUES(?);", [response.firstname, response.lastname, response.roleoptions, response.manager], (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                console.log("Added New Department Successfully");
                initialQuestions();
            })
        })
}

//Update Employee Role
const updateEmployeeRole = async () => {
    inquirer.prompt([
        {
            type: "list",
            name: "employeerole",
            message: "Which Employee Role Do You Want To Update",
            choices: [
                "Mike Chan",
                "Ashley Rodriguez",
                "Kevin Tupik",
                "Kunal Singh",
                "Malia Brown",
                "Sarah Lourd",
                "Tom Allen",
                "Sowmya Nagayya"
            ]
        }
    ])
        .then((response) => {
            db.query("UPDATE employee SET role_id = ? WHERE id = ?", response.employeerole, (err, result) => {
                if (err) {
                    console.log(err)
                }
                console.log(result);
                console.log("Updated Employee Role Successfully");
                initialQuestions();
            })
        })
}





