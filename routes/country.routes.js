import { Router } from "express";
import { FindAll, FindOne, Create, Update, Delete } from "../controllers/country.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const CountryRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Mamlakatlar ma'lumotlarini boshqarish
 */

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Barcha mamlakatlarni olish
 *     tags: [Country]
 *     responses:
 *       200:
 *         description: Ro‘yxat qaytarildi
 */
CountryRoute.get("/countries", FindAll);

/**
 * @swagger
 * /api/countries/{id}:
 *   get:
 *     summary: ID bo‘yicha bitta mamlakatni olish
 *     tags: [Country]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mamlakat ma’lumotlari
 *       404:
 *         description: Topilmadi
 */
CountryRoute.get("/countries/:id", FindOne);

/**
 * @swagger
 * /api/countries:
 *   post:
 *     summary: Yangi mamlakat yaratish
 *     tags: [Country]
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
 *                 example: "O‘zbekiston"
 *               name_ru:
 *                 type: string
 *                 example: "Узбекистан"
 *     responses:
 *       201:
 *         description: Yaratildi
 *       400:
 *         description: Noto‘g‘ri so‘rov
 */
CountryRoute.post("/countries", verifyToken, Create);

/**
 * @swagger
 * /api/countries/{id}:
 *   patch:
 *     summary: Mamlakatni yangilash
 *     tags: [Country]
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
 *                 example: "Tojikiston"
 *               name_ru:
 *                 type: string
 *                 example: "Таджикистан"
 *     responses:
 *       200:
 *         description: Yangilandi
 *       400:
 *         description: Noto‘g‘ri so‘rov
 *       404:
 *         description: Topilmadi
 */
CountryRoute.patch("/countries/:id", verifyToken, Update);

/**
 * @swagger
 * /api/countries/{id}:
 *   delete:
 *     summary: Mamlakatni o‘chirish
 *     tags: [Country]
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
CountryRoute.delete("/countries/:id", verifyToken, Delete);

export default CountryRoute;
