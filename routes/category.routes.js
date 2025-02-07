//category.routes.js
import { Router } from "express";
import { Create, Delete, FindAll, FindOne, Update } from "../controllers/category.controller.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


import verifyToken from "../middleware/verifyToken.js";


const CategoryRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Kategoriya boshqaruvi
 */

/**
 * @swagger
 * /api/category/all:
 *   get:
 *     summary: Barcha kategoriyalarni olish
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Kategoriyalar ro'yxati
 */
CategoryRoute.get("/category/all", FindAll);

/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     summary: Bitta kategoriyani olish
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kategoriya ma'lumotlari
 *       404:
 *         description: Kategoriya topilmadi
 */
CategoryRoute.get("/category/:id", FindOne);

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Yangi kategoriya yaratish
 *     tags: [Category]
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
 *                 example: "Elektronika"
 *               name_ru:
 *                 type: string
 *                 example: "Электроника"
 *               image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       201:
 *         description: Yangi kategoriya yaratildi
 *       400:
 *         description: Ma’lumot yetarli emas
 */
CategoryRoute.post("/category", verifyToken, Create);

/**
 * @swagger
 * /api/category/{id}:
 *   patch:
 *     summary: Kategoriya ma'lumotlarini yangilash
 *     tags: [Category]
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
 *                 example: "Yangilangan nom"
 *               name_ru:
 *                 type: string
 *                 example: "Обновленное название"
 *               image:
 *                 type: string
 *                 example: "https://example.com/new-image.jpg"
 *     responses:
 *       200:
 *         description: Kategoriya yangilandi
 *       400:
 *         description: Ma’lumot yetarli emas
 *       404:
 *         description: Kategoriya topilmadi
 */
CategoryRoute.patch("/category/:id", verifyToken, Update);

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: Kategoriya o'chirish
 *     tags: [Category]
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
 *         description: Kategoriya o‘chirildi
 *       404:
 *         description: Kategoriya topilmadi
 */
CategoryRoute.delete("/category/:id", verifyToken, Delete);

export default CategoryRoute;