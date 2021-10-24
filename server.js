const { response } = require('express');
const express = require('express');
const inquirer = require("inquirer");
// Import and require mysql2
const mysql = require('mysql2');
require("console.table");
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
)

db.connect(function (err) {
    if (err) throw err;
    console.log("SQL Connected");
    initialQuestions();
});

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
                    // db.end(); //check for later
                    break;
            }
        })
}

//View All Departments
const viewAllDepartments = () => {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        initialQuestions();
    })
}

//View All Roles
const viewAllRoles = () => {
    db.query("SELECT role.id,role.title,role.salary,department.name FROM role JOIN department ON role.department_id = department.id;", (err, results) => {
        if (err) {
            console.log(err)
        }
        console.table(results);
        initialQuestions();
    })
}

//View All Employees
const viewAllEmployees = () => {
    db.query(`
    SELECT employee.id,employee.first_name,employee.last_name,
    role.title,department.name,employee.manager_id,concat(manager.first_name," ",manager.last_name) manager
 FROM employee 
LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id=department.id
LEFT JOIN employee manager ON manager.id=employee.manager_id`, (err, results) => {
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
    db.query("Select * from department", (err, departmentData) => {

        const departments = departmentData.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        })
        inquirer.prompt([
            {

                type: "input",
                name: "addrole",
                message: "Enter The Role"
            },
            {
                type: "input",
                name: "addsalary",
                message: "Enter The Salary",
            },
            {
                type: "list",
                name: "departmentOptions",
                message: "Enter The Department",
                choices: departments
            }
        ])
            .then((response) => {
                db.query("INSERT INTO role (title,salary,department_id) VALUES(?,?,?);",
                    [response.addrole, response.addsalary, response.departmentOptions], (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(result);
                        console.log("Added New Role Successfully");
                        initialQuestions();
                    })
            })
    })

}

//Add Employee
const addEmployee = async () => {
    db.query("Select * from role", (err, roleData) => {

        const roles = roleData.map(role => {
            return {
                name: role.title,
                value: role.id
            }
        })

        db.query("Select * from employee", (err, employeeData) => {
            const employees = employeeData.map(employee => {
                return {
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }
            })
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
                    choices: roles
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who Is The Employee Manager",
                    choices: employees
                }
            ])
                .then((response) => {
                    db.query("INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?);",
                        [response.firstname, response.lastname, response.roleoptions, response.manager], (err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            console.log(result);
                            console.log("Added New Department Successfully");
                            initialQuestions();
                        })
                })
        })
    })

}

//Update Employee Role
const updateEmployeeRole = async () => {
    db.query("Select * from employee", (err, employeeUpdate) => {

        const employeeupdates = employeeUpdate.map(employee => {
            return {
                name: employee.first_name + " " + employee.last_name,
                value: employee.id
            }
        })
        db.query("Select * from role", (err, employeeRoleUpdate) => {
            const roleUpdates = employeeRoleUpdate.map(role => {
                return {
                    name: role.title,
                    value: role.id
                }
            })
            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeid",
                    message: "Which Employee Role Do You Want To Update",
                    choices: employeeupdates
    
                },
                {
                    type: "list",
                    name: "roleid",
                    message: "Which Role Do You Want To assign The Selected Employee",
                    choices: roleUpdates
    
                }
            ])
                .then((response) => {
                    db.query("UPDATE employee SET role_id = ? WHERE id = ?", 
                    [response.roleid, response.employeeid], (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(result);
                        console.log("Updated Employee Role Successfully");
                        initialQuestions();
                    })
                })
        })


        
    })


    }




