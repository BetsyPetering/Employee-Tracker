var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
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
        "View all departments",
        "View all roles",
        "View all employees",
        "Update an employee's role",
        "View employees by a manager's id"
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

        case "View all departments":
          viewDept();
          break;

        case "View all roles":
          viewRole();
          break;

        case "View all employees":
          viewEmp();
          break;

        case "Update an employee's role":
          updateRole();
          break;

        case "View employees by a manager's id":
          viewEmpByMgr();
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
      {
        type: "input",
        name: "salary",
        message: "What is the salary for the Manager of this department?",
      },
      {
        type: "input",
        name: "first_name",
        message: "What is the Manager's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the Manager's last name?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          dept_name: answer.dept_name,
        },
        function (err, result) {
          if (err) throw err;
          const ttl = answer.dept_name;
          mgrTitle = ttl + " Manager";
          connection.query(
            "INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)",
            [mgrTitle, answer.salary, result.insertId],
            function (err, result2) {
              if (err) throw err;
              const manager_id = 0;
              const role_id = result2.insertId;
              connection.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [answer.first_name, answer.last_name, role_id, manager_id],
                function (err) {
                  if (err) throw err;
                  console.log(
                    "The department, this department's manager role, and the manager's employee record were created successfully!"
                  );
                  runSearch();
                }
              );
            }
          );
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
            console.log("The role was created successfully!");
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

function viewDept() {
  connection.query("SELECT dept_id, dept_name FROM department", function (
    err,
    result,
    fields
  ) {
    if (err) throw err;
    console.table(result);
    runSearch();
  });
}

function viewRole() {
  connection.query(
    "SELECT role_id, title, salary, dept_id FROM role",
    function (err, result, fields) {
      if (err) throw err;
      console.table(result);
      runSearch();
    }
  );
}

function viewEmp() {
  connection.query("SELECT * FROM employee", function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    runSearch();
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
                console.log("This employee's role was successfully updated!");
                runSearch();
              }
            );
          });
      });
    }
  );
}

function viewEmpByMgr() {
  inquirer
    .prompt({
      type: "input",
      name: "manager",
      message: "What is the Manager ID for the employees to list?",
    })
    .then(function (answer) {
      var query =
        "SELECT emp_id, first_name, last_name, role_id, manager_id FROM employee WHERE ?";
      connection.query(query, { manager_id: answer.manager }, function (
        err,
        res
      ) {
        console.table(res);
        runSearch();
      });
    });
}
