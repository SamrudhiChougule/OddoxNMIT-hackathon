// backend/routes/products.js
import express from "express";
import db from "../utils/db.js";

const router = express.Router();

// GET all products
router.get("/", async(req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// Add product
router.post("/", async(req, res) => {
    const { seller_id, name, description, price, category, condition, image_url, eco_score } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO products (seller_id, name, description, price, category, condition, image_url, eco_score) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [seller_id, name, description, price, category, condition, image_url, eco_score]
        );
        res.json({ id: result.insertId, message: "Product added!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not add product" });
    }
});

export default router;