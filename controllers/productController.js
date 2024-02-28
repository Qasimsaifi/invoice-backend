const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const products = await Product.find({ user: userId });
        res.json(products);
    } catch (error) {
        next(error);
    }
};

exports.createProduct = async (req, res, next) => {
    try {
        const user = req.user.userId;
        const { name, description, price, stock } = req.body;
        const product = new Product({ user , name, description, price, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};
exports.createProducts = async (req, res, next) => {
    try {
        const user = req.user.userId;
        const productsData = req.body; // Array of products
        const products = [];

        for (const productData of productsData) {
            const { name, description, price, stock } = productData;
            const product = new Product({ user, name, description, price, stock });
            await product.save();
            products.push(product);
        }

        res.status(201).json(products);
    } catch (error) {
        next(error);
    }
};


exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const { user , name, description, price, stock } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { user , name, description, price, stock },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    }
};
