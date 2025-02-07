import {
  register,
  login,
} from "../controllers/user.controller.js";

import { Router } from "express";

const userRoute = Router();


/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: "Foydalanuvchini ro‘yxatdan o‘tkazish"
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, superadmin]
 *     responses:
 *       201:
 *         description: "Muvaffaqiyatli ro‘yxatdan o‘tildi"
 *       409:
 *         description: "phone allaqachon mavjud"
 */
userRoute.post("/register", register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: "Foydalanuvchini tizimga kiritish"
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "Muvaffaqiyatli tizimga kirdi"
 *       401:
 *         description: "Notog‘ri phone yoki parol"
 */
userRoute.post("/login", login);



export default userRoute;