# week12-bamazon

# Node.js & MySQL

## Overview

In this activity, I created an Amazon-like storefront with the MySQL. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store.

MySQL and Inquirer npm packages are used.

## Submission Guide

Make sure you use the normal GitHub. Because this is a CLI App, there will be no need to deploy it to Heroku. This time, though, you need to include screenshots, a gif, and/or a video showing us that you got the app working with no bugs. You can include these screenshots or a link to a video in a `README.md` file.

* Include screenshots (or a video) of typical user flows through your application (for the customer and if relevant the manager/supervisor). This includes views of the prompts and the responses after their selection (for the different selection options).


### bamazonCustomer.js  #1: Customer View 

VIDEO CUSTOMER

1. The MySQL Database called `bamazon` has a table called `bamproducts` which contains the product, price, dept and stock information.

2. The customer sees a list of items, chooses one to purchase and indicates the order quantity.

3. Stock value is updated or sale is rejected for insufficient stock.

4. The sale summary is provided.

- - -

### bamazonManager.js #2: Manager View

VIDEO MANAGER

* The Node application called `bamazonManager.js` has these functions:

    * View Products for Sale
    
    * View Low Inventory (manager determines low value)
    
    * Add to Inventory
    
    * Add New Product

- - -

### bamazonSupervisor #3: Supervisor View 

VIDEO SUPERVISOR

1. Created another MySQL table called `departments` which includes dept id, dept, and overhead cost.


2. Running this application lists a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

5. Selecting `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

6. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

