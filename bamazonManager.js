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
  manage();
 });

function manage() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "Select an ACTION: ",
      choices: ["View Products", "View Low Inventory", "Add To Inventory", "Add New Product"]
    })
    .then(function(answer) {
    	console.log(answer);
      if (answer.action === "View Products") {
        viewProducts();
      }
      else if (answer.action === "View Low Inventory") {
        viewLowInventory();
      }
      else if (answer.action === "Add to Inventory") {
        addInventory();
      }
      // else {
      // 	addProduct();
      // };

    });
}


function viewProducts() {
  connection.query("SELECT * FROM bamproducts", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log("\n\n\tAll BAMAZON Items for Sale");
    console.log("\t----------------------");
    for (var i = 0; i < res.length; i++) {
          console.log("\tID: " + res[i].item_id + "\tProduct: " + res[i].product_name + "\tDept: " + res[i].department_name + "\tPrice: $" + res[i].price + "\tQty: " + res[i].stock_quantity);
    };
    console.log("\t----------------------\n\n");
  });
}


function viewLowInventory() {
  connection.query("SELECT * FROM bamproducts", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log("\n\n\tBAMAZON Low Inventory Report");
    console.log("\t----------------------");
    for (var i = 0; i < res.length; i++) {
    	if (res[i].stock_quantity<50){
          console.log("\tID: " + res[i].item_id + "\tProduct: " + res[i].product_name + "\tDept: " + res[i].department_name + "\tPrice: $" + res[i].price + "\tQty: " + res[i].stock_quantity);
    	}
    };
    console.log("\t----------------------\n\n");
  });
}

// function addInventory() {
//   connection.query("SELECT * FROM bamproducts", function(err, res) {
//     if (err) throw err;
//     // console.log(res);
//     console.log("\n\n\tAll BAMAZON Items for Sale");
//     console.log("\t----------------------");
//     for (var i = 0; i < res.length; i++) {
//           console.log("\tID: " + res[i].item_id + "\tProduct: " + res[i].product_name + "\tDept: " + res[i].department_name + "\tPrice: $" + res[i].price + "\tQty: " + res[i].stock_quantity);
//     };
//     console.log("\t----------------------\n\n");
//   });
// }

function addInventory() {
	console.log("\nADJUST INVENTORY\n")
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "\nItem ID: ",
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
        message: "\nAdd Quantity: ",
        validate: function(value) {
          	if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
	.then(function(answer) {
		console.log ("\nYou selected Item: " + answer.item + " Quantity: "  + answer.quantity);
		connection.query(
			"SELECT * FROM bamproducts WHERE ?",
			{
				item_id: answer.item
			},
			function(err, res) {
				if (err) throw err;
				  connection.query(
				    "UPDATE bamproducts SET ? WHERE ?",
				    [
				      {
				        stock_quantity: res[0].stock_quantity - answer.quantity
				      },
				      {
				        item_id: answer.item
				      }
				    ],
				    function(error) {
				      if (error) throw err;
				      console.log("\n________________________________________________");
				      console.log("PURCHASE SUMMARY\n");
				      console.log(res[0].product_name + "\tQty: " + answer.quantity + "\tUnit Price: $" + res[0].price);
				      console.log("\nTotal Price: $" + (res[0].price*answer.quantity).toFixed(2));
				      console.log("\nThank you.  Successful purchase.");
				      console.log("________________________________________________\n");
				      purchaseItem();
				    }
				  );

		
			}
		);
	});
};