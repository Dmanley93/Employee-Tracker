const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Zjp09qfm12!',
  database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    runEmployees();
    // afterConnection();
  });

  // const afterConnection = () => {
  //   connection.query('SELECT * FROM employee', (err, res) => {
  //     if (err) throw err;
  //     console.log(res);
  
  //     for (let i = 0; i < res.length; i++) {
  //     console.log('ID:', res[i].id);
  //     console.log('First Name:', res[i].first_name);
  //     console.log('Last Name:', res[i].last_name);
  //     console.log('Role:', res[i].role_id);
  //     console.log('Manager:', res[i].manager_id);
  //     }
  //     connection.end();
  //   });
  // };

const runEmployees = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add Employee',
        'View all employees by department',
        'View all employees by Role',
        'View Employee',
        'Update Employee',
      ],
    })
    .then ((answers) => {
      switch (answers.action) {
        case 'Add Employee':
          addEmployee();
          break;

        case 'View all employees by department':
          viewEmployeeDept();
          break;

        case 'View all employees by Role':
          viewEmployeeRole();
          break;

        case 'View Employee':
          viewEmployee();
          break;

        case 'Update Employee':
          updateEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const addEmployee = () => {
  inquirer
    .prompt([{
      name: 'first_name',
      type: 'input',
      message: 'What is the employees first name?'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'What is the employees last name?'
    },
    {
      name: 'role',
      type: 'list',
      message: 'What is the employees role?',
      choices: [{name: "Sales", value: "1"}, {name: "Management", value: "2"}, {name: "Marketing", value:"3"}, {name: "Analytics", value: "4"} ]
    }])
    .then((answer) => {
      const query = 'INSERT INTO employee SET ?';
      connection.query(query, { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role }, (err) => {
      if (err) throw err;
        runEmployees();
      });
    });
};

viewEmployee = () => {
  inquirer
  .prompt({
    name: 'action',
    type: 'rawlist',
    message: 'Which Employee would you like to view?',
    choices: []
  })
  .then((answers) => {
      
    })
}

// viewEmployeeDept = () => {
//   inquirer
//   .prompt({
//     name: 'action',
//     type: 'rawlist',
//     message: 'What would you like to do?',
//   })
//   .then((answers) => {
      
//   })
// }

// viewEmployeeRole = () => {
//   inquirer
//   .prompt({
//     name: 'action',
//     type: 'rawlist',
//     message: 'What would you like to do?',
//   })
//   .then((answers) => {
      
//   })
// }

// updateEmployee = () => {
//   inquirer
//   .prompt({
//     name: 'action',
//     type: 'rawlist',
//     message: 'What would you like to do?',
//   })
//   .then((answers) => {
      
//   })
// }