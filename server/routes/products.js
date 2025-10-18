const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const XLSX = require("xlsx");
const fs = require("fs");


const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, category, price, cost, brand, description, quantity } = req.body;

        const product = new Product({
            name, category, price, cost, brand, description, quantity, owner: req.user.id
        });

        await product.save();
        res.status(201).json(product);

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const products = await Product.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;  // Product ID from URL
        const { name, category, price, cost, brand, description, quantity } = req.body;

        const product = await Product.findOne({ _id: id, owner: req.user.id });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found or unauthorized' });
        }

        product.name = name || product.name;
        product.category = category || product.category;
        product.price = price ?? product.price;
        product.cost = cost ?? product.cost;
        product.brand = brand || product.brand;
        product.description = description || product.description;
        product.quantity = quantity ?? product.quantity;

        await product.save();

        res.json({ msg: 'Product updated successfully', product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id, owner: req.user.id });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found or unauthorized' });
        }

        await product.deleteOne();

        res.json({ msg: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Bulk upload products
router.post("/bulk-upload", authMiddleware, upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

        const workbook = XLSX.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (!data.length) return res.status(400).json({ msg: "Empty file" });

        const products = data.map((p) => ({
            name: p.name,
            category: p.category,
            price: Number(p.price),
            cost: Number(p.cost),
            brand: p.brand,
            description: p.description,
            quantity: Number(p.quantity),
            owner: req.user.id,
        }));

        await Product.insertMany(products);

        // Delete temporary uploaded file
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
        });
        res.json({ msg: `${products.length} products uploaded successfully` });
    } catch (err) {
        console.error(err);
        if (req.file) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error("Failed to delete temp file:", unlinkErr);
            });
        }
        res.status(500).json({ msg: "Server error" });
    }
});





module.exports = router;
