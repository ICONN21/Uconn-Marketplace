DROP DATABASE IF EXISTS uconn_db;
CREATE DATABASE uconn_db;

-- \c uconn_db;

-- CREATE TABLE item (
--   id INTEGER NOT NULL,
--   image VARCHAR(60) NOT NULL,
--   item_title VARCHAR(30) NOT NULL,
--   item_description TEXT NOT NULL,
--   date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );

-- CREATE TABLE favorites (
--   id INTEGER NOT NULL,
--   image VARCHAR(60) NOT NULL,
--   item_title VARCHAR(30) NOT NULL,
--   item_description TEXT NOT NULL,
--   date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );

-- CREATE TABLE users (
--   id INTEGER NOT NULL,
--   user_name VARCHAR(30) NOT NULL,
--   user_password VARCHAR(20) NOT NULL,
--   date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );