var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeeDB",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add a role",
        "Add a employee",
        "View a department",
        "View a role",
        "View a employee",
        "Update an employee's role",
        "*Update an employee's manager",
        "*View employees by a manager's id",
        "*Delete a department",
        "*Delete a role",
        "*Delete a employee",
        "*See the total utilized budget of a department",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add a department":
          addDept();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add a employee":
          addEmp();
          break;

        case "View a department":
          viewDept();
          break;

        case "View a role":
          viewRole();
          break;

        case "View a employee":
          viewEmp();
          break;

        case "Update an employee's role":
          updateRole();
          break;

        case "*Update an employee's manager":
          viewRole();
          break;

        case "*View employees by a manager's id":
          viewEmp();
          break;

        case "*Delete a department":
          songAndAlbumSearch();
          break;

        case "*Delete a role":
          viewRole();
          break;

        case "*Delete a employee":
          viewEmp();
          break;

        case "*See the total utilized budget of a department":
          songAndAlbumSearch();
          break;
      }
    });
}

function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "dept_name",
        message: "What is the name of this department?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.dept_name,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          runSearch();
        }
      );
    });
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) {
      throw err;
    } else {
      var deptChoices = results.map(({ dept_id, dept_name }) => ({
        name: dept_name,
        value: dept_id,
      }));
    }

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title for the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for the new role?",
        },
        {
          type: "list",
          name: "dept_id",
          message: "What is the department id associated with this role?",
          choices: deptChoices,
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            dept_id: answer.dept_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Your employee role was created successfully!");
            runSearch();
          }
        );
      });
  });
}

function addEmp() {
  connection.query("SELECT role_id, title FROM role", function (err, results) {
    if (err) {
      throw err;
    } else {
      var roleChoices = results.map(({ role_id, title }) => ({
        name: title,
        value: role_id,
      }));
    }
    // var empChoices =

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the first name of the new employee?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the last name of the new employee?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the role ID for the new employee?",
          choices: roleChoices,
        },
        {
          type: "input",
          name: "manager_id",
          message: "What is the manager ID for the new employee?",
          // choices: empChoices
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Your employee was created successfully!");
            runSearch();
          }
        );
      });
  });
}
//-------------------------------------------------------------
function viewDept() {
  inquirer
    .prompt({
      type: "input",
      name: "dept_id",
      message: "What is the department ID to view?",
    })
    .then(function (answer) {
      var depts = connection.query(
        "SELECT * FROM department",
        {
          dept_id: answer.dept_id,
          dept_name: answer.dept_name,
        },
        function (err) {
          if (err) throw err;
          console.log("Your department was viewed successfully!");
          runSearch();
        }
      );
    });
}

function viewRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title for the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for the new role?",
      },
      {
        type: "input",
        name: "dept_id",
        message: "What is the department id associated with this role?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          dept_id: answer.dept_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your employee role was created successfully!");
          runSearch();
        }
      );
    });
}

function viewEmp() {
  inquirer
    .prompt(
      {
        type: "input",
        name: "emp_id",
        message: "What is the ID for the new employee?",
      },
      {
        type: "input",
        name: "first_name",
        message: "What is the first name of the new employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the last name of the new employee?",
      },
      {
        type: "input",
        name: "role_id",
        message: "What is the role ID for the new employee?",
      },
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager ID for the new employee?",
      }
    )
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees SET ?",
        {
          emp_id: answer.emp_id,
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          runSearch();
        }
      );
    });
}

function updateRole() {
  connection.query(
    "SELECT emp_id, first_name, last_name FROM employee",
    function (err, results) {
      if (err) {
        throw err;
      } else {
        var empChoices = results.map(({ emp_id, first_name, last_name }) => ({
          name: `${last_name}, ${first_name}`,
          value: emp_id,
        }));
      }

      connection.query("SELECT role_id, title FROM role", function (
        err,
        results
      ) {
        if (err) {
          throw err;
        } else {
          var roleChoices = results.map(({ role_id, title }) => ({
            name: title,
            value: role_id,
          }));
        }

        inquirer
          .prompt([
            {
              type: "list",
              name: "empLast",
              message: "What employee woulc you like to update?",
              choices: empChoices,
            },
            {
              type: "list",
              name: "role_id",
              message: "What role would you like to give them",
              choices: roleChoices,
            },
          ])
          .then(function (answer) {
            console.log(answer.empLast + "  " + answer.role_id);
            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [
                {
                  role_id: answer.role_id,
                },
                {
                  emp_id: answer.empLast,
                },
              ],
              function (err) {
                if (err) throw err;
                console.log("Your employee was created successfully!");
                runSearch();
              }
            );
          });
      });
    }
  );
}
