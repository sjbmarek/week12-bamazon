DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,4) NULL,
  stock_quantity INTEGER(11),
  PRIMARY KEY (item_id)
);





-- CREATE TABLE books(
--   id INTEGER(11) AUTO_INCREMENT NOT NULL,
--   authorId INTEGER(11),
--   title VARCHAR(100),
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE authors(
--   id INTEGER(11) AUTO_INCREMENT NOT NULL,
--   firstName VARCHAR(100),
--   lastName VARCHAR(100),
--   PRIMARY KEY (id)
-- );

