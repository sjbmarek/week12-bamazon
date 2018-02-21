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
  ask();
 });

function listItems() {
  connection.query("SELECT * FROM bamproducts", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log("\n\n\tBAMAZON Items for Sale");
    console.log("\t----------------------");
    for (var i = 0; i < res.length; i++) {
          console.log("\tID: " + res[i].item_id + "\tProduct: " + res[i].product_name + "\tPrice: $" + res[i].price);
    };
    console.log("\t----------------------\n\n");
    purchaseItem();
  });
}

function ask() {
  inquirer
    .prompt([
       {
        name: "shop",
        type: "confirm",
        message: "\nWould you like to shop at BAMAZON?",
       }
    ])
    .then(function(answer) {
    	if(!answer.shop) {
    		console.log("\nGood bye.\n");
    		process.exit();
    	} 
    	else{
    	listItems();
    	}
	});
}

function purchaseItem() {
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "\nWhat is the item ID you would like to purchase?",
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
        message: "\nWhat quantity would you like?",
        validate: function(value) {
          	if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
	.then(function(answer) {
		// console.log(answer);
		console.log ("\nYou selected Item: " + answer.item + " Quantity: "  + answer.quantity);
		connection.query(
			"SELECT * FROM bamproducts WHERE ?",
			{
				item_id: answer.item
			},
			function(err, res) {
				if (err) throw err;
			if (answer.quantity <= res[0].stock_quantity) {
		        updateProduct(res,answer);
		    }
		    else {
		    	console.log("\n________________________________________________");
		        console.log("\nINSUFFICIENT QUANTITY - NO PURCHASE!");
		        console.log("\n________________________________________________");
		        ask();
		    };	
			}
		);
	});
};

function updateProduct(res, answer) {
  // console.log(res);
  connection.query(
    "UPDATE bamproducts SET ? WHERE ?",
    [
      {
        stock_quantity: res[0].stock_quantity - answer.quantity,
        product_sales: (res[0].product_sales + (res[0].price*answer.quantity)).toFixed(2)
      },
      {
        item_id: answer.item
      }
    ],
    function(error) {

      if (error) throw error;
      console.log("\n________________________________________________");
      console.log("PURCHASE SUMMARY\n");
      console.log(res[0].product_name + "\tQty: " + answer.quantity + "\tUnit Price: $" + res[0].price);
      console.log("\nTotal Price: $" + (res[0].price*answer.quantity).toFixed(2));
      console.log("\nThank you.  Successful purchase.");
      console.log("________________________________________________\n");
      ask();
    }
  );
}

