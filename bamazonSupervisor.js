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
    	// console.log(answer);
      if (answer.action === "View Product Sales by Department") {
        viewProductSales();
      }
      else if (answer.action === "Create New Department") {
        createDepartment();
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
          console.log("\tID: " + res[i].department_id + "\tDept: " + res[i].department_name + "\tOverhead: $" + res[i].over_head_costs.toFixed(2));
    };
    console.log("\t----------------------\n\n");
    supervise();
  });
}

function viewProductSales(){
	  connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(bamproducts.product_sales) AS sales FROM departments LEFT JOIN bamproducts ON departments.department_name = bamproducts.department_name GROUP BY departments.department_id", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log("\n\n\tBAMAZON Product Sales");
    console.log("\t----------------------");
    for (var i = 0; i < res.length; i++) {
    	if (res[i].sales === null) {
    		res[i].sales =0;
    	}
      console.log("\tID: " + res[i].department_id + "\tDept: " + res[i].department_name + "\tOverhead: $" + res[i].over_head_costs.toFixed(2) + "\tSales: $" + res[i].sales.toFixed(2)+ "\tProfit: $" + (res[i].sales-res[i].over_head_costs).toFixed(2));
    };
    console.log("\t----------------------\n\n");
    supervise();
  });
}




//choices in bamazonManager need to be dynamic, not done yet
function createDepartment(){
	  console.log("ADD DEPARTMENT\n");
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "\nDepartment Name:  ",
      },
      {
        name: "overhead",
        type: "input",
        message: "\nOverhead Cost: ",
        validate: function(value) {
          	if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
    ])
	.then(function(answer) {
		// console.log (answer);
		connection.query(
			"INSERT INTO departments SET ?",
			{
				department_name: answer.department,
				over_head_costs: answer.overhead
			},
			function(err, res) {
				if (err) throw err;
				console.log("\nDepartment added.\n");
				listDepts();
			}
		);
	});
}