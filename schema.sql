DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(11),
  PRIMARY KEY (item_id)
);



DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE departments (
  department_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100),
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);
