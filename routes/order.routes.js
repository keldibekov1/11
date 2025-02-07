import { Router } from "express";
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} from "../controllers/order.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const OrderRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Buyurtmalarni boshqarish
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Barcha buyurtmalarni olish
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Buyurtmalar ro‘yxati qaytarildi
 */
OrderRoute.get("/orders", verifyToken, getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: ID bo‘yicha bitta buyurtmani olish
 *     tags: [Orders]
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
 *         description: Buyurtma topildi
 *       404:
 *         description: Buyurtma topilmadi
 */
OrderRoute.get("/orders/:id", verifyToken, getOrderById);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Yangi buyurtma yaratish
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               total_price:
 *                 type: number
 *                 example: 500000
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 2
 *                     quantity:
 *                       type: integer
 *                       example: 1
 *                     totalSum:
 *                       type: number
 *                       example: 250000
 *     responses:
 *       201:
 *         description: Yangi buyurtma yaratildi
 *       400:
 *         description: Noto‘g‘ri so‘rov
 */
OrderRoute.post("/orders", verifyToken, createOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: Buyurtmani yangilash
 *     tags: [Orders]
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
 *               total_price:
 *                 type: number
 *                 example: 550000
 *     responses:
 *       200:
 *         description: Buyurtma yangilandi
 *       400:
 *         description: Noto‘g‘ri so‘rov
 *       404:
 *         description: Buyurtma topilmadi
 */
OrderRoute.patch("/orders/:id", verifyToken, updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Buyurtmani o‘chirish
 *     tags: [Orders]
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
 *         description: Buyurtma o‘chirildi
 *       404:
 *         description: Buyurtma topilmadi
 */
OrderRoute.delete("/orders/:id", verifyToken, deleteOrder);

export default OrderRoute;
