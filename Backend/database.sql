/*
Pre-requisite 
Install mysql work bench
Create new Connection
Add a new schema name - vinyl database
    
*/

-- Creating the database
CREATE DATABASE Team_Project;
USE Team_Project;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

//to insert the values into the user table

INSERT INTO users (username, email, password, role) VALUES 
('Ashmin Abisha', 'ashminabishaj@gmail.com', 'Ashmin@123', 'user'),
('Admin user', 'admin@example.com', 'adminpass', 'admin');

-- Artists Table
CREATE TABLE artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Albums Table
CREATE TABLE albums (
    album_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_id INT NOT NULL,
    release_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

-- Genres Table
CREATE TABLE genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Products Table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    artist_id INT NOT NULL,
    album_id INT NOT NULL,
    genre_id INT NOT NULL,
    release_date DATE,
    price DECIMAL(10, 2) NOT NULL,
    cover_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (album_id) REFERENCES albums(album_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);


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

-- Exhibits Table (Wishlist)
CREATE TABLE wishlist (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Order Items Table
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Inventory Table
CREATE TABLE inventory (
    inventory_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    stock_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Shipping Address Table
CREATE TABLE shipping_address (
    shipping_address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Orders Table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
    tracking_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Order Tracking Table
CREATE TABLE order_tracking (
    tracking_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    status VARCHAR(50) NOT NULL,
    estimated_delivery_date TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Payments Table
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transaction_id VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Insert Artists
INSERT INTO artists (name, bio, profile_image_url)
VALUES 
  ('Nirvana', 'An American rock band formed in 1987.', 'https://example.com/nirvana.jpg'),
  ('Oasis', 'An English rock band formed in Manchester in 1991.', 'https://example.com/oasis.jpg'),
  ('Radiohead', 'An English rock band formed in Abingdon in 1985.', 'https://example.com/radiohead.jpg'),
  ('Green Day', 'An American rock band formed in 1986.', 'https://example.com/greenday.jpg'),
  ('Original Soundtrack', 'Soundtracks for various movies.', 'https://example.com/soundtrack.jpg'),
  ('Ariana Grande', 'An American singer and actress.', 'https://example.com/ariana.jpg'),
  ('Fleetwood Mac', 'A British-American rock band formed in 1967.', 'https://example.com/fleetwood.jpg'),
  ('Michael Jackson', 'An American singer, songwriter, and dancer.', 'https://example.com/michael.jpg'),
  ('Sabrina Carpenter', 'An American singer and actress.', 'https://example.com/sabrina.jpg'),
  ('Charlie XCX', 'An English singer and songwriter.', 'https://example.com/charlie.jpg'),
  ('Pink Floyd', 'An English rock band formed in London in 1965.', 'https://example.com/pinkfloyd.jpg'),
  ('Led Zeppelin', 'An English rock band formed in London in 1968.', 'https://example.com/ledzeppelin.jpg'),
  ('The Beatles', 'An English rock band formed in Liverpool in 1960.', 'https://example.com/beatles.jpg'),
  ('Eagles', 'An American rock band formed in Los Angeles in 1971.', 'https://example.com/eagles.jpg'),
  ('50 Cent', 'An American rapper, actor, and businessman.', 'https://example.com/50cent.jpg'),
  ('Kendrick Lamar', 'An American rapper and songwriter.', 'https://example.com/kendrick.jpg'),
  ('Jay-Z', 'An American rapper, songwriter, and businessman.', 'https://example.com/jayz.jpg'),
  ('Eminem', 'An American rapper and songwriter.', 'https://example.com/eminem.jpg'),
  ('The Notorious B.I.G.', 'An American rapper and songwriter.', 'https://example.com/biggie.jpg'),
  ('The Masterplan', 'An English rock band formed in 1998, known for their hits and influence on British rock.', 'https://example.com/themasterplan.jpg');
-- Insert Genres
INSERT INTO genres (name)
VALUES 
('Alternative Rock'),
('Soundtrack'),
('Pop'),
('Rock'),
('Hip-hop');

-- Insert Albums
INSERT INTO albums (title, artist_id, release_date)
VALUES 
  ('Nevermind', 1, '1991-09-24'),                
  ('The Masterplan', 20, '1998-11-17'),          
  ('OK Computer', 3, '1997-05-21'),              
  ('Saviors', 4, '2024-02-09'),                  
  ('American Idiot', 4, '2004-09-21'),            
  ('Barbie the Album', 5, '2023-07-21'),          
  ('Guardians of the Galaxy - Awesome Mix 1', 5, '2014-07-29'),  
  ('Pulp Fiction', 5, '1994-09-27'),              
  ('The Greatest Showman', 5, '2017-12-08'),  
  ('Baby Driver', 5, '2017-07-23'),               
  ('Sweetener', 6, '2018-08-17'),                 
  ('Rumors', 7, '1977-02-04'),                    
  ('Thriller', 8, '1982-11-30'),                  
  ('Short n’ Sweet', 9, '2023-09-22'),   
  ('Brat', 10, '2023-10-26'),           
  ('The Dark Side of the Moon', 11, '1973-03-01'), 
  ('Led Zeppelin IV', 12, '1971-11-08'),         
  ('Abbey Road', 13, '1969-09-26'),               
  ('Hotel California', 14, '1976-12-08'),         
  ('The Wall', 11, '1979-11-30'),                 -
  ('Get Rich or Die Tryin’', 15, '2003-02-06'),    
  ('To Pimp a Butterfly', 16, '2015-03-15'),      
  ('The Blueprint', 17, '2001-09-11'),            
  ('The Marshall Mathers LP', 18, '2000-05-23'),   
  ('Ready to Die', 19, '1994-09-13');              

-- Insert Products with Decimal Prices (Upper Limit)
INSERT INTO products (product_id, name, artist_id, album_id, genre_id, release_date, price, cover_image_url, created_at, updated_at)
VALUES 
(1, 'Nevermind', (SELECT artist_id FROM artists WHERE name = 'Nirvana' LIMIT 1), 1, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1991-09-24', 20.00, 'Backend\data\images\Nirvana – Nevermind (1).webp', NOW(), NOW()),
(2, 'The Masterplan', (SELECT artist_id FROM artists WHERE name = 'The Masterplan' LIMIT 1), 2, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1998-11-17', 12.99, 'Backend\data\images\Oasis – The Masterplan (1).webp', NOW(), NOW()),
(3, 'OK Computer', (SELECT artist_id FROM artists WHERE name = 'Radiohead' LIMIT 1), 3, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1997-05-21', 20.00, 'Backend\data\images\Radiohead – OK Computer.webp', NOW(), NOW()),
(4, 'Saviors', (SELECT artist_id FROM artists WHERE name = 'Green Day' LIMIT 1), 4, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '2024-02-09', 10.00, 'Backend\data\images\Green-Day-Saviors.webp', NOW(), NOW()),
(5, 'American Idiot', (SELECT artist_id FROM artists WHERE name = 'Green Day' LIMIT 1), 5, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '2004-09-21', 20.00, 'Backend\data\images\Green Day – American Idiot (1).webp', NOW(), NOW()),
(6, 'Barbie the Album', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack' LIMIT 1), 6, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2023-07-21', 30.00, 'Backend\data\images\Original Soundtrack – Barbie the Album.webp', NOW(), NOW()),
(7, 'Guardians of the Galaxy - Awesome Mix 1', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack' LIMIT 1), 7, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2014-07-29', 40.00, 'Backend\data\images\Original Soundtrack – Guardians of the Galaxy - Awesome Mix 1.webp', NOW(), NOW()),
(8, 'Pulp Fiction', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack' LIMIT 1), 8, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '1994-09-27', 40.00, 'Backend\data\images\Original Soundtrack – Pulp Fiction.webp', NOW(), NOW()),
(9, 'The Greatest Showman', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack' LIMIT 1), 9, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2017-12-08', 25.00, 'Backend\data\images\Motion Picture Cast Recording – The Greatest Showman.webp', NOW(), NOW()),
(10, 'Baby Driver', (SELECT artist_id FROM artists WHERE name = 'Original Soundtrack' LIMIT 1), 10, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2017-07-23', 35.00, 'Backend\data\images\Original Soundtrack – Baby Driver.webp', NOW(), NOW()),
(11, 'Sweetener', (SELECT artist_id FROM artists WHERE name = 'Ariana Grande' LIMIT 1), 11, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2018-08-17', 30.00, 'Backend\data\images\Ariana Grande – Sweetener.webp', NOW(), NOW()),
(12, 'Rumors', (SELECT artist_id FROM artists WHERE name = 'Fleetwood Mac' LIMIT 1), 12, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '1977-02-04', 50.00, 'Backend\data\images\Fleetwood Mac – Rumors.webp', NOW(), NOW()),
(13, 'Thriller', (SELECT artist_id FROM artists WHERE name = 'Michael Jackson' LIMIT 1), 13, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '1982-11-30', 50.00, 'Backend\data\images\Michael Jackson – Thriller.webp', NOW(), NOW()),
(14, 'Short n’ Sweet', (SELECT artist_id FROM artists WHERE name = 'Sabrina Carpenter' LIMIT 1), 14, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2023-09-22', 10.00, 'Backend\data\images\Sabrina Carpenter – Short n’ Sweet.webp', NOW(), NOW()),
(15, 'Brat', (SELECT artist_id FROM artists WHERE name = 'Charlie XCX' LIMIT 1), 15, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2023-10-26', 10.00, 'Backend\data\images\Charlie XCX – Brat.webp', NOW(), NOW()),
(16, 'The Dark Side of the Moon', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd' LIMIT 1), 16, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1973-03-01', 50.00, 'Backend\data\images\Pink Floyd – The Dark Side of the Moon.webp', NOW(), NOW()),
(17, 'Led Zeppelin IV', (SELECT artist_id FROM artists WHERE name = 'Led Zeppelin' LIMIT 1), 17, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1971-11-08', 50.00, 'Backend\data\images\Led Zepplin – Led zeppelin IV.webp', NOW(), NOW()),
(18, 'Abbey Road', (SELECT artist_id FROM artists WHERE name = 'The Beatles' LIMIT 1), 18, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1969-09-26', 50.00, 'Backend\data\images\The Beatle – Abby Road.webp', NOW(), NOW()),
(19, 'Hotel California', (SELECT artist_id FROM artists WHERE name = 'Eagles' LIMIT 1), 19, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1976-12-08', 30.00, 'Backend\data\images\Eagles – Hotel California.webp', NOW(), NOW()),
(20, 'The Wall', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd' LIMIT 1), 20, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1979-11-30', 50.00, 'Backend\data\images\Pink Floyd – The Wall.webp', NOW(), NOW()),
(21, 'Get Rich or Die Tryin’', (SELECT artist_id FROM artists WHERE name = '50 Cent' LIMIT 1), 21, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2003-02-06', 30.00, 'Backend\data\images\50 Cent – Get Rich or Die Tryin’.webp', NOW(), NOW()),
(22, 'To Pimp a Butterfly', (SELECT artist_id FROM artists WHERE name = 'Kendrick Lamar' LIMIT 1), 22, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2015-03-15', 40.00, 'Backend\data\images\Kendrick Lamar – To Pimp a Butterfly.jpg', NOW(), NOW()),
(23, 'The Blueprint', (SELECT artist_id FROM artists WHERE name = 'Jay-Z' LIMIT 1), 23, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2001-09-11', 40.00, 'Backend\data\images\Jay-Z – The Blueprint.webp', NOW(), NOW()),
(24, 'The Marshall Mathers LP', (SELECT artist_id FROM artists WHERE name = 'Eminem' LIMIT 1), 24, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2000-05-23', 40.00, 'Backend\data\images\Eminem – The Marshall Mathers LP.jpg', NOW(), NOW()),
(25, 'Ready to Die', (SELECT artist_id FROM artists WHERE name = 'The Notorious B.I.G.' LIMIT 1), 25, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '1994-09-13', 50.00, 'Backend\data\images\51pil+A8wQL._UF894,1000_QL80_.jpg', NOW(), NOW());


-- Insert Inventory
INSERT INTO inventory (product_id, stock_quantity, created_at, updated_at)
SELECT product_id, 100, NOW(), NOW()
FROM products;