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

-- Insert Products with Decimal Prices (Upper Limit) + description, format, duration
INSERT INTO products (product_id, name, artist_id, album_id, genre_id, release_date, price, cover_image_url, created_at, updated_at, description, format, duration)
VALUES 
(1, 'Nevermind', (SELECT artist_id FROM artists WHERE name = 'Nirvana' LIMIT 1), 1, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1991-09-24', 20.00, '/images/Nirvana – Nevermind (1).webp', NOW(), NOW(), 'Second studio album by the legendary American grunge band. Originally released in 1991, the album has been been remastered and re-released to mark the 20th Anniversary of its original release. Regarded as one of the most influential albums of all time, it includes the tracks 'Smells Like Teen Spirit', 'Come As You Are', 'Lithium' and 'In Bloom'.', 'Vinyl 12" LP', '42:59'),
(2, 'The Masterplan', (SELECT artist_id FROM artists WHERE name = 'Oasis' LIMIT 1), 2, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1998-11-17', 12.99, '/images/Oasis – The Masterplan (1).webp', NOW(), NOW(), 'Compilation album by the English rock band, originally released in 1998. It comprises B-sides which never made it onto an album up to that point, including fan favourites such as 'Acquiesce', 'Talk Tonight', 'Half the World Away' and 'The Masterplan'.', 'Vinyl 12" LP', '38:34'),
(3, 'OK Computer', (SELECT artist_id FROM artists WHERE name = 'Radiohead' LIMIT 1), 3, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '1997-05-21', 20.00, '/images/Radiohead – OK Computer.webp', NOW(), NOW(), 'OK Computer is Radiohead's third album. Originally released in 1997, following on from their second LP, The Bends, was always going to be a tall order, but they did it all right! A 1990s classic which houses the singles 'Paranoid Android', 'Karma Police' and 'Airbag', it's considered one of the greatest albums of all-time.', 'Vinyl 12" LP','53:10'),
(4, 'Saviors', (SELECT artist_id FROM artists WHERE name = 'Green Day' LIMIT 1), 4, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '2024-02-09', 10.00, '/images/Green-Day-Saviors.webp', NOW(), NOW(), 'Green Day’s 14th studio album, Saviors, kicks off with the fiery anthem The American Dream Is Killing Me, delivering a powerful message for troubled times. Featuring 15 tracks, including Look Ma, No Brains! and Father To A Son, this album is a raw, defiant soundtrack for today’s world. Recorded in London and LA with GRAMMY®-winning producer Rob Cavallo, Saviors proves Green Day is still pushing boundaries while honoring their legendary past.', 'Vinyl 12" LP', '35:24'),
(5, 'American Idiot', (SELECT artist_id FROM artists WHERE name = 'Green Day' LIMIT 1), 5, (SELECT genre_id FROM genres WHERE name = 'Alternative Rock' LIMIT 1), '2004-09-21', 20.00, '/images/Green Day – American Idiot (1).webp', NOW(), NOW(), 'The seventh studio album by Green Day, American Idiot, is a concept album dubbed a “punk rock opera.” It follows the story of Jesus of Suburbia, a lower-middle-class anti-hero, reflecting a generation’s disillusionment amid events like the Iraq War. Marking a career comeback, the album topped charts in 19 countries and sold 16 million copies worldwide, featuring five hit singles: American Idiot, Boulevard of Broken Dreams, Holiday, Wake Me Up When September Ends, and Jesus of Suburbia.', 'Vinyl 12" LP', '39:06'),
(6, 'Barbie the Album', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 6, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2023-07-21', 30.00, '/images/Original Soundtrack – Barbie the Album.webp', NOW(), NOW(), 'The 2023 Barbie film showcases a mesmerizing soundtrack that sets the perfect tone for this cinematic experience. With a diverse range of musical genres, including pop, rock, and ballads, the soundtrack captures the essence of each scene. Featuring artists such as featuring artists such as Tame Impala, Haim, Charli XCX, Ice Spice, Dua Lipa, Lizzo, Nicki Minaj, Pink Pantheress, Khalid, The Kid Laroi, Ava Max, Dominic Fike, Gayle, Kali, and Karol G.', 'Vinyl 12" LP', '45:30'),
(7, 'Guardians of the Galaxy - Awesome Mix 1', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 7, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2014-07-29', 40.00, '/images/Original Soundtrack – Guardians of the Galaxy - Awesome Mix 1.webp', NOW(), NOW(), 'Soundtrack album for the Marvel Studios film 'Guardians of the Galaxy', featuring the songs present on Peter Quill's mixtape in the film. Featuring classic 1970's songs from the movie including Blue Swede's 'Hooked on a Feeling', David Bowie's 'Moonage Daydream', Norman Greenbaum's 'Spirit in the Sky', Redbone's 'Come and Get Your Love', The Runaways' 'Cherry Bomb' and more!', 'Vinyl 12" LP', '44:15'),
(8, 'Pulp Fiction', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 8, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '1994-09-27', 40.00, '/images/Original Soundtrack – Pulp Fiction.webp', NOW(), NOW(), 'Dive into the eclectic soundscape of Quentin Tarantino’s Pulp Fiction! This iconic soundtrack blends rock, surf, and soul, featuring classic hits like “Misirlou” by Dick Dale and “Son of a Preacher Man” by Dusty Springfield. It’s the perfect companion to the film’s stylish storytelling.', 'Vinyl 12" LP', '41:20'),
(9, 'The Greatest Showman', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 9, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2017-12-08', 25.00, '/images/Motion Picture Cast Recording – The Greatest Showman.webp', NOW(), NOW(), 'Soundtrack album to the film of the same name, which peaked at #1 in the UK Albums Charts, and features the hit single 'This Is Me'.', 'Vinyl 12" LP', '44:25'),
(10, 'Baby Driver', (SELECT artist_id FROM artists WHERE name = 'Various Artists' LIMIT 1), 10, (SELECT genre_id FROM genres WHERE name = 'Soundtrack' LIMIT 1), '2017-07-23', 35.00, '/images/Original Soundtrack – Baby Driver.webp', NOW(), NOW(), 'Experience the pulse-pounding beats of Baby Driver! This soundtrack is a masterful collection of tracks that drive the film’s thrilling car chases and heartwarming moments. Featuring artists like Simon & Garfunkel and T. Rex, it’s a sonic joyride you won’t want to miss.', 'Vinyl 12" LP', '36:32'),
(11, 'Sweetener', (SELECT artist_id FROM artists WHERE name = 'Ariana Grande' LIMIT 1), 11, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2018-08-17', 30.00, '/images/Ariana Grande – Sweetener.webp', NOW(), NOW(), 'The fourth studio album by the American singer. Features the singles 'No Tears Left to Cry', 'God Is a Woman' and 'Breathin'.', 'Vinyl 12" LP', '41:17'),
(12, 'Rumors', (SELECT artist_id FROM artists WHERE name = 'Fleetwood Mac' LIMIT 1), 12, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '1977-02-04', 50.00, '/images/Fleetwood Mac – Rumors.webp', NOW(), NOW(), 'Celebrate the timeless magic of Fleetwood Mac’s Rumours! This landmark album is filled with heartfelt anthems like “Go Your Own Way” and “Dreams,” capturing the essence of love and heartbreak. A must-have for any vinyl collection!', 'Vinyl 12" LP', '39:25'),
(13, 'Thriller', (SELECT artist_id FROM artists WHERE name = 'Michael Jackson' LIMIT 1), 13, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '1982-11-30', 50.00, '/images/Michael Jackson – Thriller.webp', NOW(), NOW(), ''Thriller' is the sixth studio album by American singer Michael Jackson, released on November 30, 1982. 'Thriller' is a conceptual classic which has sold over 110 million copies - the highest-selling album of all time - and his combined sales top 750 million worldwide. Smash hits include title track 'Thriller', 'Billie Jean' and 'Beat It'.', 'Vinyl 12" LP', '42:57'),
(14, 'Short n’ Sweet', (SELECT artist_id FROM artists WHERE name = 'Sabrina Carpenter' LIMIT 1), 14, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2023-09-22', 10.00, '/images/Sabrina Carpenter – Short n’ Sweet.webp', NOW(), NOW(), ''Short n' Sweet' showcases the scintillating spirit of Sabrina Carpenter, the pocket-sized popstar with a larger-than-life artistic presence. One gold album and multiple platinum singles later, it's no wonder that 'Espresso', the debut single from the forthcoming album, has it all: lyrics that make you giggle and blush and songwriting that makes you wish you'd thought of it first.', 'Vinyl 12" LP', '32:00'),
(15, 'Brat', (SELECT artist_id FROM artists WHERE name = 'Charlie XCX' LIMIT 1), 15, (SELECT genre_id FROM genres WHERE name = 'Pop' LIMIT 1), '2023-10-26', 10.00, '/images/Charlie XCX – Brat.webp', NOW(), NOW(), 'BRAT is the highly anticipated follow-up to Charli XCX’s 2022 album CRASH, which topped the UK’s official album chart. This exhilarating club record blends high art references with social commentary, showcasing Charli’s status as an avant-pop and electronic superstar. Over her trailblazing career, she has become an iconic figure in the arts, earning critical acclaim for her innovative style and entrepreneurial spirit, and reshaping pop culture by seamlessly navigating between the underground and mainstream music scenes.', 'Vinyl 12" LP', '28:45'),
(16, 'The Dark Side of the Moon', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd' LIMIT 1), 16, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1973-03-01', 50.00, '/images/Pink Floyd – The Dark Side of the Moon.webp', NOW(), NOW(), 'This 2023 glow-in-the-dark vinyl issue is a tribute to Pink Floyd’s masterpiece, originally released in 2006. It features performances by notable musicians, including Adrian Belew, Robby Krieger (The Doors), Colin Moulding (XTC), and many more. Produced by Billy Sherwood of Yes, this limited edition is restricted to 1,000 units worldwide. Please note that due to the manufacturing process, the glow-in-the-dark vinyl may have noisy audio quality.', 'Vinyl 12" LP', '42:49'),
(17, 'Led Zeppelin IV', (SELECT artist_id FROM artists WHERE name = 'Led Zeppelin' LIMIT 1), 17, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1971-11-08', 50.00, '/images/Led Zepplin – Led zeppelin IV.webp', NOW(), NOW(), 'The fourth studio album by the English rock band. The album is notable for featuring 'Stairway to Heaven', which has been described as the band's signature song. Features the singles 'Black Dog', 'Misty Mountain Hop', 'Rock and Roll' and 'Four Sticks'.', 'Vinyl 12" LP', '43:09'),
(18, 'Abbey Road', (SELECT artist_id FROM artists WHERE name = 'The Beatles' LIMIT 1), 18, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1969-09-26', 50.00, '/images/The Beatle – Abby Road.webp', NOW(), NOW(), 'Features the 2019 stereo album mix, sourced directly from the original eight-track session tapes. To produce the mix, Giles Martin working with Sam Okell, was guided by the album's original stereo mix supervised by his father, George Martin.', 'Vinyl 12" LP', '47:23'),
(19, 'Hotel California', (SELECT artist_id FROM artists WHERE name = 'Eagles' LIMIT 1), 19, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1976-12-08', 30.00, '/images/Eagles – Hotel California.webp', NOW(), NOW(), 'The fifth studio album by the American rock band. Features the singles 'New Kid in Town', 'Hotel California' and 'Life in the Fast Lane'.', 'Vinyl 12" LP', '43:28'),
(20, 'The Wall', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd' LIMIT 1), 20, (SELECT genre_id FROM genres WHERE name = 'Rock' LIMIT 1), '1979-11-30', 50.00, '/images/Pink Floyd – The Wall.webp', NOW(), NOW(), 'The eleventh studio album by the English progressive rock band. It is a rock opera that explores Pink, a jaded rockstar whose eventual self-imposed isolation from society is symbolized by a wall. Features the singles 'Another Brick in the Wall, Part 2', 'Run Like Hell' and 'Comfortably Numb'.', 'Vinyl 12" LP', '81:10'),
(21, 'Get Rich or Die Tryin’', (SELECT artist_id FROM artists WHERE name = '50 Cent' LIMIT 1), 21, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2003-02-06', 30.00, '/images/50 Cent – Get Rich or Die Tryin’.webp', NOW(), NOW(), 'Get Rich or Die Tryin’ is the debut studio album by American rapper 50 Cent, released on February 4, 2003, through Aftermath Entertainment in collaboration with Shady Records and Interscope Records. Initially delayed due to bootlegging, the album showcases 50 Cent’s relentless drive and talent, featuring the hit single In Da Club, produced by Dr. Dre. It includes production from Dr. Dre and Eminem, along with guest appearances from Eminem, Young Buck, Lloyd Banks, and Tony Yayo, setting the stage for hip-hop in the coming years.', 'LPVinyl 12" LP', '58:23'),
(22, 'To Pimp a Butterfly', (SELECT artist_id FROM artists WHERE name = 'Kendrick Lamar' LIMIT 1), 22, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2015-03-15', 40.00, '/images/Kendrick Lamar – To Pimp a Butterfly.jpg', NOW(), NOW(), 'Third studio album by the American rapper. Featuring the singles 'i', 'King Kunta' and 'The Blacker the Berry' featuring Assassin, the album debuted at #1 in the UK Albums Chart.', 'Vinyl 12" LP', '78:00'),
(23, 'The Blueprint', (SELECT artist_id FROM artists WHERE name = 'Jay-Z' LIMIT 1), 23, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2001-09-11', 40.00, '/images/Jay-Z – The Blueprint.webp', NOW(), NOW(), 'Sixth studio album by the American rapper. Contrasting the radio-friendly sound of Jay-Z's previous work, 'The Blueprint' features soul-based sampling and production handled primarily by Kanye West, Just Blaze, and Bink, as well as Timbaland, Trackmasters, and Eminem, who also contributes the album's sole guest feature.', 'Vinyl 12" LP', '62:21'),
(24, 'The Marshall Mathers LP', (SELECT artist_id FROM artists WHERE name = 'Eminem' LIMIT 1), 24, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '2000-05-23', 40.00, '/images/Eminem – The Marshall Mathers LP.jpg', NOW(), NOW(), 'The third studio album by Eminem, The Marshall Mathers LP, was originally released in May 2000. Produced primarily by Dr. Dre and Eminem, along with The 45 King, the Bass Brothers, and Mel-Man, the album showcases more introspective lyricism, reflecting on his sudden rise to fame and the controversies surrounding his lyrics. It features hit singles such as The Real Slim Shady, The Way I Am, Stan, I’m Back, and Bitch Please II. The album solidified Eminem’s status as a leading figure in hip-hop.', 'Vinyl 12" Vinyl 12" LP', '63:08'),
(25, 'Ready to Die', (SELECT artist_id FROM artists WHERE name = 'The Notorious B.I.G.' LIMIT 1), 25, (SELECT genre_id FROM genres WHERE name = 'Hip-hop' LIMIT 1), '1994-09-13', 40.00, '/images/The Notorious B.I.G. – Ready to Die.webp', NOW(), NOW(), 'Originally released on 13th September 1994, 'Ready to Die' is the debut studio album from hip-hop legend, The Notorious B.I.G. Upon release, the album was met with widespread critical acclaim, with Pitchfork giving it a 10/10 rating along with various other critics praising it for its brutally honest depiction of gang violence and conflict as opposed to the often-glorified portrayal in the genre and the wider media.', 'Vinyl 12" LP', '49:48');



-- Insert Inventory
INSERT INTO inventory (product_id, stock_quantity, created_at, updated_at)
SELECT product_id, 100, NOW(), NOW()
FROM products;