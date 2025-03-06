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

--To replace ' ' with '-' in genres to get aligned
SELECT DISTINCT name FROM genres;
UPDATE genres 
SET name = REPLACE(name, ' ', '-');


ALTER TABLE products
ADD COLUMN quantity INT DEFAULT 20;


UPDATE products
SET quantity = 20
WHERE quantity IS NULL;

