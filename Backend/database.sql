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
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
 
//to insert the values into the user table
 
INSERT INTO users (user_name, email, password, role) VALUES
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
 
 
INSERT INTO artists (name)
SELECT 'Various Artists'
WHERE NOT EXISTS (SELECT 1 FROM artists WHERE name = 'Various Artists');
 
 
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
  ('Oasis', 20, '1998-11-17'),          
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
  ('The Wall', 11, '1979-11-30'),                
  ('Get Rich or Die Tryin’', 15, '2003-02-06'),    
  ('To Pimp a Butterfly', 16, '2015-03-15'),      
  ('The Blueprint', 17, '2001-09-11'),            
  ('The Marshall Mathers LP', 18, '2000-05-23'),  
  ('Ready to Die', 19, '1994-09-13');      
 
 
-- Insert Products
INSERT INTO products (product_id, name, artist_id, album_id, genre_id, release_date, price, cover_image_url, created_at, updated_at)
VALUES
(1, 'Nevermind', (SELECT artist_id FROM artists WHERE name = 'Nirvana' LIMIT 1), 1, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1991-09-24', 20.00, '/images/Nirvana – Nevermind (1).webp', NOW(), NOW()),
(2, 'The Masterplan', (SELECT artist_id FROM artists WHERE name = 'Oasis' LIMIT 1), 2, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1998-11-17', 12.99, '/images/Oasis – The Masterplan (1).webp', NOW(), NOW()),
(3, 'OK Computer', (SELECT artist_id FROM artists WHERE name = 'Radiohead' LIMIT 1), 3, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1997-05-21', 20.00, '/images/Radiohead – OK Computer.webp', NOW(), NOW()),
(4, 'Saviors', (SELECT artist_id FROM artists WHERE name = 'Green Day' LIMIT 1), 4, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '2024-02-09', 10.00, '/images/Green-Day-Saviors.webp', NOW(), NOW()),
(5, 'American Idiot', (SELECT artist_id FROM artists WHERE name = 'Green Day' LIMIT 1), 5, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '2004-09-21', 20.00, '/images/Green Day – American Idiot (1).webp', NOW(), NOW()),
(6, 'Barbie the Album', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 6, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2023-07-21', 30.00, '/images/Original Soundtrack – Barbie the Album.webp', NOW(), NOW()),
(7, 'Guardians of the Galaxy - Awesome Mix 1', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 7, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2014-07-29', 40.00, '/images/Original Soundtrack – Guardians of the Galaxy - Awesome Mix 1.webp', NOW(), NOW()),
(8, 'Pulp Fiction', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 8, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '1994-09-27', 40.00, '/images/Original Soundtrack – Pulp Fiction.webp', NOW(), NOW()),
(9, 'The Greatest Showman', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 9, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2017-12-08', 25.00, '/images/Motion Picture Cast Recording – The Greatest Showman.webp', NOW(), NOW()),
(10, 'Baby Driver', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 10, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2017-07-23', 35.00, '/images/Original Soundtrack – Baby Driver.webp', NOW(), NOW()),
(11, 'Sweetener', (SELECT artist_id FROM artists WHERE name = 'Ariana Grande' LIMIT 1), 11, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2018-08-17', 30.00, '/images/Ariana Grande – Sweetener.webp', NOW(), NOW()),
(12, 'Rumors', (SELECT artist_id FROM artists WHERE name = 'Fleetwood Mac' LIMIT 1), 12, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '1977-02-04', 50.00, '/images/Fleetwood Mac – Rumors.webp', NOW(), NOW()),
(13, 'Thriller', (SELECT artist_id FROM artists WHERE name = 'Michael Jackson' LIMIT 1), 13, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '1982-11-30', 50.00, '/images/Michael Jackson – Thriller.webp', NOW(), NOW()),
(14, 'Short n’ Sweet', (SELECT artist_id FROM artists WHERE name = 'Sabrina Carpenter' LIMIT 1), 14, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2023-09-22', 10.00, '/images/Sabrina Carpenter – Short n’ Sweet.webp', NOW(), NOW()),
(15, 'Brat', (SELECT artist_id FROM artists WHERE name = 'Charlie XCX' LIMIT 1), 15, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2023-10-26', 10.00, '/images/Charlie XCX – Brat.webp', NOW(), NOW()),
(16, 'The Dark Side of the Moon', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd' LIMIT 1), 16, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1973-03-01', 50.00, '/images/Pink Floyd – The Dark Side of the Moon.webp', NOW(), NOW()),
(17, 'Led Zeppelin IV', (SELECT artist_id FROM artists WHERE name = 'Led Zeppelin' LIMIT 1), 17, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1971-11-08', 50.00, '/images/Led Zepplin – Led zeppelin IV.webp', NOW(), NOW()),
(18, 'Abbey Road', (SELECT artist_id FROM artists WHERE name = 'The Beatles' LIMIT 1), 18, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1969-09-26', 50.00, '/images/The Beatle – Abby Road.webp', NOW(), NOW()),
(19, 'Hotel California', (SELECT artist_id FROM artists WHERE name = 'Eagles' LIMIT 1), 19, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1976-12-08', 30.00, '/images/Eagles – Hotel California.webp', NOW(), NOW()),
(20, 'The Wall', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd' LIMIT 1), 20, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1979-11-30', 50.00, '/images/Pink Floyd – The Wall.webp', NOW(), NOW()),
(21, 'Get Rich or Die Tryin’', (SELECT artist_id FROM artists WHERE name = '50 Cent' LIMIT 1), 21, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2003-02-06', 30.00, '/images/50 Cent – Get Rich or Die Tryin’.webp', NOW(), NOW()),
(22, 'To Pimp a Butterfly', (SELECT artist_id FROM artists WHERE name = 'Kendrick Lamar' LIMIT 1), 22, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2015-03-15', 40.00, '/images/Kendrick Lamar – To Pimp a Butterfly.jpg', NOW(), NOW()),
(23, 'The Blueprint', (SELECT artist_id FROM artists WHERE name = 'Jay-Z' LIMIT 1), 23, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2001-09-11', 40.00, '/images/Jay-Z – The Blueprint.webp', NOW(), NOW()),
(24, 'The Marshall Mathers LP', (SELECT artist_id FROM artists WHERE name = 'Eminem' LIMIT 1), 24, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2000-05-23', 40.00, '/images/Eminem – The Marshall Mathers LP.jpg', NOW(), NOW()),
(25, 'Ready to Die', (SELECT artist_id FROM artists WHERE name = 'The Notorious B.I.G.' LIMIT 1), 25, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '1994-09-13', 40.00, '/images/The Notorious B.I.G. – Ready to Die.webp', NOW(), NOW());
 
 
-- Insert Inventor
INSERT INTO inventory (product_id, stock_quantity, created_at, updated_at)
SELECT product_id, 100, NOW(), NOW()
FROM products;
 
 
-- To alter the table products and add best-sellers column
ALTER TABLE products ADD COLUMN best_sellers BOOLEAN DEFAULT 0;
 
--To update the best sellers product
UPDATE products
SET best_sellers = 1
WHERE name IN (
  'Nevermind',
  'Guardians of the Galaxy - Awesome Mix 1',
  'Short n’ Sweet',
  'Rumors',
  'The Dark Side of the Moon'
);
 
-- To alter the table products and add on-sale column
ALTER TABLE products ADD COLUMN on_sale BOOLEAN DEFAULT 0;
 
--To update the on-sale product
UPDATE products
SET on_sale = 1
WHERE name IN (
  'Nevermind',
  'The Masterplan',
  'OK Computer',
  'Short n’ Sweet',
  'Abbey Road',
  'Ready to Die'
);
 
--To alter the table users to temp store the reset token and token expiry
ALTER TABLE users ADD COLUMN reset_token VARCHAR(255) NULL;
ALTER TABLE users ADD COLUMN reset_token_expiry DATETIME NULL;
 
--To replace ' ' with '-' in genres to get aligned
SELECT DISTINCT name FROM genres;
UPDATE genres
SET name = REPLACE(name, ' ', '-');
 
CREATE TABLE albums_pop_up (
  id INT AUTO_INCREMENT PRIMARY KEY,
  album_id INT NOT NULL,  -- Relates to the existing albums table
  release_date DATE,
  hit_singles TEXT,
  awards TEXT,
  records TEXT,
  genres_popup TEXT,
  interesting_facts TEXT,
  related_albums TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp for when the record is created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Timestamp for when the record is updated
  FOREIGN KEY (album_id) REFERENCES albums(album_id)  -- Foreign key constraint linking to the albums table
);
 
INSERT INTO artists (name)
SELECT 'Various Artists'
WHERE NOT EXISTS (SELECT 1 FROM artists WHERE name = 'Various Artists');
 
 
INSERT INTO albums_pop_up (album_id, release_date, records, hit_singles, awards, genres_popup, interesting_facts, related_albums)
VALUES
(1, '1991-09-24',
 'Second studio album by the legendary American grunge band. Originally released in 1991, the album has been remastered and re-released for the 20th Anniversary. Includes tracks like "Smells Like Teen Spirit", "Come As You Are", "Lithium", and "In Bloom".',
 'Smells Like Teen Spirit - Come As You Are - Lithium - In Bloom - Breed',
 'Won 1 Grammy Award in 1996 for Best Alternative Music Performance.',
 "Grunge, alternative rock, punk rock",
 'The album cover features a baby swimming towards a dollar bill on a fishhook, becoming one of the most iconic images in rock history.',
 'If you loved Nevermind, you might also like: The Masterplan; OK Computer'
),
(2, '1998-11-17',
 'Compilation album by the English rock band, originally released in 1998. It includes B-sides like "Acquiesce", "Talk Tonight", "Half the World Away", and "The Masterplan".',
 'Acquiesce - Half the World Away - Rockin\' Chair',
 'Reached number one on the UK Albums Chart and is regarded as one of the band’s finest.',
 "Britpop, alternative rock",
 'Despite being a collection of non-singles, The Masterplan received critical acclaim for its high-quality tracks.',
 'If you loved Masterplan, you might also like: OK Computer; Saviors'
),
(3, '1997-05-21',
 'OK Computer is Radiohead\'s third album. Originally released in 1997, it features singles like "Paranoid Android", "Karma Police", and "Airbag". The album is considered one of the greatest of all time.',
 'Paranoid Android - Karma Police - No Surprises - Lucky',
 'Won 1 Grammy Award in 1998 for Best Alternative Music Performance.',
 "Alternative rock, electronic, experimental rock",
 'Highly experimental, blending complex arrangements and electronic elements, influencing many artists in rock and electronic music.',
 'If you loved OK Computer, you might also like: Saviors; American Idiot'
),
(4, '2024-02-09',
 'Green Day\'s 14th studio album, Saviors, delivers a powerful anthem with "The American Dream Is Killing Me". Featuring 15 tracks, including "Look Ma, No Brains!" and "Father To A Son".',
 'The American Dream Is Killing Me - Look Ma, No Brains! - Father To A Son',
 'Nominated for a Grammy Award for Best Rock Album in 2010.',
 "Punk rock, alternative rock",
 'Well-received for its return to political themes that Green Day was known for in their early days.',
 'If you loved Saviors, you might also like: American Idiot; Nevermind'
),
(5, '2004-09-21',
 'American Idiot is a concept album by Green Day, following the story of Jesus of Suburbia. It topped charts in 19 countries and sold 16 million copies worldwide, featuring hits like "American Idiot" and "Boulevard of Broken Dreams".',
 'American Idiot - Boulevard of Broken Dreams - Wake Me Up When September Ends',
 'Won 2 Grammy Awards in 2005, including Best Rock Album.',
 "Punk rock, alternative rock",
 'Released during the Iraq War, American Idiot critiques American politics.',
 'If you loved American Idiot, you might also like: Nevermind; The Masterplan'
),
(6, '2023-07-21',
 'The 2023 Barbie film soundtrack features a diverse range of musical genres, including pop, rock, and ballads, with artists like Tame Impala, Haim, Charli XCX, Ice Spice, Dua Lipa, Lizzo, Nicki Minaj, and others.',
 'Dance the Night - Barbie World (feat. Nicki Minaj & Ice Spice) - What Was I Made For? (Billie Eilish)',
 'The album blends pop, dance, and nostalgic influences, capturing the movie’s essence.',
 "Pop, dance, electro-pop",
 'The soundtrack celebrates self-expression and empowerment.',
 'If you loved Barbie the Album, you might also like: Guardians of the Galaxy - Awesome Mix 1; Pulp Fiction'
),
(7, '2014-07-29',
 'Soundtrack for the Marvel film "Guardians of the Galaxy", featuring classic 1970s hits like "Hooked on a Feeling" and "Spirit in the Sky".',
 'Hooked on a Feeling - Come and Get Your Love - Cherry Bomb - Fooled Around and Fell in Love',
 'Received critical acclaim for its nostalgic and eclectic mix of songs.',
 "Classic rock, pop rock, funk",
 'Curated by James Gunn, the soundtrack fits the film’s retro-futuristic tone.',
 'If you loved Guardians of the Galaxy - Awesome Mix 1; you might also like: Pulp Fiction; Motion Picture Cast Recording'
),
(8, '1994-09-27',
 'Iconic soundtrack for Quentin Tarantino’s Pulp Fiction, blending rock, surf, and soul with hits like "Misirlou" and "Son of a Preacher Man".',
 'You Never Can Tell (Chuck Berry) - Misirlou (Dick Dale) - Jungle Boogie (Kool & the Gang)',
 'Nominated for a Grammy Award for Best Compilation Soundtrack for Visual Media.',
 "Surf rock, soul, funk, pop",
 'The soundtrack revived interest in 60s and 70s music and contributed to the film’s cult status.',
 'If you loved Pulp Fiction; you might also like: Motion Picture Cast Recording; Baby Driver'
),
(9, '2017-12-08',
 'Soundtrack for The Greatest Showman, featuring the hit single "This Is Me".',
 'This Is Me - Rewrite the Stars - The Greatest Show - A Million Dreams',
 'Won 1 Golden Globe Award for Best Original Song for “This Is Me.”',
 "Pop, musical theatre",
 '“This Is Me” became an anthem for empowerment and inclusion.',
 'If you loved Motion Picture Cast Recording; you might also like: Baby Driver; Barbie the Album'
),
(10, '2017-07-23',
 'Soundtrack for Baby Driver, with a collection of tracks that drive the film’s thrilling car chases and heartwarming moments.',
 'Bellbottoms (The Jon Spencer Blues Explosion) - Easy (The Commodores) - Nowhere to Run (Martha Reeves & the Vandellas)',
 'Nominated for a Grammy Award for Best Compilation Soundtrack for Visual Media.',
 "Rock, soul, funk, pop",
 'The soundtrack is synced to the film’s action scenes, making the music integral to the story.',
 'If you loved Baby Driver; you might also like: Barbie the Album; Guardians of the Galaxy - Awesome Mix 1'),
(11, '2018-08-17',
 'The fourth studio album by the American singer. Features the singles "No Tears Left to Cry", "God Is a Woman" and "Breathin".',
 'No Tears Left to Cry - God Is a Woman - Breathin’ - Thank U, Next',
 'Won the Grammy Award for Best Pop Vocal Album in 2019.',
 "Pop, R&B, Dance-pop",
 'The album’s standout track, “No Tears Left to Cry,” features a dynamic vocal performance and experimental production, marking a new phase in Ariana’s career.',
 'If you loved Sweetener, you might also like: Rumors, Thriller'
),
(12, '1977-02-04',
 'Celebrate the timeless magic of Fleetwood Mac’s Rumours! This landmark album is filled with heartfelt anthems like "Go Your Own Way" and "Dreams," capturing the essence of love and heartbreak. A must-have for any vinyl collection!',
 'Go Your Own Way - Dreams - Don’t Stop - You Make Loving Fun',
 'Rumours won the Grammy Award for Best Pop Performance by a Duo or Group with Vocal.',
 'Rock, Pop rock',
 'Rumours was recorded during a period of intense personal struggles for the band members, making it one of the most emotionally charged albums in rock history.',
 'If you loved Rumours, you might also like: Thriller, Short n\' Sweet'
),
(13, '1982-11-30',
 'Thriller is the sixth studio album by American singer Michael Jackson, released on November 30, 1982. "Thriller" is a conceptual classic which has sold over 110 million copies—the highest-selling album of all time—and his combined sales top 750 million worldwide. Smash hits include title track "Thriller", "Billie Jean" and "Beat It".',
 'Billie Jean - Beat It - Thriller - Wanna Be Startin\' Somethin\' - Human Nature - P.Y.T. (Pretty Young Thing) - The Girl Is Mine (feat. Paul McCartney)',
 'Won 8 Grammy Awards in 1984, including Album of the Year.',
 'Blended pop, rock, funk, R&B, and disco',
 'Rock guitarist Eddie Van Halen played the iconic guitar solo on Beat It. The album influenced generations of artists and set new standards for music production, performance, and marketing.',
 'If you loved Thriller; you might also like: Short n\' Sweet; Brat'
),
(14, '2023-09-22',
 'Short n\' Sweet showcases the scintillating spirit of Sabrina Carpenter, the pocket-sized popstar with a larger-than-life artistic presence. One gold album and multiple platinum singles later, it\'s no wonder that "Espresso", the debut single from the forthcoming album, has it all: lyrics that make you giggle and blush and songwriting that makes you wish you\'d thought of it first.',
 'Skin - Let Me Move You - Honeymoon Fades',
 'Nominated for several Teen Choice Awards and other notable nominations.',
 'Pop, Indie Pop',
 'Sabrina Carpenter showcases a more mature sound in Short n’ Sweet, with reflective lyrics and an emotionally resonant tone that diverges from her earlier work.',
 'If you loved Short n\' Sweet, you might also like: Brat, Sweetener'
),
(15, '2023-10-26',
 'BRAT is the highly anticipated follow-up to Charli XCX’s 2022 album CRASH, which topped the UK’s official album chart. This exhilarating club record blends high art references with social commentary, showcasing Charli’s status as an avant-pop and electronic superstar. Over her trailblazing career, she has become an iconic figure in the arts, earning critical acclaim for her innovative style and entrepreneurial spirit, and reshaping pop culture by seamlessly navigating between the underground and mainstream music scenes.',
 'Good Ones - New Shapes (feat. Christine and the Queens & Caroline Polachek) - Crash',
 'Nominated for several MTV Video Music Awards.',
 'Pop, Electro-pop, Experimental',
 'Charli XCX has been known for her avant-garde approach to pop music, with Brat continuing to push boundaries in both sound and visuals.',
 'If you loved Brat, you might also like: Sweetener, Rumors'
),
(16, '1973-03-01',
 'This 2023 glow-in-the-dark vinyl issue is a tribute to Pink Floyd’s masterpiece, originally released in 2006. It features performances by notable musicians, including Adrian Belew, Robby Krieger (The Doors), Colin Moulding (XTC), and many more. Produced by Billy Sherwood of Yes, this limited edition is restricted to 1,000 units worldwide. Please note that due to the manufacturing process, the glow-in-the-dark vinyl may have noisy audio quality.',
 'Money - Time - Us and Them',
 'Inducted into the Grammy Hall of Fame in 1999.',
 'Progressive Rock, Psychedelic Rock',
 'The album’s iconic cover, designed by Storm Thorgerson, features a prism refracting light and has become synonymous with Pink Floyd’s music.',
 'If you loved The Dark Side of the Moon, you might also like: Led Zeppelin IV, Abby Road'
),
(17, '1971-11-08',
 'The fourth studio album by the English rock band. The album is notable for featuring "Stairway to Heaven," which has been described as the band\'s signature song. Features the singles "Black Dog," "Misty Mountain Hop," "Rock and Roll," and "Four Sticks."',
 'Stairway to Heaven - Black Dog - Rock and Roll',
 'The album is considered one of the best rock albums of all time and is often listed on many "greatest albums" lists.',
 'Hard Rock, Heavy Metal, Blues Rock',
 'The album has no title on the cover, only the iconic symbols representing each band member, which adds to its mystique.',
 'If you loved Led Zeppelin IV, you might also like: Abbey Road, Hotel California'
),
(18, '1969-09-26',
 'Features the 2019 stereo album mix, sourced directly from the original eight-track session tapes. To produce the mix, Giles Martin, working with Sam Okell, was guided by the album\'s original stereo mix, which was supervised by his father, George Martin.',
 'Come Together - Something - Here Comes the Sun',
 'Abbey Road has been named one of the greatest albums of all time and was inducted into the Grammy Hall of Fame.',
 'Rock, Pop Rock',
 'The famous Abbey Road crossing photo was taken outside Abbey Road Studios in London, and it remains one of the most recognizable images in music history.',
 'If you loved Abbey Road, you might also like: Hotel California, The Wall'
),
(19, '1976-12-08',
 'The fifth studio album by the American rock band. Features the singles "New Kid in Town," "Hotel California," and "Life in the Fast Lane."',
 'Hotel California - New Kid in Town - Life in the Fast Lane',
 'Won the Grammy Award for Record of the Year in 1978.',
 'Rock, Soft Rock',
 'The album’s title track is often interpreted as a critique of excess and the California lifestyle during the 1970s.',
 'If you loved Hotel California, you might also like: The Wall, The Dark Side of the Moon'
),
(20, '1979-11-30',
 'The eleventh studio album by the English progressive rock band. It is a rock opera that explores Pink, a jaded rockstar whose eventual self-imposed isolation from society is symbolized by a wall. Features the singles "Another Brick in the Wall, Part 2," "Run Like Hell," and "Comfortably Numb."',
 'Another Brick in the Wall, Part 2 - Comfortably Numb - Hey You',
 'The Wall won several awards and has been recognized as one of the greatest rock albums.',
 'Progressive Rock, Art Rock',
 'The Wall is a concept album that explores themes of alienation, war, and mental collapse. The song "Another Brick in the Wall, Part 2" became an anthem for many.',
 'If you loved The Wall, you might also like: The Dark Side of the Moon, Led Zeppelin IV'
),
(21, '2003-02-06',
 'Get Rich or Die Tryin\' is the debut studio album by American rapper 50 Cent, released on February 4, 2003, through Aftermath Entertainment in collaboration with Shady Records and Interscope Records. Initially delayed due to bootlegging, the album showcases 50 Cent\'s relentless drive and talent, featuring the hit single In Da Club, produced by Dr. Dre. It includes production from Dr. Dre and Eminem, along with guest appearances from Eminem, Young Buck, Lloyd Banks, and Tony Yayo, setting the stage for hip-hop in the coming years.',
 'In Da Club, 21 Questions, P.I.M.P.',
 'Won several awards including Billboard Music Awards and American Music Awards.',
 'Hip Hop, Rap',
 'The album marked 50 Cent\'s breakthrough, and his aggressive, street-smart persona resonated with fans. His hit single "In Da Club" became one of the most iconic hip hop tracks of the 2000s.',
 'If you loved Get Rich or Die Tryin\', you might also like: To Pimp a Butterfly, The Blueprint'
),
(22, '2015-03-15',
 'Third studio album by the American rapper. Featuring the singles "i", "King Kunta" and "The Blacker the Berry" featuring Assassin, the album debuted at #1 in the UK Albums Chart.',
 'Alright, King Kunta, These Walls',
 'Won the Grammy Award for Best Rap Album in 2016.',
 'Hip Hop, Jazz Rap, Funk, Soul',
 'To Pimp a Butterfly is often praised for its bold fusion of genres, including jazz, funk, and spoken word, and for its socially conscious lyrics addressing race and black culture in America.',
 'If you loved To Pimp a Butterfly, you might also like: The Blueprint, The Marshall Mathers LP'
),
(23, '2001-09-11',
 'Sixth studio album by the American rapper. Contrasting the radio-friendly sound of Jay-Z\'s previous work, "The Blueprint" features soul-based sampling and production handled primarily by Kanye West, Just Blaze, and Bink, as well as Timbaland, Trackmasters, and Eminem, who also contributes the album\'s sole guest feature.',
 'Izzo (H.O.V.A.), Girls, Girls, Girls, Renegade (feat. Eminem)',
 'Won 3 Grammy Awards in 2002, including Best Rap Album.',
 'Hip Hop, Rap',
 'Jay-Z’s production on this album, which featured Kanye West and Just Blaze, defined a new era in hip hop. “The Blueprint” solidified his place as one of the greatest rappers of all time.',
 'If you loved The Blueprint, you might also like: The Marshall Mathers LP, Ready to Die'
),
(24, '2000-05-23',
 'The third studio album by Eminem, The Marshall Mathers LP, was originally released in May 2000. Produced primarily by Dr. Dre and Eminem, along with The 45 King, the Bass Brothers, and Mel-Man, the album showcases more introspective lyricism, reflecting on his sudden rise to fame and the controversies surrounding his lyrics. It features hit singles such as The Real Slim Shady, The Way I Am, Stan, I’m Back, and Bitch Please II.',
 'The Real Slim Shady, Stan (feat. Dido), Marshall Mathers',
 'Won 2 Grammy Awards in 2001, including Best Rap Album.',
 'Hip Hop, Rap',
 'The Marshall Mathers LP is known for its provocative lyrics and Eminem’s raw, unfiltered approach to his personal life, including his struggles with fame, family, and mental health.',
 'If you loved The Marshall Mathers LP, you might also like: Ready to Die, Get Rich or Die Tryin'
),
(25, '1994-09-13',
 'Originally released on 13th September 1994, "Ready to Die" is the debut studio album from hip-hop legend, The Notorious B.I.G. Upon release, the album was met with widespread critical acclaim, with Pitchfork giving it a 10/10 rating along with various other critics praising it for its brutally honest depiction of gang violence and conflict as opposed to the often-glorified portrayal in the genre and the wider media.',
 'Juicy, Big Poppa, One More Chance',
 'Considered one of the greatest rap albums of all time, it was inducted into the Library of Congress\'s National Recording Registry.',
 'Hip Hop, East Coast Rap',
 'The album tells the story of Biggie\'s life growing up in Brooklyn, from his struggles in the streets to his rise to fame. "Juicy" became one of his most iconic songs.',
 'If you loved Ready to Die, you might also like: Get Rich or Die Tryin\', To Pimp a Butterfly');
 
 
UPDATE products
SET cover_image_url = '/images/Fleetwood Mac – Rumors.jpg'
WHERE name = 'Rumors' AND artist_id = (SELECT artist_id FROM artists WHERE name = 'Fleetwood Mac' LIMIT 1);
 
UPDATE products
SET cover_image_url = '/images/Sabrina Carpenter – Short n’ Sweet.jpg'
WHERE name = 'Short n’ Sweet' AND artist_id = (SELECT artist_id FROM artists WHERE name = 'Sabrina Carpenter' LIMIT 1);
 
UPDATE products
SET cover_image_url = '/images/The Notorious B.I.G. – Ready to Die.jpg'
WHERE name = 'Ready to Die' AND artist_id = (SELECT artist_id FROM artists WHERE name = 'The Notorious B.I.G.' LIMIT 1);
 
UPDATE products
SET cover_image_url = '/images/Pink Floyd – The Dark Side of the Moon.jpg'
WHERE name = 'The Dark Side of the Moon' AND artist_id = (SELECT artist_id FROM artists WHERE name = 'Pink Floyd' LIMIT 1);
 
UPDATE products
SET cover_image_url = '/images/Led Zeppelin – Led Zeppelin IV.jpg'
WHERE name = 'Led Zeppelin IV' AND artist_id = (SELECT artist_id FROM artists WHERE name = 'Led Zeppelin' LIMIT 1);
 
 
UPDATE products
SET cover_image_url = '/images/Charlie XCX – Brat.jpg'
WHERE name = 'Brat' AND artist_id = (SELECT artist_id FROM artists WHERE name = 'Charlie XCX' LIMIT 1);
 
-- table to create a blacklist tokens for logout
CREATE TABLE blacklisted_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL
);

-- Populate Inventory with random stock quantities (1-50)
INSERT INTO inventory (product_id, stock_quantity)
SELECT product_id, FLOOR(1 + RAND() * 50)
FROM products;

CREATE TABLE artists_bio (
    artist_bio_id INT AUTO_INCREMENT PRIMARY KEY,
    artist_id INT,
    bio TEXT,
    image_url VARCHAR(255),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id)
);

INSERT INTO artists_bio (artist_id, bio, image_url) VALUES
(
    (SELECT artist_id FROM artists WHERE name = 'Nirvana'),
    'Formed in 1987 in Aberdeen, Washington, Nirvana was pivotal in bringing grunge music to the mainstream. Led by vocalist and guitarist Kurt Cobain, alongside bassist Krist Novoselic and drummer Dave Grohl, the band’s breakthrough came with Nevermind (1991), featuring the anthemic Smells Like Teen Spirit. Their raw sound and introspective lyrics captured the angst of a generation, making them one of the most influential bands of the ''90s. Nirvana''s success was tragically cut short by Cobain''s death in 1994, but their legacy continues to shape rock music and alternative culture worldwide.',
    '/images/artists_info/nirvana-nv002stdo.jpg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Oasis'),
    'Emerging from Manchester in 1991, Oasis became synonymous with the Britpop movement. Led by the Gallagher brothers, Liam and Noel, the band''s confident swagger and anthemic songwriting defined a generation. Their 1994 debut, Definitely Maybe, became one of the fastest-selling albums in UK history, followed by (What’s the Story) Morning Glory? (1995), featuring classics like Wonderwall and Don’t Look Back in Anger. Despite internal tensions and an eventual breakup in 2009, Oasis remains one of the most influential British rock bands, with their music continuing to inspire fans and artists alike.',
    '/images/artists_info/oasis.webp'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Radiohead'),
    'Formed in 1985 in Abingdon, England, Radiohead is known for their innovative and ever-evolving sound. After breaking through with Creep (1992), they transcended alt-rock with OK Computer (1997), a landmark album exploring themes of technology and alienation. Fronted by Thom Yorke, with Johnny and Colin Greenwood, Ed O''Brien, and Philip Selway, the band continued to push musical boundaries with electronic and experimental elements in Kid A (2000) and beyond. Their ability to constantly reinvent themselves has earned them critical acclaim, a dedicated fanbase, and a legacy as one of the most groundbreaking bands in modern music.',
    '/images/artists_info/Radiohead in 1997.avif'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Green Day'),
    'Pioneers of pop-punk, Green Day formed in 1987 in California, led by Billie Joe Armstrong, Mike Dirnt, and Tré Cool. Their 1994 album Dookie catapulted them to fame with hits like Basket Case and When I Come Around. Known for their energetic style and rebellious lyrics, they reached new heights with the politically charged American Idiot (2004), a rock opera that resonated with a generation. With multiple Grammy Awards and a place in the Rock and Roll Hall of Fame, Green Day continues to shape punk rock while maintaining their signature high-energy performances.',
    '/images/artists_info/green day.webp'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Sabrina Carpenter'),
    'Sabrina Carpenter, born on May 11, 1999, in Quakertown, Pennsylvania, is an American singer, songwriter, and actress. She gained prominence starring as Maya Hart on the Disney Channel series "Girl Meets World" (2014–2017). Transitioning to music, Carpenter released her debut single, "Can''t Blame a Girl for Trying," in 2014, followed by albums including "Eyes Wide Open" (2015) and "Evolution" (2016). Her 2022 album, "Emails I Can''t Send," featured the viral hit "Nonsense." In 2024, her sixth album, "Short n'' Sweet," debuted at number one on the Billboard 200, producing chart-topping singles like "Espresso." Carpenter has also appeared in films such as "The Hate U Give" (2018) and "Clouds" (2020), and made her Broadway debut in "Mean Girls" (2020)',
    '/images/artists_info/sabrina carpenter.jpeg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Ariana Grande'),
    'Ariana Grande, born in 1993 in Boca Raton, Florida, rose to fame as a child star before transitioning into a global pop sensation. With a powerhouse voice influenced by R&B, she debuted with Yours Truly (2013) and quickly became known for her vocal range and emotional depth. Albums like Sweetener (2018) and Thank U, Next (2019) cemented her status as one of pop’s biggest stars. Hits like No Tears Left to Cry and 7 Rings showcase her ability to blend vulnerability with confidence, making her one of the most influential artists of her generation.',
    '/images/artists_info/ariana grande.jpg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Fleetwood Mac'),
    'Fleetwood Mac, formed in 1967, evolved into one of the most successful rock bands of all time. Originally a British blues band, they found global fame with their classic lineup of Stevie Nicks, Lindsey Buckingham, Christine McVie, John McVie, and Mick Fleetwood. Their 1977 album Rumours, featuring Go Your Own Way and Dreams, became one of the best-selling albums ever. Known for their harmonious blend of rock and pop, Fleetwood Mac''s music continues to transcend generations. Despite lineup changes and personal drama, their influence remains strong, with their songs still beloved by fans worldwide.',
    '/images/artists_info/fleetwood mac.jpg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Michael Jackson'),
    'Dubbed the "King of Pop," Michael Jackson revolutionized music, dance, and entertainment. Born in 1958, he began as a child star with the Jackson 5 before launching a solo career that redefined pop music. His 1982 album Thriller remains the best-selling album of all time, with hits like Billie Jean and Beat It. Known for his groundbreaking music videos and signature dance moves like the moonwalk, Jackson''s impact is immeasurable. Despite controversies, his legacy as a musical genius endures, influencing countless artists and shaping modern pop culture.',
    '/images/artists_info/michael - jackson.jpg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Olivia Rodrigo'),
    'Born in 2003, Olivia Rodrigo rose to fame with her debut single Drivers License (2021), which shattered streaming records and cemented her status as a voice of Gen Z. Her debut album, SOUR, showcased her emotional songwriting and blend of pop and alternative influences. With tracks like Good 4 U and Deja Vu, she explored themes of heartbreak and self-discovery. Her follow-up, GUTS (2023), reinforced her reputation as a talented lyricist. Rodrigo''s ability to connect with listeners through raw, authentic storytelling has made her one of the most exciting young artists in music today.',
    '/images/artists_info/olivia rodrigo.webp'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Ashnikko'),
    'Ashnikko, born Ashton Nicole Casey in 1996, is an American artist known for her blend of hyper-pop, hip-hop, and punk influences. Rising to fame with STUPID (2019) and Daisy (2020), she built a reputation for bold, unconventional music and feminist themes. Her debut album DEMIDEVIL (2021) showcased her genre-defying sound and unapologetic persona. With a distinctive aesthetic and high-energy performances, Ashnikko has carved out a unique space in modern pop music, challenging conventions and embracing individuality with every track she releases.',
    '/images/artists_info/Ashnikko.webp'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Pink Floyd'),
    'Formed in 1965, Pink Floyd became pioneers of progressive rock, known for their concept albums and atmospheric sound. Led by Roger Waters, David Gilmour, Richard Wright, and Nick Mason, they created some of the most influential albums in music history, including The Dark Side of the Moon (1973) and The Wall (1979). Their music explores themes of time, war, mental health, and societal control, with intricate compositions and psychedelic elements. Even after decades, Pink Floyd’s work continues to captivate audiences, solidifying their place as one of rock’s most legendary bands.',
    '/images/artists_info/pink floyd.jpg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Led Zeppelin'),
    'Led Zeppelin, formed in 1968, revolutionized rock music with their blend of blues, hard rock, and folk influences. Comprised of Robert Plant, Jimmy Page, John Paul Jones, and John Bonham, the band created timeless classics like Stairway to Heaven, Whole Lotta Love, and Kashmir. Their electrifying performances and innovative studio techniques set new standards for rock musicianship. Despite disbanding after Bonham’s death in 1980, their influence on rock and metal remains unmatched, with their music continuing to inspire generations of artists and fans alike.',
    '/images/artists_info/Led_Zeppelin.jpg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'The Beatles'),
    'The Beatles, formed in 1960 in Liverpool, are regarded as the most influential band in history. Composed of John Lennon, Paul McCartney, George Harrison, and Ringo Starr, they transformed pop and rock music with their innovative songwriting and experimental sound. From early hits like Love Me Do to groundbreaking albums like Sgt. Pepper’s Lonely Hearts Club Band, their music evolved rapidly, shaping the course of modern music. Even after their breakup in 1970, their legacy endures, with their songs remaining cultural landmarks that continue to inspire artists and audiences worldwide.',
    '/images/artists_info/The-Beatles.webp'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Eagles'),
    'The Eagles, formed in 1971, became one of the best-selling rock bands of all time, blending rock with country harmonies. Their album Hotel California (1976) produced timeless hits like the title track and New Kid in Town. Known for their smooth melodies and intricate guitar work, Don Henley, Glenn Frey, Joe Walsh, and others defined the sound of ''70s rock. Despite breakups and reunions, the Eagles’ music remains iconic, with their greatest hits album ranking among the best-selling records in history. Their influence on country rock and soft rock continues to be felt today.',
    '/images/artists_info/Eagles.webp'
),
(
    (SELECT artist_id FROM artists WHERE name = '50 Cent'),
    'Born Curtis Jackson in 1975, 50 Cent emerged as a dominant force in hip-hop in the early 2000s. His debut album, Get Rich or Die Tryin’ (2003), featuring hits like In Da Club and Many Men, established him as a rap superstar. Discovered by Eminem and Dr. Dre, he combined gritty street narratives with mainstream appeal. Beyond music, 50 Cent built a successful business empire, including ventures in film, television, and entrepreneurship. His influence on rap culture extends beyond his music, making him one of the most recognized figures in hip-hop.',
    '/images/artists_info/50 cent.webp'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Kendrick Lamar'),
    'Kendrick Lamar is widely regarded as one of the greatest hip-hop artists of his generation. Emerging from Compton, California, he gained recognition with Good Kid, M.A.A.D City (2012) before reaching critical heights with To Pimp a Butterfly (2015), an album blending jazz, funk, and politically charged lyrics. His storytelling, social commentary, and intricate lyricism have earned him multiple Grammy Awards and even a Pulitzer Prize for DAMN. (2017). With his thought-provoking music and cultural impact, Lamar continues to shape hip-hop as both an art form and a means of activism.',
    '/images/artists_info/Kendrick_Lamar.jpg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Jay-Z'),
    'Jay-Z, born Shawn Carter in 1969, went from Brooklyn hustler to hip-hop mogul, becoming one of the most successful rappers of all time. His debut album Reasonable Doubt (1996) set the stage for a career defined by lyrical brilliance, business acumen, and cultural influence. With classic albums like The Blueprint and 4:44, Jay-Z has consistently evolved, tackling themes of success, race, and personal growth. As the founder of Roc Nation and a billionaire entrepreneur, he has shaped not only hip-hop but the entire music industry.',
    '/images/artists_info/jay z.jpg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'Eminem'),
    'Eminem, born Marshall Mathers in 1972, is one of the most influential and controversial rappers in history. Rising to fame with The Slim Shady LP (1999), his provocative lyrics, storytelling, and technical skill set him apart. Albums like The Marshall Mathers LP and The Eminem Show solidified his reputation as a masterful lyricist, tackling personal struggles, fame, and social issues. Discovered by Dr. Dre, he became one of the best-selling artists of all time, influencing generations of rappers with his raw honesty and rapid-fire delivery.',
    '/images/artists_info/Eminem.jpeg'
),
(
    (SELECT artist_id FROM artists WHERE name = 'The Notorious B.I.G.'),
    'The Notorious B.I.G., born Christopher Wallace in 1972, became one of hip-hop’s most iconic figures before his tragic death in 1997. With his deep voice, smooth flow, and vivid storytelling, he brought East Coast rap to the forefront. His debut album, Ready to Die (1994), produced hits like Juicy and Big Poppa, while Life After Death (1997) cemented his legendary status. Despite his short career, Biggie’s impact on hip-hop remains profound, with his influence still shaping the genre decades later.',
    '/images/artists_info/the_notorious B.I.G.jpg'
); 

CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE subscriptions (
    subscription_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    subscription_type VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE guest_subscriptions (
    guest_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    subscription_type VARCHAR(255),
    subscription_token VARCHAR(255) NOT NULL,
    is_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE guest_subscriptions MODIFY subscription_token VARCHAR(255) NULL;

ALTER TABLE users ADD COLUMN membership_status ENUM('regular', 'vip') DEFAULT 'regular';

--Updated the database name and your VS Code settings
UPDATE products 
SET image_url = '/images/The_Notorious_BIG_Ready_to_Die.jpg' 
WHERE id = 25;

UPDATE products 
SET image_url = '/images/Led_Zeppelin_IV.jpg' 
WHERE id = 17;


--New table for message in the dash board
CREATE TABLE messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    parent_id INT,
    FOREIGN KEY (sender_id) REFERENCES users(user_id),
    FOREIGN KEY (receiver_id) REFERENCES users(user_id),
    FOREIGN KEY (parent_id) REFERENCES messages(message_id)
);

--Additional table for message in the dash board
ALTER TABLE users
ADD COLUMN refresh_token VARCHAR(255),
ADD COLUMN refresh_token_expires_at TIMESTAMP;


ALTER TABLE users
ADD COLUMN approval_status VARCHAR(20) DEFAULT 'pending';

--1.Additional info for displaying cover_image between album and release date
ALTER TABLE albums_pop_up
ADD COLUMN cover_image_url VARCHAR(255) BEFORE release_date;

--2.Additional info for displaying related_albums_images 
ALTER TABLE albums_pop_up
ADD related_albums_images TEXT;

--3.Additional updated info for the related_albums_images

UPDATE albums_pop_up
SET related_albums_images = CASE
    WHEN album_id = 1 THEN '[{"product_id": 2, "image_url": "/images/Oasis – The Masterplan (1).webp"}, {"product_id": 3, "image_url": "/images/Radiohead – OK Computer.webp"}]'
    WHEN album_id = 2 THEN '[{"product_id": 3, "image_url": "/images/Radiohead – OK Computer.webp"}, {"product_id": 4, "image_url": "/images/Green-Day-Saviors.webp"}]'
    WHEN album_id = 3 THEN '[{"product_id": 4, "image_url": "/images/Green-Day-Saviors.webp"}, {"product_id": 5, "image_url": "/images/Green Day – American Idiot (1).webp"}]'
    WHEN album_id = 4 THEN '[{"product_id": 5, "image_url": "/images/Green Day – American Idiot (1).webp"}, {"product_id": 1, "image_url": "/images/Nirvana – Nevermind (1).webp"}]'
    WHEN album_id = 5 THEN '[{"product_id": 1, "image_url": "/images/Nirvana – Nevermind (1).webp"}, {"product_id": 2, "image_url": "/images/Oasis – The Masterplan (1).webp"}]'
    WHEN album_id = 6 THEN '[{"product_id": 7, "image_url": "/images/Original Soundtrack – Guardians of the Galaxy - Awesome Mix 1.webp"}, {"product_id": 8, "image_url": "/images/Original Soundtrack – Pulp Fiction.webp"}]'
    WHEN album_id = 7 THEN '[{"product_id": 8, "image_url": "/images/Original Soundtrack – Pulp Fiction.webp"}, {"product_id": 9, "image_url": "/images/Motion Picture Cast Recording – The Greatest Showman.webp"}]'
    WHEN album_id = 8 THEN '[{"product_id": 9, "image_url": "/images/Motion Picture Cast Recording – The Greatest Showman.webp"}, {"product_id": 10, "image_url": "/images/Original Soundtrack – Baby Driver.webp"}]'
    WHEN album_id = 9 THEN '[{"product_id": 10, "image_url": "/images/Original Soundtrack – Baby Driver.webp"}, {"product_id": 6, "image_url": "/images/Original Soundtrack – Barbie the Album.webp"}]'
    WHEN album_id = 10 THEN '[{"product_id": 6, "image_url": "/images/Original Soundtrack – Barbie the Album.webp"}, {"product_id": 7, "image_url": "/images/Original Soundtrack – Guardians of the Galaxy - Awesome Mix 1.webp"}]'
    WHEN album_id = 11 THEN '[{"product_id": 12, "image_url": "/images/Fleetwood Mac – Rumors.webp"}, {"product_id": 13, "image_url": "/images/Michael Jackson – Thriller.webp"}]'
    WHEN album_id = 12 THEN '[{"product_id": 13, "image_url": "/images/Michael Jackson – Thriller.webp"}, {"product_id": 14, "image_url": "/images/Sabrina Carpenter – Short n’ Sweet.webp"}]'
    WHEN album_id = 13 THEN '[{"product_id": 14, "image_url": "/images/Sabrina Carpenter – Short n’ Sweet.webp"}, {"product_id": 15, "image_url": "/images/Charlie XCX – Brat.webp"}]'
    WHEN album_id = 14 THEN '[{"product_id": 15, "image_url": "/images/Charlie XCX – Brat.webp"}, {"product_id": 11, "image_url": "/images/Ariana Grande – Sweetener.webp"}]'
    WHEN album_id = 15 THEN '[{"product_id": 11, "image_url": "/images/Ariana Grande – Sweetener.webp"}, {"product_id": 12, "image_url": "/images/Fleetwood Mac – Rumors.webp"}]'
    WHEN album_id = 16 THEN '[{"product_id": 17, "image_url": "/images/Led Zepplin – Led zeppelin IV.webp"}, {"product_id": 18, "image_url": "/images/The Beatle – Abby Road.webp"}]'
    WHEN album_id = 17 THEN '[{"product_id": 18, "image_url": "/images/The Beatle – Abby Road.webp"}, {"product_id": 19, "image_url": "/images/Eagles – Hotel California.webp"}]'
    WHEN album_id = 18 THEN '[{"product_id": 19, "image_url": "/images/Eagles – Hotel California.webp"}, {"product_id": 20, "image_url": "/images/Pink Floyd – The Wall.webp"}]'
    WHEN album_id = 19 THEN '[{"product_id": 20, "image_url": "/images/Pink Floyd – The Wall.webp"}, {"product_id": 16, "image_url": "/images/Pink Floyd – The Dark Side of the Moon.webp"}]'
    WHEN album_id = 20 THEN '[{"product_id": 16, "image_url": "/images/Pink Floyd – The Dark Side of the Moon.webp"}, {"product_id": 17, "image_url": "/images/Led Zepplin – Led zeppelin IV.webp"}]'
    WHEN album_id = 21 THEN '[{"product_id": 22, "image_url": "/images/Kendrick Lamar – To Pimp a Butterfly.jpg"}, {"product_id": 23, "image_url": "/images/Jay-Z – The Blueprint.webp"}]'
    WHEN album_id = 22 THEN '[{"product_id": 23, "image_url": "/images/Jay-Z – The Blueprint.webp"}, {"product_id": 24, "image_url": "/images/Eminem – The Marshall Mathers LP.jpg"}]'
    WHEN album_id = 23 THEN '[{"product_id": 24, "image_url": "/images/Eminem – The Marshall Mathers LP.jpg"}, {"product_id": 25, "image_url": "/images/The Notorious B.I.G. – Ready to Die.webp"}]'
    WHEN album_id = 24 THEN '[{"product_id": 25, "image_url": "/images/The Notorious B.I.G. – Ready to Die.webp"}, {"product_id": 21, "image_url": "/images/50 Cent – Get Rich or Die Tryin’.webp"}]'
    WHEN album_id = 25 THEN '[{"product_id": 21, "image_url": "/images/50 Cent – Get Rich or Die Tryin’.webp"}, {"product_id": 22, "image_url": "/images/Kendrick Lamar – To Pimp a Butterfly.jpg"}]'
    ELSE NULL
END
WHERE album_id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25);

--Addtional info for adminMessage
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- First message (parentId is NULL)
INSERT INTO messages (sender_id, receiver_id, message, parent_id) VALUES (1, 9, 'This is the first message.', NULL);

-- Reply to the above message
INSERT INTO messages (sender_id, receiver_id, message, parent_id) VALUES (9, 1, 'This is a reply.', 4); -- Reply to message_id 4
-- Reply to another message
INSERT INTO messages (sender_id, receiver_id, message, parent_id) VALUES (2, 9, 'Reply to Test Message 2.', 2); -- Reply to message_id 2
-- Reply to yet another message
INSERT INTO messages (sender_id, receiver_id, message, parent_id) VALUES (9, 3, 'Reply to Test Message 3.', 3); -- Reply to message_id 3
-- Reply to a reply
INSERT INTO messages (sender_id, receiver_id, message, parent_id) VALUES (3, 9, 'Reply to the reply of Test Message 3.', 6); -- Reply to message_id 6

ALTER TABLE albums_pop_up 
ADD COLUMN cover_image_url VARCHAR(255) AFTER release_date;

ALTER TABLE albums_pop_up
ADD related_albums_images TEXT;


SHOW CREATE TABLE albums_pop_up;

ALTER TABLE albums_pop_up ADD UNIQUE (album_id);

CREATE TABLE related_albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    album_id INT NOT NULL,
    related_album_id INT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums_pop_up(album_id) ON DELETE CASCADE,
    FOREIGN KEY (related_album_id) REFERENCES albums_pop_up(album_id) ON DELETE CASCADE
);

CREATE TABLE related_album_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    related_album_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (related_album_id) REFERENCES albums_pop_up(album_id) ON DELETE CASCADE
);

ALTER TABLE albums_pop_up 
DROP COLUMN related_albums, 
DROP COLUMN related_albums_images;

INSERT INTO related_albums (album_id, related_album_id) VALUES
(1, 2), (1, 3), -- Nevermind → The Masterplan, OK Computer
(2, 3), (2, 4), -- The Masterplan → OK Computer, Saviors
(3, 4), (3, 5), -- OK Computer → Saviors, American Idiot
(4, 5), (4, 6), -- Saviors → American Idiot, Barbie the Album
(5, 6), (5, 7), -- American Idiot → Barbie the Album, Guardians of the Galaxy
(6, 7), (6, 8), -- Barbie the Album → Guardians of the Galaxy, Pulp Fiction
(7, 8), (7, 9), -- Guardians of the Galaxy → Pulp Fiction, The Greatest Showman
(8, 9), (8, 10), -- Pulp Fiction → The Greatest Showman, Baby Driver
(9, 10), (9, 11), -- The Greatest Showman → Baby Driver, Sweetener
(10, 11), (10, 12), -- Baby Driver → Sweetener, Rumours
(11, 12), (11, 13), -- Sweetener → Rumours, Thriller
(12, 13), (12, 14), -- Rumours → Thriller, Short n’ Sweet
(13, 14), (13, 15), -- Thriller → Short n’ Sweet, Brat
(14, 15), (14, 16), -- Short n’ Sweet → Brat, The Dark Side of the Moon
(15, 16), (15, 17), -- Brat → The Dark Side of the Moon, Led Zeppelin IV
(16, 17), (16, 18), -- The Dark Side of the Moon → Led Zeppelin IV, Abbey Road
(17, 18), (17, 19), -- Led Zeppelin IV → Abbey Road, Hotel California
(18, 19), (18, 20), -- Abbey Road → Hotel California, The Wall
(19, 20), (19, 21), -- Hotel California → The Wall, Get Rich or Die Tryin'
(20, 21), (20, 22), -- The Wall → Get Rich or Die Tryin', To Pimp a Butterfly
(21, 22), (21, 23), -- Get Rich or Die Tryin' → To Pimp a Butterfly, The Blueprint
(22, 23), (22, 24), -- To Pimp a Butterfly → The Blueprint, The Marshall Mathers LP
(23, 24), (23, 25), -- The Blueprint → The Marshall Mathers LP, Ready to Die
(24, 25), (24, 1), -- The Marshall Mathers LP → Ready to Die, Nevermind
(25, 1), (25, 2); -- Ready to Die → Nevermind, The Masterplan


INSERT INTO related_album_images (related_album_id, image_url) VALUES
(2, '/images/Oasis – The Masterplan.webp'),
(3, '/images/Radiohead – OK Computer.webp'),
(4, '/images/Green-Day-Saviors.webp'),
(5, '/images/Green Day – American Idiot.webp'),
(6, '/images/Original Soundtrack – Barbie the Album.webp'),
(7, '/images/Original Soundtrack – Guardians of the Galaxy - Awesome Mix 1.webp'),
(8, '/images/Original Soundtrack – Pulp Fiction.webp'),
(9, '/images/Motion Picture Cast Recording – The Greatest Showman.webp'),
(10, '/images/Original Soundtrack – Baby Driver.webp'),
(11, '/images/Ariana Grande – Sweetener.webp'),
(12, '/images/Fleetwood Mac – Rumours.webp'),
(13, '/images/Michael Jackson – Thriller.webp'),
(14, '/images/Sabrina Carpenter – Short n’ Sweet.webp'),
(15, '/images/Charlie XCX – Brat.webp'),
(16, '/images/Pink Floyd – The Dark Side of the Moon.webp'),
(17, '/images/Led Zepplin – Led Zeppelin IV.webp'),
(18, '/images/The Beatles – Abbey Road.webp'),
(19, '/images/Eagles – Hotel California.webp'),
(20, '/images/Pink Floyd – The Wall.webp'),
(21, '/images/50 Cent – Get Rich or Die Tryin’.webp'),
(22, '/images/Kendrick Lamar – To Pimp a Butterfly.webp'),
(23, '/images/Jay-Z – The Blueprint.webp'),
(24, '/images/Eminem – The Marshall Mathers LP.jpg'),
(25, '/images/The Notorious B.I.G. – Ready to Die.webp');

UPDATE related_album_images
SET image_url = REPLACE(image_url, 'imagesReady to Die - The Notorious Big.jpg', '/images/Ready to Die - The Notorious Big.jpg')
WHERE image_url LIKE '%imagesReady to Die - The Notorious Big.jpg%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Oasis – The Masterplan.webp', '/images/Oasis – The Masterplan (1).webp')
WHERE image_url LIKE '%/images/Oasis – The Masterplan.webp%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Green Day – American Idiot.webp', '/images/Green Day – American Idiot (1).webp')
WHERE image_url LIKE '%/images/Green Day – American Idiot.webp%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Fleetwood Mac – Rumours.webp', '/images/Fleetwood Mac – Rumors.jpg')
WHERE image_url LIKE '%/images/Fleetwood Mac – Rumours.webp%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Sabrina Carpenter – Short n’ Sweet.webp', '/images/Sabrina Carpenter – Short n’ Sweet.jpg')
WHERE image_url LIKE '%/images/Sabrina Carpenter – Short n’ Sweet.webp%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Charlie XCX – Brat.webp', '/images/Charlie XCX – Brat.jpg')
WHERE image_url LIKE '%/images/Charlie XCX – Brat.webp%';


UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Pink Floyd – The Dark Side of the Moon.webp', '/images/Pink Floyd – The Dark Side of the Moon.jpg')
WHERE image_url LIKE '%/images/Pink Floyd – The Dark Side of the Moon.webp%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Led Zepplin – Led Zeppelin IV.webp', '/images/Led Zeppelin – Led Zeppelin IV.jpg')
WHERE image_url LIKE '%/images/Led Zepplin – Led Zeppelin IV.webp%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/The Beatles – Abbey Road.webp', '/images/The Beatle – Abby Road.webp')
WHERE image_url LIKE '%/images/The Beatles – Abbey Road.webp%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Kendrick Lamar – To Pimp a Butterfly.webp', '/images/Kendrick Lamar – To Pimp a Butterfly.jpg')
WHERE image_url LIKE '%/images/Kendrick Lamar – To Pimp a Butterfly.webp%';

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Nirvana – Nevermind (1).webp', '/images/Ready to die - The Notorious Big.jpg')
WHERE related_album_id = 25;

UPDATE related_album_images
SET image_url = REPLACE(image_url, '/images/Nirvana – Nevermind (1).webp', '/images/Radiohead – OK Computer.webp')
WHERE image_url LIKE '%/images/Radiohead – OK Computer.webp%';

UPDATE related_albums
SET related_album_id = 3
WHERE related_album_id = 1;