import express from "express";
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../controllers/productController.js";

// import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// router.post('/', verifyToken, isAdmin, createProduct);
// router.put('/:id', verifyToken, isAdmin, updateProduct);
// router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;
