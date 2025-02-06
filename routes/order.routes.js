import express from "express";
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/order.controller.js';
import passedRole from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";
import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order in the system.
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/",selfPolice,passedRole,verifyToken, createOrder);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve all orders in the system.
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieve a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: Update an order
 *     description: Update the details of an existing order.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.patch("/:id",selfPolice,passedRole,verifyToken, updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     description: Delete an order from the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/:id",selfPolice,passedRole,verifyToken, deleteOrder);

export default router;
