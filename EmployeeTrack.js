var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeeDB"
});

connection.connect(function(err) {
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
        "*See the total utilized budget of a department"
      ]
    })
    .then(function(answer) {
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
        viewDept();
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
    .prompt({
      type: "input",
      name: "dept_id",      
      message: "What is the ID for the new department?"
    },
    {
      type: "input",
      name: "dept_name",
      message: "What is the name of this department?"
    })
    .then(function(answer) {
      
      connection.query(
        "INSERT INTO depts SET ?",
        {
          dept_id: answer.dept_id,
          dept_name: answer.dept_name
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          runSearch();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt({
      type: "input",
      name: "role_id",      
      message: "What is the ID for the new role?"
    },
    {
      type: "input",
      name: "title",      
      message: "What is the title for the new role?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for the new role?"
    },
    {
      type: "input",
      name: "dept_id",
      message: "What is the department id associated with this role?"
    })
    .then(function(answer) {
      
      connection.query(
        "INSERT INTO emp_roles SET ?",
        {
          role_id: answer.role_id,
          title: answer.title,
          salary: answer.salary,          
          dept_id: answer.dept_id
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee role was created successfully!");
          runSearch();
        }
      );
    });
}

function addEmp() {
  inquirer
    .prompt({
      type: "input",
      name: "emp_id",      
      message: "What is the ID for the new employee?"
    },
    {
      type: "input",
      name: "first_name",      
      message: "What is the first name of the new employee?"
    },
    {
      type: "input",
      name: "last_name",      
      message: "What is the last name of the new employee?"
    },
    {
      type: "input",
      name: "role_id",      
      message: "What is the role ID for the new employee?"
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the manager ID for the new employee?"
    })
    .then(function(answer) {
      
      connection.query(
        "INSERT INTO employees SET ?",
        {
          emp_id: answer.emp_id,
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          runSearch();
        }
      );
    });
}
//-------------------------------------------------------------
function viewDept() {
  inquirer
    .prompt({
      type: "input",
      name: "dept_id",      
      message: "What is the ID for the new department?"
    },
    {
      type: "input",
      name: "dept_name",
      message: "What is the name of this department?"
    })
    .then(function(answer) {
      
      connection.query(
        "INSERT INTO depts SET ?",
        {
          dept_id: answer.dept_id,
          dept_name: answer.dept_name
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
          runSearch();
        }
      );
    });
}

function viewRole() {
  inquirer
    .prompt({
      type: "input",
      name: "role_id",      
      message: "What is the ID for the new role?"
    },
    {
      type: "input",
      name: "title",      
      message: "What is the title for the new role?"
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for the new role?"
    },
    {
      type: "input",
      name: "dept_id",
      message: "What is the department id associated with this role?"
    })
    .then(function(answer) {
      
      connection.query(
        "INSERT INTO emp_roles SET ?",
        {
          role_id: answer.role_id,
          title: answer.title,
          salary: answer.salary,          
          dept_id: answer.dept_id
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee role was created successfully!");
          runSearch();
        }
      );
    });
}

function viewEmp() {
  inquirer
    .prompt({
      type: "input",
      name: "emp_id",      
      message: "What is the ID for the new employee?"
    },
    {
      type: "input",
      name: "first_name",      
      message: "What is the first name of the new employee?"
    },
    {
      type: "input",
      name: "last_name",      
      message: "What is the last name of the new employee?"
    },
    {
      type: "input",
      name: "role_id",      
      message: "What is the role ID for the new employee?"
    },
    {
      type: "input",
      name: "manager_id",
      message: "What is the manager ID for the new employee?"
    })
    .then(function(answer) {
      
      connection.query(
        "INSERT INTO employees SET ?",
        {
          emp_id: answer.emp_id,
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id
        },
        function(err) {
          if (err) throw err;
          console.log("Your employee was created successfully!");
          // re-prompt the user for if they want to bid or post
          runSearch();
        }
      );
    });
}

///-----------------------------------------------------
function multiSearch() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending position: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Artist: " +
              res[i].artist +
              " || Year: " +
              res[i].year
          );
        }
        runSearch();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      name: "song",
      type: "input",
      message: "What song would you like to look for?"
    })
    .then(function(answer) {
      console.log(answer.song);
      connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
        console.log(
          "Position: " +
            res[0].position +
            " || Song: " +
            res[0].song +
            " || Artist: " +
            res[0].artist +
            " || Year: " +
            res[0].year
        );
        runSearch();
      });
    });
}

function songAndAlbumSearch() {
  inquirer
    .prompt({
      name: "artist",
      type: "input",
      message: "What artist would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
      query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
      query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

      connection.query(query, [answer.artist, answer.artist], function(err, res) {
        console.log(res.length + " matches found!");
        for (var i = 0; i < res.length; i++) {
          console.log(
            i+1 + ".) " +
              "Year: " +
              res[i].year +
              " Album Position: " +
              res[i].position +
              " || Artist: " +
              res[i].artist +
              " || Song: " +
              res[i].song +
              " || Album: " +
              res[i].album
          );
        }

        runSearch();
      });
    });
}
