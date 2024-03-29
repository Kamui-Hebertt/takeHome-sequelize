"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const router = (0, express_1.Router)();
router.get('/', ProductController_1.getAllProducts);
router.get('/:id', ProductController_1.getProductById);
router.post('/', ProductController_1.createProduct);
router.put('/:id', ProductController_1.updateProduct);
router.delete('/:id', ProductController_1.deleteProduct);
exports.default = router;
