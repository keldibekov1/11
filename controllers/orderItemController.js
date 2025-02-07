// controllers/orderItemController.js
import db from "../config/db.js";

export const createOrderItem= async (req, res) => {
  const { product_id, order_id, count, total } = req.body;
  const query =
    "INSERT INTO orderItem (product_id, order_id, count, total) VALUES (?, ?, ?, ?)";
    
  try {
    const [result] = await db.execute(query, [
      product_id,
      order_id,
      count,
      total,
    ]);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Order item yaratishda xato", error });
  }
};

export const getAllOrderItems  = async (req, res) => {
  const query = "SELECT * FROM orderItem";
  try {
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Order itemlarni olishda xato", error });
  }
};

export const getOrderItemByOrderId  = async (req, res) => {
  const { order_id } = req.params;
  const query = "SELECT * FROM orderItem WHERE order_id = ?";

  try {
    const [results] = await db.execute(query, [order_id]);
    if (results.length === 0) {
      return res.status(404).json({ message: "Order itemlar topilmadi" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Order itemlarni olishda xato", error });
  }
};

export const updateOrderItem  = async (req, res) => {
  const { id } = req.params;
  const { count, total } = req.body;
  const query = "UPDATE orderItem SET count = ?, total = ? WHERE id = ?";

  try {
    const [result] = await db.execute(query, [count, total, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order item topilmadi" });
    }
    res.status(200).json({ message: "Order item yangilandi" });
  } catch (error) {
    res.status(500).json({ message: "Order itemni yangilashda xato", error });
  }
};

export const deleteOrderItem   = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM orderItem WHERE id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order item topilmadi" });
    }
    res.status(200).json({ message: "Order item o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Order itemni o'chirishda xato", error });
  }
};