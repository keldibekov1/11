CREATE DATABASE worl;
USE worl;

-- Foydalanuvchilar jadvali
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(55)
);

-- Brendlar jadvali
CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(30),
    name_ru VARCHAR(30),
    image VARCHAR(30)
);

-- Davlatlar jadvali
CREATE TABLE country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(30),
    name_ru VARCHAR(30)
);

-- Mahsulotlar jadvali
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(255) NOT NULL,
    name_ru VARCHAR(255) NOT NULL,
    brand_id INT,
    countr_id INT,
    price INT,
    old_price INT,
    available VARCHAR(255) NOT NULL,
    description_uz VARCHAR(255) NOT NULL,
    description_ru VARCHAR(255) NOT NULL,
    washable VARCHAR(255) NOT NULL,
    size INT,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL,
    FOREIGN KEY (countr_id) REFERENCES country(id) ON DELETE SET NULL
);

-- Kategoriyalar jadvali
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_uz VARCHAR(30),
    name_ru VARCHAR(30),
    image VARCHAR(100)
);

-- Kategoriya va mahsulot bog‘lovchi jadval
CREATE TABLE category_item (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

-- Buyurtmalar jadvali
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Buyurtma mahsulotlari jadvali
CREATE TABLE orderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    totalSum INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES product(id) ON DELETE CASCADE
);

-- Mahsulotlarni kiritish
INSERT INTO product (name_uz, name_ru, brand_id, countr_id, price, old_price, available, description_uz, description_ru, washable, size)
VALUES 
('Mahsulot 2', 'Продукт 2', NULL, NULL, 250000, NULL, 'Mavjud', 'Tavsif 2', 'Описание 2', 'Yuvish mumkin', 42),
('Mahsulot 3', 'Продукт 3', NULL, NULL, 250000, NULL, 'Mavjud', 'Tavsif 3', 'Описание 3', 'Yuvish mumkin', 44);

-- Foydalanuvchilarni tanlash
SELECT * FROM product;
