import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Token topilmadi, iltimos, tizimga kiring!" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; // Tokenni dekod qilib, req.user ichiga joylaymiz
        next();
    } catch (error) {
        res.status(403).json({ message: "Noto‘g‘ri yoki eskirgan token!" });
    }
};

export default verifyToken;
