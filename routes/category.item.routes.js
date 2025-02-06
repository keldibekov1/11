import { Router } from "express";
import { Create, Delete, FindAll, FindOne, Update } from "../controllers/category.item.controller.js";
import passedRole from "../middleware/rolePolice.js"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

let CategoryItemRoute = Router();

/**
 * @swagger
 * /category_item/all:
 *   get:
 *     summary: Barcha kategoriya elementlarini olish
 *     responses:
 *       200:
 *         description: Kategoriya elementlari ro'yxati
 */
CategoryItemRoute.get("/category_item/all", FindAll);

/**
 * @swagger
 * /category_item/{id}:
 *   get:
 *     summary: Bitta kategoriya elementini olish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kategoriya elementi ma'lumotlari
 */
CategoryItemRoute.get("/category_item/:id", FindOne);

/**
 * @swagger
 * /create_item:
 *   post:
 *     summary: Yangi kategoriya elementi yaratish
 *     responses:
 *       201:
 *         description: Yangi kategoriya elementi yaratildi
 */
CategoryItemRoute.post("/create_item",Create);

/**
 * @swagger
 * /category_item/{id}:
 *   patch:
 *     summary: Kategoriya elementi ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kategoriya elementi yangilandi
 */
CategoryItemRoute.patch("/category_item/:id", Update);

/**
 * @swagger
 * /category_item/{id}:
 *   delete:
 *     summary: Kategoriya elementini o'chirish
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kategoriya elementi o'chirildi
 */
CategoryItemRoute.delete("/category_item/:id", Delete);

export default CategoryItemRoute;
