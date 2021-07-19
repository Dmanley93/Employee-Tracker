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
  });

const runEmployees = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add Employee',
        'Add Department',
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

        case 'Add department':
          addEmployeeDept();
          break;

        case 'View all employees by department':
          viewEmployeeDept();
          break;

        case 'View all employees by Role':
          viewEmployeeRole();
          break;

        case 'View Employees':
          viewEmployees();
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

const addEmployeeDept = () => {
  inquirer
  .prompt({
    name: 'department',
    type: 'input',
    message: 'Please add a department: ',
  })
  .then((answers) => {
    connection.query("INSERT INTO department (name) VALUES (?)", [answers.newDepartment], (err, res) => {
      if (err) {
        console.log(err);
      }
      runEmployees();
    })
})
}

const viewEmployees = () => {
  connection.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw (err);
    console.table(res);
    runEmployees();
  })
}

const viewEmployeeDept = () => {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
    runEmployees();
  })
}

const viewEmployeeRole = () => {
  connection.query("SELECT * FROM title;", function (err, res) {
    if (err) throw err;
    console.table(res);
    startProgram();
  })
}

const updateEmployee = () => {
  connection.query("SELECT first_name, last_name FROM employee", (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices() {
            const choiceArray = [];
            results.forEach(({ first_name, last_name }, i) => {
              choiceArray.push({ name: `${first_name} ${last_name}`, value: i + 1 });
            });
            return choiceArray;
          },
          message: "Please select an employee to update.",
        },
        {
          name: "action",
          type: "list",
          message: "Select one employee.",
          choices: ["Update Employee"],
        },
      ])
      .then((answers) => {
        console.log(answers);
        switch (answers.action) {
          case "Update Employee":
            updateRole(answers.choice);
            break;
          default:
            console.log(`Invalid action: ${answers.action}`);
            break;
        }
      });
  });
};

function updateRole(employeeId) {
  inquirer
    .prompt({
      name: "newEmployeeRole",
      type: "list",
      message: "Title: ",
      choices: ["1-CEO", "2-Manager", "3-Software Developer", "4-Designer", "5-Janitor"],
    })
    .then((answers) => {
      connection.query("UPDATE employee SET title_id=? WHERE id=?", [answers.newEmployeeRole.split("-")[0], employeeId], (err, res) => {
        if (err) {
          console.log(err);
        }
        runEmployees();
      });
    });
}