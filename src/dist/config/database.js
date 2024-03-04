"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.POSTGRES_DATABASE || "elitypescript", process.env.POSTGRES_USER || "eli", process.env.POSTGRES_PASSWORD || "", {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 100,
        min: 0,
        idle: 200000,
        acquire: 1000000,
    },
});
exports.default = sequelize;
