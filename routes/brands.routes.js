import { Router } from "express";
import { FindAll, FindOne, Create, Update, Delete } from "../controllers/brands.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const BrandsRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brendlar boshqaruvi
 */

/**
 * @swagger
 * /api/brands/all:
 *   get:
 *     summary: Barcha brendlarni olish
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Brendlar ro‘yxati
 */
BrandsRoute.get("/brands/all", FindAll);

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: ID bo‘yicha bitta brendni olish
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Brend ma’lumotlari
 *       404:
 *         description: Brend topilmadi
 */
BrandsRoute.get("/brands/:id", FindOne);

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Yangi brend yaratish
 *     tags: [Brands]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *                 example: "Samsung"
 *               name_ru:
 *                 type: string
 *                 example: "Самсунг"
 *               image:
 *                 type: string
 *                 example: "https://example.com/samsung.jpg"
 *     responses:
 *       201:
 *         description: Yangi brend yaratildi
 *       400:
 *         description: Ma’lumot yetarli emas
 */
BrandsRoute.post("/brands", verifyToken, Create);

/**
 * @swagger
 * /api/brands/{id}:
 *   patch:
 *     summary: Brend ma’lumotlarini yangilash
 *     tags: [Brands]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_uz:
 *                 type: string
 *                 example: "Samsung (New)"
 *               name_ru:
 *                 type: string
 *                 example: "Самсунг (новый)"
 *               image:
 *                 type: string
 *                 example: "https://example.com/samsung-new.jpg"
 *     responses:
 *       200:
 *         description: Brend yangilandi
 *       400:
 *         description: Ma’lumot yetarli emas
 *       404:
 *         description: Brend topilmadi
 */
BrandsRoute.patch("/brands/:id", verifyToken, Update);

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Brendni o‘chirish
 *     tags: [Brands]
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
 *         description: Brend o‘chirildi
 *       404:
 *         description: Brend topilmadi
 */
BrandsRoute.delete("/brands/:id", verifyToken, Delete);

export default BrandsRoute;
