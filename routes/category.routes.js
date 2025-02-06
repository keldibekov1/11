import { Router } from "express";
import { Create, Delete, FindAll, FindOne, Update } from "../controllers/category.controller.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import passedRole from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";
import verifyToken from "../middleware/verifyToken.js";


let CategoryRoute = Router();

/**
 * @swagger
 * /api/category/all:
 *   get:
 *     summary: Barcha kategoriyalarni olish
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
 * /api/category/{id}:
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
CategoryRoute.post("/category",selfPolice,passedRole,verifyToken, Create);

/**
 * @swagger
 * /api/category/{id}:
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
CategoryRoute.patch("/category/:id",selfPolice,passedRole,verifyToken, Update);

/**
 * @swagger
 * /api/category/{id}:
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
CategoryRoute.delete("/category/:id",selfPolice,passedRole,verifyToken, Delete);

export default CategoryRoute;
