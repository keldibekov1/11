// user.controller.js
import db from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Joi from "joi";

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
    let [user] = await db.query("select * from users where phone = ?", [phone]);

    if (user.length) {
      return res.status(409).send({ message: "You have an account" });
    }

    let hashed = bcrypt.hashSync(password, 10);
    let [data] = await db.query(
      "insert into users (fullname, phone, password, role) values (?, ?, ?, ?)",
      [fullname, phone, hashed, role]
    );

    let [newUser] = await db.query("select * from users where id = ?", [
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
    let [user] = await db.query("select * from users where phone = ?", [phone]);

    if (!user.length) {
      return res.status(401).send({ message: "Not authorized" });
    }

    let correct = bcrypt.compareSync(password, user[0].password);
    if (!correct) {
      return res.status(400).send({ message: "Wrong password" });
    }

    let token = jwt.sign(
      {
        id: user[0].id,
        role: user[0].role,
      },
      `secretKey`
    );

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export { register, login };
