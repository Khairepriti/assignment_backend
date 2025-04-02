import express from "express";
import { getProducts, createProduct, updateExistingProduct, deleteProduct,getProductsById } from "../controllers/productController";
import upload from "../middleware/multer"; // Import multer config

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/getProductById", getProductsById);

router.post("/products",upload.array("files", 5), createProduct); // Use multer middleware for file upload
router.put("/products/updateProduct/:id",upload.array("files", 5), updateExistingProduct);
router.delete("/products/:id", deleteProduct);

export default router;
