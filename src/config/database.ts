import { Sequelize } from 'sequelize';

// Use dotenv to load environment variables from .env file
require('dotenv').config();

// Extract the PostgreSQL URL from the environment variables
const postgresUrl = process.env.POSTGRES_URL;

if (!postgresUrl) {
  throw new Error('POSTGRES_URL is not defined in the environment variables');
}

// Create a new Sequelize instance using the PostgreSQL URL
const sequelize = new Sequelize(postgresUrl);

export default sequelize;
