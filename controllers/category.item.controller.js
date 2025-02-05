import db from "../config/db.js";

async function FindAll(req, res) {
    try {
        let [all] = await db.query("SELECT * FROM category_item");
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
            "SELECT * FROM category_item WHERE id = ?", [id]
        );
        res.json({ message: findItem });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
}

async function Create(req, res) {
    try {
        let { category_id, product_id } = req.body;
        await db.query(
            "INSERT INTO category_item (category_id, product_id) VALUES (?, ?)", 
            [category_id, product_id]
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
        let { category_id, product_id } = req.body;
        await db.query(
            "UPDATE category_item SET category_id = ?, product_id = ? WHERE id = ?", 
            [category_id, product_id, id]
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
        await db.query("DELETE FROM category_item WHERE id = ?", [id]);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ message: error.message });
    }
}

export { FindAll, FindOne, Create, Update, Delete };