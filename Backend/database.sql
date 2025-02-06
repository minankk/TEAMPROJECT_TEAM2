/*
Pre-requisite 
Install mysql work bench
Create new Connection
Add a new schema name - vinyl database
    
*/

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
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