import { Router } from "express";
import { Create, Delete, FindAll, FindOne, Update } from "../controllers/category.controller.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

let CategoryRoute = Router();

/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: Barcha kategoriyalarni olish
 *     responses:
 *       200:
 *         description: Kategoriyalar ro'yxati
 */
CategoryRoute.get("/category/all", FindAll);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Bitta kategoriyani olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kategoriya ma'lumotlari
 */
CategoryRoute.get("/category/:id", FindOne);

/**
 * @swagger
 * /category/{id}:
 *   post:
 *     summary: Yangi kategoriya yaratish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Yangi kategoriya yaratildi
 */
CategoryRoute.post("/category/:id", Create);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Kategoriya ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kategoriya yangilandi
 */
CategoryRoute.patch("/category/:id", Update);

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Kategoriya o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kategoriya o'chirildi
 */
CategoryRoute.delete("/category/:id", Delete);

export default CategoryRoute;
