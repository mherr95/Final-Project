CREATE DATABASE users_database;


CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(300),
    PASSWORD VARCHAR(100)
);
