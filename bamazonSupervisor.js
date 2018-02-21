var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "jaynezoe",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("\nConnected as id: " + connection.threadId);
  console.log("\n_____________________________________\n")
  supervise();
 });

function supervise() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Select an ACTION: ",
      choices: ["View Product Sales by Department", "Create New Department", "Exit"]
    })
    .then(function(answer) {
    	console.log(answer);
      if (answer.action === "View Product Sales by Department") {
      	console.log("View Product Sales by Department***");
        // viewProductSales();
        listDepts();
      }
      else if (answer.action === "Create New Department") {
      	console.log("Create New Department***");
        // createDepartment();
        listDepts();
      }
      else {
      	process.exit();
      };
    });
}



function listDepts() {
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log("\n\n\tBAMAZON Departments");
    console.log("\t----------------------");
    for (var i = 0; i < res.length; i++) {
          console.log("\tID: " + res[i].department_id + "\tDept: " + res[i].department_name + "\tOverhead: $" + res[i].over_head_costs);
    };
    console.log("\t----------------------\n\n");
    // purchaseItem();
  });
}