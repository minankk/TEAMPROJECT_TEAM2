/*
Pre-requisite 
Install mysql work bench
Create new Connection
Add a new schema name - vinyl database
    
*/

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


-- Creating the database
CREATE DATABASE Team_Project;
USE Team_Project;

-- Create genres table
CREATE TABLE genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(255) UNIQUE NOT NULL
);

-- Create artists table
CREATE TABLE artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    profile_picture_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Genres
INSERT INTO genres (genre_name) VALUES 
('Alternative Rock'), 
('Soundtrack'), 
('Pop'), 
('Rock'), 
('Hip-hop');

-- Insert Artists
INSERT INTO artists (name) VALUES 
('Nirvana'), ('Oasis'), ('Radiohead'), ('Green Day'), ('Barbie the Album'),
('Guardians of the Galaxy - Awesome Mix 1'), ('Pulp Fiction'), ('The Greatest Showman'),
('Baby Driver'), ('Ariana Grande'), ('Fleetwood Mac'), ('Michael Jackson'),
('Sabrina Carpenter'), ('Charlie XCX – Brat'), ('Pink Floyd'), ('Led Zeppelin'),
('The Beatles'), ('Eagles'), ('50 Cent'), ('Kendrick Lamar'), ('Jay-Z'), ('Eminem'),
('The Notorious B.I.G.');

-- Creating the products table
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    artist_id INT,
    genre_id INT,
    release_date DATE,
    price DECIMAL(10,2),
    cover_image_url TEXT,
    type VARCHAR(50),
    best_sellers TINYINT(1) DEFAULT 0,  
    sale TINYINT(1) DEFAULT 0,  
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id) ON DELETE CASCADE
);

-- Insert data into the products table
INSERT INTO products (product_name, artist_id, genre_id, release_date, price, cover_image_url, type, best_sellers, sale)
VALUES 
('Nevermind', (SELECT artist_id FROM artists WHERE name = 'Nirvana'), (SELECT genre_id FROM genres WHERE genre_name = 'Alternative Rock'), '1991-09-24', 15.00, 'Backend\data\images\Nirvana – Nevermind (1).webp', 'full album', 1, 0),
('The Masterplan', (SELECT artist_id FROM artists WHERE name = 'Oasis'), (SELECT genre_id FROM genres WHERE genre_name = 'Alternative Rock'), '1998-11-17', 12.99, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Oasis – The Masterplan (1).webp', 'single', 0, 1),
('OK Computer', (SELECT artist_id FROM artists WHERE name = 'Radiohead'), (SELECT genre_id FROM genres WHERE genre_name = 'Alternative Rock'), '1997-05-21', 15.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Radiohead – OK Computer.webp', 'full album', 1, 0),
('Saviors', (SELECT artist_id FROM artists WHERE name = 'Green Day'), (SELECT genre_id FROM genres WHERE genre_name = 'Alternative Rock'), '2024-02-09', 5.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Green-Day-Saviors.webp', 'single', 0, 0),
('American Idiot', (SELECT artist_id FROM artists WHERE name = 'Green Day'), (SELECT genre_id FROM genres WHERE genre_name = 'Alternative Rock'), '2004-09-21', 15.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Green Day – American Idiot (1).webp', 'full album', 0, 0),
('Barbie the Album', (SELECT artist_id FROM artists WHERE name = 'Barbie the Album'), (SELECT genre_id FROM genres WHERE genre_name = 'Soundtrack'), '2023-07-21', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Original Soundtrack – Barbie the Album.webp', 'full album', 0, 0),
('Guardians of the Galaxy - Awesome Mix 1', (SELECT artist_id FROM artists WHERE name = 'Guardians of the Galaxy - Awesome Mix 1'), (SELECT genre_id FROM genres WHERE genre_name = 'Soundtrack'), '2014-07-29', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Original Soundtrack – Guardians of the Galaxy - Awesome Mix 1.webp', 'full album', 1, 0),
('Pulp Fiction', (SELECT artist_id FROM artists WHERE name = 'Pulp Fiction'), (SELECT genre_id FROM genres WHERE genre_name = 'Soundtrack'), '1994-09-27', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Original Soundtrack – Pulp Fiction.webp', 'full album', 0, 0),
('The Greatest Showman', (SELECT artist_id FROM artists WHERE name = 'The Greatest Showman'), (SELECT genre_id FROM genres WHERE genre_name = 'Soundtrack'), '2017-12-08', 15.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Motion Picture Cast Recording – The Greatest Showman.webp', 'full album', 0, 0),
('Baby Driver', (SELECT artist_id FROM artists WHERE name = 'Baby Driver'), (SELECT genre_id FROM genres WHERE genre_name = 'Soundtrack'), '2017-07-23', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Original Soundtrack – Baby Driver.webp', 'full album', 0, 0),
('Sweetener', (SELECT artist_id FROM artists WHERE name = 'Ariana Grande'), (SELECT genre_id FROM genres WHERE genre_name = 'Pop'), '2018-08-17', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Ariana Grande – Sweetener.webp', 'full album', 0, 0),
('Rumors', (SELECT artist_id FROM artists WHERE name = 'Fleetwood Mac'), (SELECT genre_id FROM genres WHERE genre_name = 'Pop'), '1977-02-04', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Fleetwood Mac – Rumors.webp', 'full album', 1, 0),
('Thriller', (SELECT artist_id FROM artists WHERE name = 'Michael Jackson'), (SELECT genre_id FROM genres WHERE genre_name = 'Pop'), '1982-11-30', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Michael Jackson – Thriller.webp', 'full album', 0, 0),
('Short n’ Sweet', (SELECT artist_id FROM artists WHERE name = 'Sabrina Carpenter'), (SELECT genre_id FROM genres WHERE genre_name = 'Pop'), '2023-09-22', 5.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Sabrina Carpenter – Short n’ Sweet.webp', 'single', 1, 0),
('Brat', (SELECT artist_id FROM artists WHERE name = 'Charlie XCX – Brat'), (SELECT genre_id FROM genres WHERE genre_name = 'Pop'), '2023-10-26', 5.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Charlie XCX – Brat.webp', 'single', 0, 0),
('The Dark Side of the Moon', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd'), (SELECT genre_id FROM genres WHERE genre_name = 'Rock'), '1973-03-01', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Pink Floyd – The Dark Side of the Moon.webp', 'full album', 1, 0),
('Led Zeppelin IV', (SELECT artist_id FROM artists WHERE name = 'Led Zeppelin'), (SELECT genre_id FROM genres WHERE genre_name = 'Rock'), '1971-11-08', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Led Zepplin – Led zeppelin IV.webp', 'full album', 0, 0),
('Abby Road', (SELECT artist_id FROM artists WHERE name = 'The Beatles'), (SELECT genre_id FROM genres WHERE genre_name = 'Rock'), '1969-09-26', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\The Beatle – Abby Road.webp', 'full album', 1, 0),
('Hotel California', (SELECT artist_id FROM artists WHERE name = 'Eagles'), (SELECT genre_id FROM genres WHERE genre_name = 'Rock'), '1976-12-08', 15.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Eagles – Hotel California.webp', 'full album', 0, 0),
('The Wall', (SELECT artist_id FROM artists WHERE name = 'Pink Floyd'), (SELECT genre_id FROM genres WHERE genre_name = 'Rock'), '1979-11-30', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Pink Floyd – The Wall.webp', 'full album', 0, 0),
('Get Rich or Die Tryin’', (SELECT artist_id FROM artists WHERE name = '50 Cent'), (SELECT genre_id FROM genres WHERE genre_name = 'Hip-hop'), '2003-02-06', 15.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\50 Cent – Get Rich or Die Tryin’.webp', 'full album', 0, 0),
('To Pimp a Butterfly', (SELECT artist_id FROM artists WHERE name = 'Kendrick Lamar'), (SELECT genre_id FROM genres WHERE genre_name = 'Hip-hop'), '2015-03-15', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Kendrick Lamar – To Pimp a Butterfly.jpg', 'full album', 0, 0),
('The Blueprint', (SELECT artist_id FROM artists WHERE name = 'Jay-Z'), (SELECT genre_id FROM genres WHERE genre_name = 'Hip-hop'), '2001-09-11', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Jay-Z – The Blueprint.webp', 'full album', 0, 0),
('The Eminem Show', (SELECT artist_id FROM artists WHERE name = 'Eminem'), (SELECT genre_id FROM genres WHERE genre_name = 'Hip-hop'), '2002-05-28', 20.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\Eminem – The Eminem Show.webp', 'full album', 0, 0),
('Ready to Die', (SELECT artist_id FROM artists WHERE name = 'The Notorious B.I.G.'), (SELECT genre_id FROM genres WHERE genre_name = 'Hip-hop'), '1994-09-13', 15.00, 'C:\\Users\\Asus\\TEAMPROJECT_TEAM2\\Backend\\data\\images\\The Notorious B.I.G. – Ready to Die.webp', 'full album', 0, 0);

