    import { Router } from "express";
    import { Create, Delete, FindAll, FindOne, Update } from "../controllers/brands.controller.js";
    import swaggerJsDoc from "swagger-jsdoc";
    import swaggerUi from "swagger-ui-express";

    import passedRole from "../middleware/rolePolice.js";
    import selfPolice from "../middleware/selfPolice.js";
    import verifyToken from "../middleware/verifyToken.js";

    let BrandsRoute = Router();

    /**
     * @swagger
     * /api/brands/all:
     *   get:
     *     summary: Barcha brendlarni olish
     *     responses:
     *       200:
     *         description: Brendlar ro'yxati
     */
    BrandsRoute.get("/brands/all", FindAll);

    /**
     * @swagger
     * /api/brands/{id}:
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
     * /api/brands/create:
     *   post:
     *     summary: Yangi brend yaratish
     *     responses:
     *       201:
     *         description: Yangi brend yaratildi
     */
    BrandsRoute.post("/brands/create",selfPolice,passedRole,verifyToken, Create);

    /**
     * @swagger
     * /api/brands/{id}:
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
    BrandsRoute.patch("/brands/:id",selfPolice,passedRole,verifyToken, Update);

    /**
     * @swagger
     * /api/brands/{id}:
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
    BrandsRoute.delete("/brands/:id",selfPolice,passedRole,verifyToken, Delete);

    export default BrandsRoute;
