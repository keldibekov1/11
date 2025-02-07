import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductPage,
  getProductName,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Mahsulotlarni boshqarish
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Barcha mahsulotlarni olish
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Mahsulotlar ro‘yxati
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: ID bo‘yicha mahsulot olish
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mahsulot ma’lumotlari
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /api/products/page:
 *   get:
 *     summary: Sahifalangan mahsulotlar ro‘yxati
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Sahifalangan mahsulotlar
 */
router.get("/page", getProductPage);

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Nomi bo‘yicha mahsulot qidirish
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Qidiruv natijalari
 */
router.get("/search", getProductName);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Yangi mahsulot yaratish
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Mahsulot yaratildi
 */
router.post("/", verifyToken, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Mahsulotni yangilash
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mahsulot yangilandi
 */
router.put("/:id", verifyToken, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Mahsulotni o‘chirish
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mahsulot o‘chirildi
 */
router.delete("/:id", verifyToken, deleteProduct);

export default router;
