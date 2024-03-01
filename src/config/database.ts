import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE || "elitypescript",
  process.env.POSTGRES_USER || "eli",
  process.env.POSTGRES_PASSWORD || "",
  {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // You may need to set this to true in production
      }
    },
    pool: {
      max: 100,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    },
  }
);

export default sequelize;
