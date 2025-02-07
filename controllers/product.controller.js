import db from "../config/db.js";

/**
 * @desc Mahsulot yaratish
 * @route POST /api/products
 */
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
      name_uz, name_ru, brand_id, countr_id, price, old_price, 
      available, description_uz, description_ru, washable, size,
    ]);
    res.status(201).json({ message: "Mahsulot yaratildi", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Mahsulot yaratishda xato", error });
  }
};

/**
 * @desc Barcha mahsulotlarni olish
 * @route GET /api/products
 */
export const getAllProducts = async (req, res) => {
  try {
    const [results] = await db.execute("SELECT * FROM product");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Mahsulotlarni olishda xato", error });
  }
};

/**
 * @desc ID bo‘yicha mahsulot olish
 * @route GET /api/products/:id
 */
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("SELECT * FROM product WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni olishda xato", error });
  }
};

/**
 * @desc Sahifalangan mahsulotlar ro‘yxati
 * @route GET /api/products/page
 */
export const getProductPage = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const offset = (page - 1) * limit;

  try {
    const [rows] = await db.execute("SELECT * FROM product LIMIT ? OFFSET ?", [limit, offset]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Sahifalangan mahsulotlarni olishda xato", error });
  }
};

/**
 * @desc Nomi bo‘yicha mahsulot qidirish
 * @route GET /api/products/search?q=
 */
export const getProductName = async (req, res) => {
  const search = req.query.q || "";
  try {
    const [rows] = await db.execute("SELECT * FROM product WHERE name_uz LIKE ?", [`%${search}%`]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni qidirishda xato", error });
  }
};

/**
 * @desc Mahsulotni yangilash
 * @route PUT /api/products/:id
 */
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { price, available } = req.body;

  try {
    const [result] = await db.execute(
      "UPDATE product SET price = ?, available = ? WHERE id = ?",
      [price, available, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.status(200).json({ message: "Mahsulot yangilandi" });
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni yangilashda xato", error });
  }
};

/**
 * @desc Mahsulotni o‘chirish
 * @route DELETE /api/products/:id
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM product WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }
    res.status(200).json({ message: "Mahsulot o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Mahsulotni o‘chirishda xato", error });
  }
};
