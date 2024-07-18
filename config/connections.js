// Import the Sequelize library to interface with your database.
const Sequelize = require('sequelize');

// Load environment variables from the .env file into process.env.
require('dotenv').config();

// Configure and create a Sequelize instance to connect to your PostgreSQL database
const sequelize = process.env.DB_URL
  // Check if a full database URL is provided.
  ? new Sequelize(process.env.DB_URL)  // If DB_URL is provided, use it directly to create a Sequelize instance
  : new Sequelize(  // If DB_URL is not provided, construct the connection from individual components
    process.env.DB_NAME,  // Database name
    process.env.DB_USER,  // Database username
    process.env.DB_PASSWORD,  // Database password
    {
      host: process.env.DB_HOST || 'localhost',  // Database host, defaulting to 'localhost' if not specified
      dialect: 'postgres',  // Specifies the database dialect to be used (postgres in this case)
      port: process.env.DB_PORT || 5432,  // Database port, defaulting to PostgreSQL's default port 5432 if not specified
      logging: false,  // Controls the logging of SQL queries (set to false to disable, true to enable)
    }
  );

// Export the configured Sequelize instance for use in other parts of the application
module.exports = sequelize;
