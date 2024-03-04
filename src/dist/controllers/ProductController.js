"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const formatProductDetails = (product) => {
    if (typeof product === 'string' || typeof product === 'number') {
        return product;
    }
    return {
        id: product.id,
        name: product.name,
        details: {
            brand: product.brand,
            model: product.model,
            color: product.color
        },
        price: product.price,
    };
};
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll();
        const formattedProducts = products.map(formatProductDetails);
        res.json(formattedProducts);
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, price } = req.body;
        const product = yield Product_1.default.create({
            name,
            brand: details.brand,
            model: details.model,
            color: details.color,
            price
        });
        res.status(201).json(formatProductDetails(product));
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = parseInt(req.params.id, 10);
        const product = yield Product_1.default.findByPk(productId);
        console.log(product);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(formatProductDetails(product));
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, details, price } = req.body;
    try {
        const product = yield Product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        yield product.update({
            name,
            brand: details.brand,
            model: details.model,
            color: details.color,
            price
        });
        res.json(formatProductDetails(product));
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield Product_1.default.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        yield product.destroy();
        res.status(204).end();
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.deleteProduct = deleteProduct;
