/*
Pre-requisite 
Install mysql work bench
Create new Connection
*/


create database Team_Project;

use Team_Project;
    
CREATE TABLE users (
    user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT user,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

//to insert the values into the user table

INSERT INTO users (username, email, password, role) VALUES 
('Ashmin Abisha', 'ashminabishaj@gmail.com', 'Ashmin@123', 'user'),
('Admin user', 'admin@example.com', 'adminpass', 'admin');



l
CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL,                  
    product_id INT NOT NULL,               
    quantity INT NOT NULL,                 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    FOREIGN KEY (user_id) REFERENCES users(user_id), 
    FOREIGN KEY (product_id) REFERENCES products(product_id) 
);

-- Shipping Address Table
CREATE TABLE shipping_address (
    shipping_address_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    total_amount DECIMAL(10, 2),
    shipping_address TEXT,
    tracking_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Tracking Table
CREATE TABLE order_tracking (
    tracking_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    status VARCHAR(50),
    estimated_delivery_date TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exhibits Table (Wishlist)
CREATE TABLE whishlist (
    wishlist_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    product_id INT REFERENCES products(product_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    payment_method VARCHAR(50),
    amount DECIMAL(10, 2),
    payment_date TIMESTAMP,
    transaction_id VARCHAR(100),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    artist_id INT REFERENCES artists(artist_id),
    album_id INT REFERENCES albums(album_id),
    genre_id INT REFERENCES genres(genre_id),
    release_date DATE,
    price DECIMAL(10, 2),
    cover_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Artists Table
=======
//create genres table

CREATE TABLE genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(255) UNIQUE NOT NULL
);

//create artists table


CREATE TABLE artists (
    artist_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Albums Table
CREATE TABLE albums (
    album_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INT REFERENCES artists(artist_id),
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    stock_quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Genres Table
CREATE TABLE genres (
    genre_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Insert Artists
INSERT INTO artists (name, created_at, updated_at)
VALUES 
('Nirvana', NOW(), NOW()),
('Oasis', NOW(), NOW()),
('Radiohead', NOW(), NOW()),
('Green Day', NOW(), NOW()),
('Original Soundtrack', NOW(), NOW()),
('Motion Picture Cast Recording', NOW(), NOW()),
('Ariana Grande', NOW(), NOW()),
('Fleetwood Mac', NOW(), NOW()),
('Michael Jackson', NOW(), NOW()),
('Sabrina Carpenter', NOW(), NOW()),
('Charlie XCX', NOW(), NOW()),
('Pink Floyd', NOW(), NOW()),
('Led Zeppelin', NOW(), NOW()),
('The Beatles', NOW(), NOW()),
('Eagles', NOW(), NOW()),
('50 Cent', NOW(), NOW()),
('Kendrick Lamar', NOW(), NOW()),
('Jay-Z', NOW(), NOW()),
('Eminem', NOW(), NOW()),
('The Notorious B.I.G.', NOW(), NOW());

-- Insert Genres
INSERT INTO genres (name)
VALUES 
('Alternative Rock'),
('Soundtrack'),
('Pop'),
('Rock'),
('Hip-hop');

-- Insert Albums
INSERT INTO albums (album_id, title, artist_id, release_date, created_at, updated_at)
VALUES 
(1, 'Nevermind', (SELECT artist_id FROM artists WHERE name = 'Nirvana'), '1991-09-24', NOW(), NOW()),
(2, 'The Masterplan', (SELECT artist_id FROM artists WHERE name = 'Oasis'), '1998-11-17', NOW(), NOW()),
(3, 'OK Computer', (SELECT artist_id FROM artists WHERE name = 'Radiohead'), '1997-05-21', NOW(), NOW()),
(4, 'Saviors', (SELECT artist_id FROM artists WHERE name = 'Green Day'), '2024-02-09', NOW(), NOW()),
(5, 'American Idiot', (SELECT artist_id FROM artists WHERE name = 'Green Day'), '2004-09-21', NOW(), NOW()),
(6, 'Barbie the Album', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack'), '2023-07-21', NOW(), NOW()),
(7, 'Guardians of the Galaxy - Awesome Mix 1', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack'), '2014-07-29', NOW(), NOW()),
(8, 'Pulp Fiction', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack'), '1994-09-27', NOW(), NOW()),
(9, 'The Greatest Showman', (SELECT artist_id FROM artists WHERE name = 'Motion Picture Cast Recording'), '2017-12-08', NOW(), NOW()),
(10, 'Baby Driver', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack'), '2017-07-23', NOW(), NOW()),
(11, 'Sweetener', (SELECT artist_id FROM artists WHERE name = 'Ariana Grande'), '2018-08-17', NOW(), NOW()),
(12, 'Rumors', (SELECT artist_id FROM artists WHERE name = 'Fleetwood Mac'), '1977-02-04', NOW(), NOW()),
(13, 'Thriller', (SELECT artist_id FROM artists WHERE name = 'Michael Jackson'), '1982-11-30', NOW(), NOW()),
(14, 'Short n’ Sweet', (SELECT artist_id FROM artists WHERE name = 'Sabrina Carpenter'), '2023-09-22', NOW(), NOW()),
(15, 'Brat', (SELECT artist_id FROM artists WHERE name = 'Charlie XCX'), '2023-10-26', NOW(), NOW()),
(16, 'The Dark Side of the Moon', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd'), '1973-03-01', NOW(), NOW()),
(17, 'Led Zeppelin IV', (SELECT artist_id FROM artists WHERE name = 'Led Zeppelin'), '1971-11-08', NOW(), NOW()),
(18, 'Abbey Road', (SELECT artist_id FROM artists WHERE name = 'The Beatles'), '1969-09-26', NOW(), NOW()),
(19, 'Hotel California', (SELECT artist_id FROM artists WHERE name = 'Eagles'), '1976-12-08', NOW(), NOW()),
(20, 'The Wall', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd'), '1979-11-30', NOW(), NOW()),
(21, 'Get Rich or Die Tryin’', (SELECT artist_id FROM artists WHERE name = '50 Cent'), '2003-02-06', NOW(), NOW()),
(22, 'To Pimp a Butterfly', (SELECT artist_id FROM artists WHERE name = 'Kendrick Lamar'), '2015-03-15', NOW(), NOW()),
(23, 'The Blueprint', (SELECT artist_id FROM artists WHERE name = 'Jay-Z'), '2001-09-11', NOW(), NOW()),
(24, 'The Marshall Mathers LP', (SELECT artist_id FROM artists WHERE name = 'Eminem'), '2000-05-23', NOW(), NOW()),
(25, 'Ready to Die', (SELECT artist_id FROM artists WHERE name = 'The Notorious B.I.G.'), '1994-09-13', NOW(), NOW());

-- Insert Products with Decimal Prices (Upper Limit)
INSERT INTO products (product_id, name, artist_id, album_id, genre_id, release_date, price, cover_image_url, created_at, updated_at)
VALUES 
(1, 'Nevermind', (SELECT artist_id FROM artists WHERE name = 'Nirvana'), 1, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock'), '1991-09-24', 20.00, 'Backend\data\images\Nirvana – Nevermind (1).webp', NOW(), NOW()),
(2, 'The Masterplan', (SELECT artist_id FROM artists WHERE name = 'Oasis'), 2, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock'), '1998-11-17', 12.99, 'Backend\data\images\Oasis – The Masterplan (1).webp', NOW(), NOW()),
(3, 'OK Computer', (SELECT artist_id FROM artists WHERE name = 'Radiohead'), 3, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock'), '1997-05-21', 20.00, 'Backend\data\images\Radiohead – OK Computer.webp', NOW(), NOW()),
(4, 'Saviors', (SELECT artist_id FROM artists WHERE name = 'Green Day'), 4, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock'), '2024-02-09', 10.00, 'Backend\data\images\Green-Day-Saviors.webp', NOW(), NOW()),
(5, 'American Idiot', (SELECT artist_id FROM artists WHERE name = 'Green Day'), 5, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock'), '2004-09-21', 20.00, 'Backend\data\images\Green Day – American Idiot (1).webp', NOW(), NOW()),
(6, 'Barbie the Album', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack'), 6, (SELECT genre_id FROM genres WHERE name = 'Soundtrack'), '2023-07-21', 30.00, 'Backend\data\images\Original Soundtrack – Barbie the Album.webp', NOW(), NOW()),
(7, 'Guardians of the Galaxy - Awesome Mix 1', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack'), 7, (SELECT genre_id FROM genres WHERE name = 'Soundtrack'), '2014-07-29', 40.00, 'Backend\data\images\Original Soundtrack – Guardians of the Galaxy - Awesome Mix 1.webp', NOW(), NOW()),
(8, 'Pulp Fiction', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack'), 8, (SELECT genre_id FROM genres WHERE name = 'Soundtrack'), '1994-09-27', 40.00, 'Backend\data\images\Original Soundtrack – Pulp Fiction.webp', NOW(), NOW()),
(9, 'The Greatest Showman', (SELECT artist_id FROM artists WHERE name = 'Motion Picture Cast Recording'), 9, (SELECT genre_id FROM genres WHERE name = 'Soundtrack'), '2017-12-08', 25.00, 'Backend\data\images\Motion Picture Cast Recording – The Greatest Showman.webp', NOW(), NOW()),
(10, 'Baby Driver', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack'), 10, (SELECT genre_id FROM genres WHERE name = 'Soundtrack'), '2017-07-23', 35.00, 'Backend\data\images\Original Soundtrack – Baby Driver.webp', NOW(), NOW()),
(11, 'Sweetener', (SELECT artist_id FROM artists WHERE name = 'Ariana Grande'), 11, (SELECT genre_id FROM genres WHERE name = 'Pop'), '2018-08-17', 30.00, 'Backend\data\images\Ariana Grande – Sweetener.webp', NOW(), NOW()),
(12, 'Rumors', (SELECT artist_id FROM artists WHERE name = 'Fleetwood Mac'), 12, (SELECT genre_id FROM genres WHERE name = 'Pop'), '1977-02-04', 50.00, 'Backend\data\images\Fleetwood Mac – Rumors.webp', NOW(), NOW()),
(13, 'Thriller', (SELECT artist_id FROM artists WHERE name = 'Michael Jackson'), 13, (SELECT genre_id FROM genres WHERE name = 'Pop'), '1982-11-30', 50.00, 'Backend\data\images\Michael Jackson – Thriller.webp', NOW(), NOW()),
(14, 'Short n’ Sweet', (SELECT artist_id FROM artists WHERE name = 'Sabrina Carpenter'), 14, (SELECT genre_id FROM genres WHERE name = 'Pop'), '2023-09-22', 10.00, 'Backend\data\images\Sabrina Carpenter – Short n’ Sweet.webp', NOW(), NOW()),
(15, 'Brat', (SELECT artist_id FROM artists WHERE name = 'Charlie XCX'), 15, (SELECT genre_id FROM genres WHERE name = 'Pop'), '2023-10-26', 10.00, 'Backend\data\images\Charlie XCX – Brat.webp', NOW(), NOW()),
(16, 'The Dark Side of the Moon', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd'), 16, (SELECT genre_id FROM genres WHERE name = 'Rock'), '1973-03-01', 50.00, 'Backend\data\images\Pink Floyd – The Dark Side of the Moon.webp', NOW(), NOW()),
(17, 'Led Zeppelin IV', (SELECT artist_id FROM artists WHERE name = 'Led Zeppelin'), 17, (SELECT genre_id FROM genres WHERE name = 'Rock'), '1971-11-08', 50.00, 'Backend\data\images\Led Zepplin – Led zeppelin IV.webp', NOW(), NOW()),
(18, 'Abbey Road', (SELECT artist_id FROM artists WHERE name = 'The Beatles'), 18, (SELECT genre_id FROM genres WHERE name = 'Rock'), '1969-09-26', 50.00, 'Backend\data\images\The Beatle – Abby Road.webp', NOW(), NOW()),
(19, 'Hotel California', (SELECT artist_id FROM artists WHERE name = 'Eagles'), 19, (SELECT genre_id FROM genres WHERE name = 'Rock'), '1976-12-08', 30.00, 'Backend\data\images\Eagles – Hotel California.webp', NOW(), NOW()),
(20, 'The Wall', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd'), 20, (SELECT genre_id FROM genres WHERE name = 'Rock'), '1979-11-30', 50.00, 'Backend\data\images\Pink Floyd – The Wall.webp', NOW(), NOW()),
(21, 'Get Rich or Die Tryin’', (SELECT artist_id FROM artists WHERE name = '50 Cent'), 21, (SELECT genre_id FROM genres WHERE name = 'Hip-hop'), '2003-02-06', 30.00, 'Backend\data\images\50 Cent – Get Rich or Die Tryin’.webp', NOW(), NOW()),
(22, 'To Pimp a Butterfly', (SELECT artist_id FROM artists WHERE name = 'Kendrick Lamar'), 22, (SELECT genre_id FROM genres WHERE name = 'Hip-hop'), '2015-03-15', 40.00, 'Backend\data\images\Kendrick Lamar – To Pimp a Butterfly.jpg', NOW(), NOW()),
(23, 'The Blueprint', (SELECT artist_id FROM artists WHERE name = 'Jay-Z'), 23, (SELECT genre_id FROM genres WHERE name = 'Hip-hop'), '2001-09-11', 40.00, 'Backend\data\images\Jay-Z – The Blueprint.webp', NOW(), NOW()),
(24, 'The Marshall Mathers LP', (SELECT artist_id FROM artists WHERE name = 'Eminem'), 24, (SELECT genre_id FROM genres WHERE name = 'Hip-hop'), '2000-05-23', 40.00, 'Backend\data\images\Eminem – The Marshall Mathers LP.jpg', NOW(), NOW()),
(25, 'Ready to Die', (SELECT artist_id FROM artists WHERE name = 'The Notorious B.I.G.'), 25, (SELECT genre_id FROM genres WHERE name = 'Hip-hop'), '1994-09-13', 50.00, 'Backend\data\images\51pil+A8wQL._UF894,1000_QL80_.jpg', NOW(), NOW());

-- Insert Inventory
INSERT INTO inventory (product_id, stock_quantity, created_at, updated_at)
SELECT product_id, 100, NOW(), NOW()
FROM products;