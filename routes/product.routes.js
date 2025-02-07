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

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Barcha mahsulotlarni olish
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
 *     responses:
 *       201:
 *         description: Mahsulot yaratildi
 */
router.post("/", createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Mahsulotni yangilash
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
router.put("/:id", updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Mahsulotni o‘chirish
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
router.delete("/:id", deleteProduct);

export default router;
