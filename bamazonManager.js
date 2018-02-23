var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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
	manage();
});

function manage() {
	inquirer
	.prompt({
		name: "action",
		type: "rawlist",
		message: "Select an ACTION: ",
		choices: ["View Products", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"]
	})
	.then(function(answer) {
    	// console.log(answer);
    	if (answer.action === "View Products") {
    		viewProducts();
    	}
    	else if (answer.action === "View Low Inventory") {
    		viewLowInventory();
    	}
    	else if (answer.action === "Add To Inventory") {
    		addInventory();
    	}
    	else if (answer.action === "Add New Product"){
    		addProduct();
    	}
    	else {
    		process.exit();
    	};
    });
}


function viewProducts() {
	connection.query("SELECT * FROM bamproducts", function(err, res) {
		if (err) throw err;
    // console.log(res);
    var table = new Table({
    	head: ['ID', 'Product', 'Dept','Price', 'Qty'], colWidths: [5, 20, 15, 10,10]
    });
    console.log("\n\n\tAll BAMAZON Items for Sale");
    console.log("\t----------------------");
    for (var i = 0; i < res.length; i++) {
          // console.log("\tID: " + res[i].item_id + "\tProduct: " + res[i].product_name + "\tDept: " + res[i].department_name + "\tPrice: $" + res[i].price + "\tQty: " + res[i].stock_quantity);
          table.push(
          	[res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity] 
          	);
      };
      console.log(table.toString());
      console.log("\t----------------------\n\n");
      manage();
  });

}


function viewLowInventory() {
	inquirer
	.prompt([
	{
		name: "quantity",
		type: "input",
		message: "\nInventory Level: ",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}
	])

	.then(function(answer) {
		connection.query(
			"SELECT * FROM bamproducts WHERE stock_quantity <" + answer.quantity, 
			function(err, res) {
				if (err) throw err;
	    // console.log(res);
	    var table = new Table({
	    	head: ['ID', 'Product', 'Dept','Price', 'Qty'], colWidths: [5, 20, 15, 10,10]
	    });
	    console.log("\n\n\tBAMAZON Low Inventory Report (items below " + answer.quantity + " units)");
	    console.log("\t----------------------");
	    for (var i = 0; i < res.length; i++) {
	          // console.log("\tID: " + res[i].item_id + "\tProduct: " + res[i].product_name + "\tDept: " + res[i].department_name + "\tPrice: $" + res[i].price + "\tQty: " + res[i].stock_quantity);
	          table.push(
	          	[res[i].item_id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity] 
	          	);
	      };
	      console.log(table.toString());
	      console.log("\t----------------------\n\n");
	      manage();
	  });
	});
}


function addInventory() {
	console.log("ADJUST INVENTORY\n");
	inquirer
	.prompt([
	{
		name: "item",
		type: "input",
		message: "\nItem ID:  ",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	},
	{
		name: "quantity",
		type: "input",
		message: "\nQuantity: ",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}
	])
	.then(function(answer) {
		console.log ("\nUpdated Item: " + answer.item + " To Quantity: "  + answer.quantity +"\n");
		connection.query(
			"UPDATE bamproducts SET ? WHERE ?",
			[
			{
				stock_quantity: answer.quantity
			},
			{
				item_id: answer.item
			}
			],
			function(err, res) {
				if (err) throw err;
				// console.log(res);
				manage();
			}
			);
	});
}

function addProduct(){
	console.log("ADD PRODUCT\n");
	connection.query("SELECT * FROM departments", function(err, results) {
		if (err) throw err;
		inquirer
		.prompt([
		{
			name: "product",
			type: "input",
			message: "\nProduct Name:  ",
		},
		{
			name: "department",
			type: "rawlist",
			message: "\nSelect a Department: ",
      	// choices: ["bakery", "home", "petcare", "produce", "other"]
      	choices: function() {
      		var choiceArray = [];
      		for (var i = 0; i < results.length; i++) {
      			choiceArray.push(results[i].department_name);
      		}
      		return choiceArray;
      	},
      },
      {
      	name: "price",
      	type: "input",
      	message: "\nPrice: ",
      	validate: function(value) {
      		if (isNaN(value) === false) {
      			return true;
      		}
      		return false;
      	}
      },
      {
      	name: "quantity",
      	type: "input",
      	message: "\nQuantity: ",
      	validate: function(value) {
      		if (isNaN(value) === false) {
      			return true;
      		}
      		return false;
      	}
      }
      ])
		.then(function(answer) {
		// console.log (answer);
		connection.query(
			"INSERT INTO bamproducts SET ?",
			{
				product_name: answer.product,
				department_name: answer.department,
				price: answer.price,
				stock_quantity: answer.quantity
			},
			function(err, res) {
				if (err) throw err;
				console.log("\nProduct added.\n");
				manage();
			}
			);
	});

	});
}







