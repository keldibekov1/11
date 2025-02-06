import express from "express";
import {
  createOrderItem,
  getAllOrderItems,
  getOrderItemByOrderId,
  updateOrderItem,
  deleteOrderItem,
} from "../controllers/orderItemController.js";
import passedRole from "../middleware/rolePolice.js";
import selfPolice from "../middleware/selfPolice.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * /api/order-items:
 *   post:
 *     summary: Create a new order item
 *     description: Add a new item to an order.
 *     responses:
 *       201:
 *         description: Order item created successfully
 */
router.post("/",selfPolice,passedRole,verifyToken, createOrderItem);

/**
 * @swagger
 * /api/order-items:
 *   get:
 *     summary: Get all order items
 *     description: Retrieve all order items.
 *     responses:
 *       200:
 *         description: List of all order items
 */
router.get("/", getAllOrderItems);

/**
 * @swagger
 * /api/order-items/{order_id}:
 *   get:
 *     summary: Get order items by order ID
 *     description: Retrieve all items associated with a specific order ID.
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         description: Order ID to get related order items
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of order items for the specified order
 *       404:
 *         description: Order not found
 */
router.get("/:order_id", getOrderItemByOrderId);

/**
 * @swagger
 * /api/order-items/{id}:
 *   patch:
 *     summary: Update an order item
 *     description: Update the details of a specific order item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       404:
 *         description: Order item not found
 */
router.patch("/:id",selfPolice,passedRole,verifyToken, updateOrderItem);

/**
 * @swagger
 * /api/order-items/{id}:
 *   delete:
 *     summary: Delete an order item
 *     description: Delete a specific order item.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 */
router.delete("/:id",selfPolice,passedRole,verifyToken, deleteOrderItem);

export default router;
