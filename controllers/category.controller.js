import db from "../config/db.js";

async function FindAll(req, res) {
    try {
        let [all] = await db.query("SELECT * FROM category");
        res.json({ message: all });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

async function FindOne(req, res) {
    try {
        let { id } = req.params;
        const [findCategory] = await db.query(
            "SELECT * FROM category WHERE id = ?",
            [id]
        );

        if (findCategory.length === 0) {
            return res.status(404).json({ message: "Kategoriya topilmadi" });
        }

        res.json({ message: findCategory[0] });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

async function Create(req, res) {
    try {
        let { name_uz, name_ru, image } = req.body;

        if (!name_uz || !name_ru || !image) {
            return res.status(400).json({ message: "Barcha maydonlarni toldiring" });
        }

        await db.query(
            "INSERT INTO category (name_uz, name_ru, image) VALUES (?, ?, ?)",
            [name_uz, name_ru, image]
        );

        res.status(201).json({ message: "Kategoriya yaratildi" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

async function Update(req, res) {
    try {
        let { id } = req.params;
        let { name_uz, name_ru, image } = req.body;

        if (!name_uz || !name_ru || !image) {
            return res.status(400).json({ message: "Barcha maydonlarni toldiring" });
        }

        const [result] = await db.query(
            "UPDATE category SET name_uz = ?, name_ru = ?, image = ? WHERE id = ?",
            [name_uz, name_ru, image, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Kategoriya topilmadi" });
        }

        res.json({ message: "Kategoriya yangilandi" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

async function Delete(req, res) {
    try {
        let { id } = req.params;

        const [result] = await db.query("DELETE FROM category WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Kategoriya topilmadi" });
        }

        res.json({ message: "Kategoriya ochirildi" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

export { FindAll, FindOne, Create, Update, Delete };
