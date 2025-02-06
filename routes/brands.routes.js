    import { Router } from "express";
    import { Create, Delete, FindAll, FindOne, Update } from "../controllers/brands.controller.js";
    import swaggerJsDoc from "swagger-jsdoc";
    import swaggerUi from "swagger-ui-express";

    let BrandsRoute = Router();

    /**
     * @swagger
     * /brands/all:
     *   get:
     *     summary: Barcha brendlarni olish
     *     responses:
     *       200:
     *         description: Brendlar ro'yxati
     */
    BrandsRoute.get("/brands/all", FindAll);

    /**
     * @swagger
     * /brands/{id}:
     *   get:
     *     summary: Bitta brendni olish
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Brend ma'lumotlari
     */
    BrandsRoute.get("/brands/:id", FindOne);

    /**
     * @swagger
     * /brands/create:
     *   post:
     *     summary: Yangi brend yaratish
     *     responses:
     *       201:
     *         description: Yangi brend yaratildi
     */
    BrandsRoute.post("/brands/create", Create);

    /**
     * @swagger
     * /brands/{id}:
     *   patch:
     *     summary: Brend ma'lumotlarini yangilash
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Brend yangilandi
     */
    BrandsRoute.patch("/brands/:id", Update);

    /**
     * @swagger
     * /brands/{id}:
     *   delete:
     *     summary: Brendni o'chirish
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Brend o'chirildi
     */
    BrandsRoute.delete("/brands/:id", Delete);

    export default BrandsRoute;
