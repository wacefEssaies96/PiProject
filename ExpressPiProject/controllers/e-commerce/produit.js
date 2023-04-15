const Product = require('../../models/e-commerce/product');
// CREATE a new product

// Create the multer middleware

async function createProduct(req, res) {
  const {
    name,
    price,
    quantity,
    description,

    category,
    marque,
    nutrition,
  } = req.body;
  const images = req.files.map((file) => file.path);
  const product = new Product({
    name,
    price,
    quantity,
    description,
    images,
    category,
    marque,
    nutrition,
  });
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
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// UPDATE a product by ID
async function updateProductById(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const { id } = req.params;
  const {
    name,
    price,
    quantity,
    description,

    category,
    marque,
    //nutrition,
  } = req.body;
  let images;
  if (req.files && req.files.length > 0) {
    images = req.files.map((file) => file.path);
  }
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
    // product.nutrition = nutrition || product.nutrition;
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

async function getByType(req, res) {
  const { type } = req.params;
  try {
    const products = await Product.find({ type });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
async function searchByName(req, res) {
  try {
    const name = req.params.name;

    const productDoc = await Product.find(
      { name: { $regex: new RegExp(name), $options: 'is' } },
      { name: 1, quantity: 1, images: 1, price: 1, _id: 0 }
    );

    if (productDoc.length < 0) {
      return res.status(404).json({
        message: 'No product found.',
      });
    }

    res.status(200).json({
      products: productDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.',
    });
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchByName,
  getByType,
};
