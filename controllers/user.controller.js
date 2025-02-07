import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";
import dotenv from "dotenv";

dotenv.config(); 

const registerSchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{9,15}$/).required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().min(3).max(100).required(),
  role: Joi.string().valid("user", "admin").required(),
});

const loginSchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{9,15}$/).required(),
  password: Joi.string().min(6).required(),
});

async function register(req, res) {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    let { phone, password, fullname, role } = req.body;
    let [user] = await db.query("SELECT * FROM users WHERE phone = ?", [phone]);

    if (user.length) {
      return res.status(409).send({ message: "Bu raqam bilan ro‘yxatdan o‘tilgan" });
    }

    let hashed = bcrypt.hashSync(password, 10);
    let [data] = await db.query(
      "INSERT INTO users (fullname, phone, password, role) VALUES (?, ?, ?, ?)",
      [fullname, phone, hashed, role]
    );

    let [newUser] = await db.query("SELECT * FROM users WHERE id = ?", [
      data.insertId,
    ]);
    res.status(201).send({ data: newUser[0] });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    let { phone, password } = req.body;
    let [user] = await db.query("SELECT * FROM users WHERE phone = ?", [phone]);

    if (!user.length) {
      return res.status(401).send({ message: "Notogri telefon raqam yoki parol" });
    }

    let correct = bcrypt.compareSync(password, user[0].password);
    if (!correct) {
      return res.status(400).send({ message: "Notogri parol" });
    }

    let token = jwt.sign(
      {
        id: user[0].id,
        role: user[0].role,
      },
      process.env.KEY, // Tokenni xavfsiz generatsiya qilish
      { expiresIn: "1d" } // Token 1 kun davomida amal qiladi
    );

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function AllUsers(req, res) {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Serverda xatolik yuz berdi" });
  }
}

export { register, login, AllUsers };
