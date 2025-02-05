import db from "../config/db.js"; // Database ulanishi

// Buyurtma yaratish
export const createOrder = async (req, res) => {
  const { user_id, total_price } = req.body;
  const query = "INSERT INTO `order` (user_id, total_price) VALUES (?, ?)";

  try {
    const [result] = await db.execute(query, [user_id, total_price]);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Buyurtma yaratishda xato", error });
  }
};

// Barcha buyurtmalarni olish
export const getAllOrders = async (req, res) => {
  const query = "SELECT * FROM `order`";
  try {
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Buyurtmalarni olishda xato", error });
  }
};

// Buyurtmani ID bo'yicha olish
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM `order` WHERE id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Buyurtma topilmadi" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Buyurtmani olishda xato", error });
  }
};

// Buyurtmani yangilash
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { total_price } = req.body;
  const query = "UPDATE `order` SET total_price = ? WHERE id = ?";

  try {
    const [result] = await db.execute(query, [total_price, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Buyurtma topilmadi" });
    }
    res.status(200).json({ message: "Buyurtma yangilandi" });
  } catch (error) {
    res.status(500).json({ message: "Buyurtmani yangilashda xato", error });
  }
};

// Buyurtmani o'chirish
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM `order` WHERE id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Buyurtma topilmadi" });
    }
    res.status(200).json({ message: "Buyurtma o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Buyurtmani o'chirishda xato", error });
  }
};
