CREATE DATABASE users_database;


CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(300) UNIQUE,
    PASSWORD VARCHAR(100)
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