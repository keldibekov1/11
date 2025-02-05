import db from "../config/db.js";

export const createProduct = async (req, res) => {
  const {
    name_uz,
    name_ru,
    brand_id,
    countr_id,
    price,
    old_price,
    available,
    description_uz,
    description_ru,
    washable,
    size,
  } = req.body;
  const query = `
    INSERT INTO product (name_uz, name_ru, brand_id, countr_id, price, old_price, available, description_uz, description_ru, washable, size)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    const [result] = await db.execute(query, [
      name_uz,
      name_ru,
      brand_id,
      countr_id,
      price,
      old_price,
      available,
      description_uz,
      description_ru,
      washable,
      size,
    ]);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Mahsulot yaratishda xato", error });
  }
};

export const getAllProducts = async (req, res) => {
  const query = "SELECT * FROM product";
  try {
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Mahsulotlarni olishda xato", error });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM product WHERE id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni olishda xato", error });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { price, available } = req.body;
  const query = `
    UPDATE product
    SET price = ?, available = ?
    WHERE id = ?`;

  try {
    const [result] = await db.execute(query, [price, available, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.status(200).json({ message: "Mahsulot yangilandi" });
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni yangilashda xato", error });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM product WHERE id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.status(200).json({ message: "Mahsulot o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni o'chirishda xato", error });
  }
};