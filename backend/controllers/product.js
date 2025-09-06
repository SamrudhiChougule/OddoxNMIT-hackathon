import pool from '../utils/db.js';

// Get all products
export const getAllProducts = async(req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add product
export const addProduct = async(req, res) => {
    try {
        const { seller_id, name, description, price, category, image_url } = req.body;
        const [result] = await pool.query(
            'INSERT INTO products (seller_id, name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?, ?)', [seller_id, name, description, price, category, image_url]
        );
        res.json({ message: 'Product added', productId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};