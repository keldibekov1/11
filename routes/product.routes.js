import { Router } from "express";
import multer from "../middleware/upload.js"; // Multer middleware'ni import qilamiz
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product with an image to the catalog.
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/", multer.single("image"), createProduct); // "image" nomli faylni yuklaymiz

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products in the catalog.
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a specific product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Update a product
 *     description: Update the details of a specific product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.patch("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a specific product from the catalog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/:id", deleteProduct);

export default router;
