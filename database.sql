CREATE DATABASE users_database;


CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(300) NOT NULL,
    PASSWORD VARCHAR(100) NOT NULL
);

CREATE TABLE appointments
(
    appointment_id SERIAL PRIMARY KEY,
    firstname VARCHAR(150),
    lastname VARCHAR(150),
    phone VARCHAR(128),
    email VARCHAR(300),
    date VARCHAR(100),
    description VARCHAR(255)
);


INSERT INTO appointments
    (firstname, lastname, phone, email, date, description)
VALUES
    ('Mike', 'Herr', '000-000-0000', 'email@email.com', '07/15/21', 'Braces');