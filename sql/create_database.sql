CREATE TABLE category(
   id INT AUTO_INCREMENT,
   title VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE gender(
   id INT AUTO_INCREMENT,
   title VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE app_user(
   id INT AUTO_INCREMENT,
   email VARCHAR(50),
   password VARCHAR(50),
   token VACHAR(255),
   role VARCHAR(50) NOT NULL,
   deleted BOOLEAN NULL DEFAULT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE product(
   id INT AUTO_INCREMENT,
   title VARCHAR(255),
   description TEXT,
   image VARCHAR(255),
   price FLOAT,
   gender_id INT,
   category_id INT,
   PRIMARY KEY(id),
   FOREIGN KEY(gender_id) REFERENCES gender(id),
   FOREIGN KEY(category_id) REFERENCES category(id)
);

CREATE TABLE customer(
   id INT AUTO_INCREMENT,
   fullname VARCHAR(255),
   email VARCHAR(255) NOT NULL,
   app_user_id INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(app_user_id),
   UNIQUE(email),
   FOREIGN KEY(app_user_id) REFERENCES app_user(id)
);

CREATE TABLE command(
   id INT AUTO_INCREMENT,
   numero VARCHAR(255),
   validation_date DATETIME,
   customer_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(customer_id) REFERENCES customer(id)
);

CREATE TABLE command_product(
   product_id INT,
   command_id INT,
   quantity INT,
   PRIMARY KEY(product_id, command_id),
   FOREIGN KEY(product_id) REFERENCES product(id),
   FOREIGN KEY(command_id) REFERENCES command(id)
);