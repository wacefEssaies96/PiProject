const Product = require('../../models/e-commerce/product');

// CREATE a new product
async function createProduct(req, res) {
  const { name, price, quantity, description, images, category, marque, nutrition } = req.body;
  const product = new Product({ name, price, quantity, description, images, category, marque, nutrition });
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// READ all products
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// READ a single product by ID
async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE a product by ID
async function updateProductById(req, res) {
  const { id } = req.params;
  const { name, price, quantity, description, images, category, marque, nutrition } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.description = description || product.description;
    product.images = images || product.images;
    product.category = category || product.category;
    product.marque = marque || product.marque;
    product.nutrition = nutrition || product.nutrition;
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE a product by ID
async function deleteProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
