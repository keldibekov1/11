import { Router } from "express";
import { Create, Delete, FindAll, FindOne, Update } from "../controllers/category.item.controller.js";
// import passedRole from "../middleware/rolePolice.js"
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import passedRole from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";
import verifyToken from "../middleware/verifyToken.js";


let CategoryItemRoute = Router();

/**
 * @swagger
 * /api/category_item/all:
 *   get:
 *     summary: Barcha kategoriya elementlarini olish
 *     responses:
 *       200:
 *         description: Kategoriya elementlari ro'yxati
 */
CategoryItemRoute.get("/category_item/all", FindAll);

/**
 * @swagger
 * /api/category_item/{id}:
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
 * /api/create_item:
 *   post:
 *     summary: Yangi kategoriya elementi yaratish
 *     responses:
 *       201:
 *         description: Yangi kategoriya elementi yaratildi
 */
CategoryItemRoute.post("/create_item",selfPolice,passedRole,verifyToken,Create);

/**
 * @swagger
 * /api/category_item/{id}:
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
CategoryItemRoute.patch("/category_item/:id",selfPolice,passedRole,verifyToken, Update);

/**
 * @swagger
 * /api/category_item/{id}:
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
CategoryItemRoute.delete("/category_item/:id",selfPolice,passedRole,verifyToken, Delete);

export default CategoryItemRoute;
