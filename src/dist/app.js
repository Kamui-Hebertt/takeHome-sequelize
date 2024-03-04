"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // Import the cors package
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Enable CORS for all routes
app.use((0, cors_1.default)());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/products', authMiddleware_1.verifyToken, productRoutes_1.default);
const PORT = process.env.PORT || 3334;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// "start": "ts-node src/app.ts",
