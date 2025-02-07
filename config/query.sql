-- Active: 1737614382066@@127.0.0.1@3306@world
CREATE DATABASE world;

use world;

CREATE Table users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(55)
);

SELECT * FROM users;

CREATE Table category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(30),
    name_ru VARCHAR(30),
    image VARCHAR(100)
);

CREATE Table category_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    Foreign Key (category_id) REFERENCES category(id),
    product_id INT,
    Foreign Key (product_id) REFERENCES product(id)
);


CREATE Table brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(30),
    name_ru VARCHAR(30),
    image VARCHAR(30)
);


CREATE Table country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(30),
    name_ru VARCHAR(30)
);



CREATE Table `order` (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INTEGER,
  total_price INTEGER
)

CREATE TABLE orderItem (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INTEGER,
  Foreign Key (product_id) REFERENCES product(id),
  order_id INTEGER,
  Foreign Key (order_id) REFERENCES order (id),
  count INTEGER,
  total INTEGER
)


CREATE Table product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_uz VARCHAR(255) NOT NULL,
  name_ru VARCHAR(255) NOT NULL,
  brand_id INTEGER,
  countr_id INTEGER,
  price INTEGER,
  old_price INTEGER,
  available VARCHAR(255) NOT NULL,
  description_uz VARCHAR(255) NOT NULL,
  description_ru VARCHAR(255) NOT NULL,
  washable VARCHAR(255) NOT NULL,
  size INTEGER
)