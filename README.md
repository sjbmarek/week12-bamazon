# week12-bamazon

# Node.js & MySQL

## Overview

In this activity, I created an Amazon-like storefront with MySQL. The app will take in orders from customers and deplete stock from the store's inventory. Three views are available: Customer, Manager, Supervisor.

Npm packages: MySQL, Inquirer, cli-table

### bamazonCustomer.js  #1: Customer View 

VIDEO CUSTOMER
https://drive.google.com/file/d/1dehIUVDaNJq8iF3IHKWg-QOFUnkvJdA8/view

1. The MySQL Database called `bamazon` has a table called `bamproducts` which contains the product, price, dept and stock information.

2. The customer sees a list of items, chooses one to purchase and indicates the order quantity.

3. Stock value is updated or sale is rejected for insufficient stock.

4. The sale summary is provided.

- - -

### bamazonManager.js #2: Manager View

VIDEO MANAGER
https://drive.google.com/file/d/1tbSjd9nVbfk5ze5FfiBv09NakDoIxwnm/view

* The Node application called `bamazonManager.js` has these functions:

    * View Products for Sale
    
    * View Low Inventory (manager determines low value)
    
    * Add to Inventory
    
    * Add New Product

- - -

### bamazonSupervisor #3: Supervisor View 

VIDEO SUPERVISOR
https://drive.google.com/file/d/1B8tWuFW3OLrqF577pbPv-1uogmP7wzKL/view

1. Created another MySQL table called `departments` which includes dept id, dept, and overhead cost.


2. Running this application lists a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

3. `View Product Sales by Department`, the app displays a summarized table which includes:

department id
department name
overhead cost
product sales
total profit which is a calculated number

This view is the result of a MySQL query using JOIN, GROUP BY and SUM.
