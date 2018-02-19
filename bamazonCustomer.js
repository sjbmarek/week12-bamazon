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
  purchaseItem();
 });

function listItems() {
  connection.query("SELECT * FROM bamproducts", function(err, res) {
    if (err) throw err;
    // console.log(res);
    console.log("\tBAMAZON Items for Sale");
    console.log("\t----------------------\n");
    for (var i = 0; i < res.length; i++) {
          console.log("\tID: " + res[i].item_id + "\tProduct: " + res[i].product_name + "\tPrice: $" + res[i].price);
    };
    // connection.end();
  });
}


function purchaseItem() {
  listItems();
  inquirer
    .prompt([
     //   {
    	// message: listItems(),
     //    name: "shop",
     //    type: "input",
     //    // message: "\nWhat is the item ID you would like to purchase?"
     //   },


      {
      	// message: listItems(),
        name: "item",
        type: "input",
        message: "\nWhat is the item ID you would like to purchase?"
        // validate: function(value) {
        //     if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
      },
      {
        name: "quantity",
        type: "input",
        message: "\nWhat quantity would you like?",
        // validate: function(value) {
        //   	if (isNaN(value) === false) {
        //     return true;
        //   }
        //   return false;
        // }
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
				// console.log(res);
				// console.log("STOCK QTY: " + res[0].stock_quantity);

			if (answer.quantity <= res[0].stock_quantity) {
				var newStockQuantity = res[0].stock_quantity - answer.quantity;
				// console.log("NEW STOCK NUMBER: " + newStockQuantity);
		          connection.query(
		            "UPDATE bamproducts SET ? WHERE ?",
		            [
		              {
		                stock_quantity: newStockQuantity
		              },
		              {
		                item_id: answer.item
		              }
		            ],
		            function(error) {
		              if (error) throw err;
		              console.log("\nPURCHASE SUMMARY");
		              console.log("________________________________________________");
		              console.log(res[0].product_name + "\tQty: " + answer.quantity + "\tUnit Price: $" + res[0].price);
		              console.log("\nTotal Price: $" + (res[0].price*answer.quantity));
		              console.log("\nThank you.  Successful purchase.\n");
		              purchaseItem();
		            }
		          );
		    }
		    else {
		        console.log("\nInsfficient quantity!\n");
		        purchaseItem();
		    };	
			}
		);

	});

};




// function updateProduct() {
//   console.log("Updating product quantities...\n");
//   var query = connection.query(
//     "UPDATE bamproducts SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// listItems();
// purchaseItem();
