import { Router } from "express";
import { Create, Delete, FindAll, FindOne, Update } from "../controllers/category.item.controller.js";
// import passedRole from "../middleware/rolePolice.js"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import verifyToken from "../middleware/verifyToken.js";

const CategoryItemRoute = Router();

/**
 * @swagger
 * tags:
 *   name: CategoryItem
 *   description: Kategoriya va mahsulot bog‘lanishini boshqarish
 */

/**
 * @swagger
 * /api/category-items:
 *   get:
 *     summary: Barcha kategoriya-mahsulot bog‘lanmalarini olish
 *     tags: [CategoryItem]
 *     responses:
 *       200:
 *         description: Ro‘yxat qaytarildi
 */
CategoryItemRoute.get("/category-items", FindAll);

/**
 * @swagger
 * /api/category-items/{id}:
 *   get:
 *     summary: ID bo‘yicha bitta bog‘lanmani olish
 *     tags: [CategoryItem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Bog‘lanma ma’lumotlari
 *       404:
 *         description: Topilmadi
 */
CategoryItemRoute.get("/category-items/:id", FindOne);

/**
 * @swagger
 * /api/category-items:
 *   post:
 *     summary: Yangi kategoriya-mahsulot bog‘lanishini yaratish
 *     tags: [CategoryItem]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               product_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Yaratildi
 *       400:
 *         description: Noto‘g‘ri so‘rov
 */
CategoryItemRoute.post("/category-items", verifyToken, Create);

/**
 * @swagger
 * /api/category-items/{id}:
 *   patch:
 *     summary: Bog‘lanmani yangilash
 *     tags: [CategoryItem]
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
 *               category_id:
 *                 type: integer
 *                 example: 2
 *               product_id:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Noto‘g‘ri so‘rov
 *       404:
 *         description: Topilmadi
 */
CategoryItemRoute.patch("/category-items/:id", verifyToken, Update);

/**
 * @swagger
 * /api/category-items/{id}:
 *   delete:
 *     summary: Bog‘lanmani o‘chirish
 *     tags: [CategoryItem]
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
 *         description: O‘chirildi
 *       404:
 *         description: Topilmadi
 */
CategoryItemRoute.delete("/category-items/:id", verifyToken, Delete);

export default CategoryItemRoute;