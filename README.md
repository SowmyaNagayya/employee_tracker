# Homework 12: employee_tracker

## License
  The Project is licensed under the MIT License
  MIT License
  Copyright (c) 2021 SowmyaNagayya

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.;
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

  ## objectives
  Employee Tracker is a content management system for keeping track of departments, positions (roles), and employees for any organization. The application is built with Node.js and MySQL and makes use of mysql2, Inquirer, and console.table npm packages.


  ## Table of Contents 
  - [Installation instructions](#installationinstructions)
  - [Usage](#usage)
  - [License](#license)
  - [question](#Questions)
  
  ## Installation instructions
  First, download or clone the repository to your local machine. Then from within the root directory, run:

  npm i
  to install all the necessary npm depenedencies.

  Next, you will need to connect the application to a MySQL database running locally on your machine. First, make sure you have a MySQL server installed and running on your machine. After confirming you have a server running, you will need to edit the file config/connection.js based on your local MySQL server's credentials:

  export const db = mysql.createConnection(
  
   {
     host: "localhost",
     user: "",                 // update with your user credentials
     password: ""              // update with your password credentials
     database: cms_db
   }
  
 );
  Once this is complete, you will need to navigate back to your root directory to instantiate the database using the provided schema.sql and seeds.sql files.

  From the root directory, run:

  mysql -u <username> -p 
  and enter your username and password credentials.

  Then from inside of your MySQL shell, run:

  source db/schema.sql  // required to set up the database
  source db/seeds.sql   // optional, for seeding dummy data
  quit
  The application should now be ready for use.


  ## Usage
  From the root directory, after confirming you've installed all prerequisites and set up the application, run:

  npm start
  Users will are shown a menu with 8 options:

  View all departments
  View all roles
  View all employees
  Add a department
  Add a role
  Add an employee
  Update an employee's role
  Quit
  From here, users can select which action they would like to take to either view tables of relevant data from their organization or alter the system's data by creating new departments, roles, and employees, or by updating existing employees.

  When the user is finished using the system, they may quit by selecting the "Quit" menu option.

  ## Link to Demo
  https://drive.google.com/file/d/1aM6uljIaRH7ePFHG7JsVbq8wN10_lu1N/view?usp=sharing


  ## Questions
  Please email any questions to kkd.sowmya@gmail.com or reference my [GitHub profile](https://github.com/SowmyaNagayya).