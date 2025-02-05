import db from "../config/db.js";

async function FindAll(req, res) {
    try {
        let [all] = await db.query("SELECT * FROM country");
        res.json({ message: all });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
}

async function FindOne(req, res) {
    try {
        let { id } = req.params;
        const [findItem] = await db.query(
            "SELECT * FROM country WHERE id = ?", [id]
        );
        res.json({ message: findItem });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
}

async function Create(req, res) {
    try {
        let { name_uz, name_ru } = req.body;
        await db.query(
            "INSERT INTO country (name_uz, name_ru) VALUES (?, ?)", 
            [name_uz, name_ru]
        );
        res.json({ message: "Created successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
}

async function Update(req, res) {
    try {
        let { id } = req.params;
        let { name_uz, name_ru } = req.body;
        await db.query(
            "UPDATE country SET name_uz = ?, name_ru = ? WHERE id = ?", 
            [name_uz, name_ru, id]
        );
        res.json({ message: "Updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
}

async function Delete(req, res) {
    try {
        let { id } = req.params;
        await db.query("DELETE FROM country WHERE id = ?", [id]);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
}

export { FindAll, FindOne, Create, Update, Delete };