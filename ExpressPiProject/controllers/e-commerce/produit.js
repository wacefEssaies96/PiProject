const Product = require('../../models/e-commerce/product');
// CREATE a new product
const fs = require('fs');
const util = require('util');
// Create the multer middleware
const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const { createPool } = require('generic-pool');

// async function scrap(req, res) {
//   try {
//     const { product } = req.params;
//     const url = `https://protein-shop-tunisia.tn/produit/${product}`;

//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);

//     const name = $('h1[itemprop=name]').text().trim();
//     const price = $('.woocommerce-Price-amount.amount').text().trim();
//     const description = $('.woocommerce-product-details__short-description')
//       .text()
//       .trim();

//     res.status(200).json({ name, price, description });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal server error');
//   }
// }
const writeFile = util.promisify(fs.writeFile);

async function scrap(req, res) {
  try {
    const categories = [
      'proteines',
      'carbohydrates',
      'acides-amines',
      'acides-gras',
    ];
    const productsByCategory = {};

    const requests = categories.map(async (category) => {
      const url = `https://protein-shop-tunisia.tn/categorie-produit/nutrition-sportive/${category.toLowerCase()}/`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const products = [];

      const productEls = $('.product-grid-item');

      for (const el of productEls) {
        const name = $(el).find('.product-title').text();
        const url = $(el).find('.product-title a').attr('href');
        const matches = url.match(/\/produit\/(.+?)\/?$/);
        const slug = matches[1]
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .toLowerCase();

        const productResponse = await axios.get(
          `https://protein-shop-tunisia.tn/produit/${slug}`,
          { timeout: 30000 }
        );
        const productHtml = productResponse.data;
        const $$ = cheerio.load(productHtml);
        const description = $$(
          '.woocommerce-product-details__short-description'
        )
          .text()
          .trim();
        // const image = $$('.woocommerce-product-gallery__image a img').attr(
        //   'src'
        // );
        products.push({ name, slug, description });
      }

      productsByCategory[category] = products;
    });
    await Promise.all(requests);

    await writeFile('products.json', JSON.stringify(productsByCategory));

    res.send(productsByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error scraping website');
  }
}
// async function handleScrapRequest(req, res) {
//   try {
//     const result = await scrap();
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     //res.status(500).send('Error scraping website');
//   }
// }
async function scrapeProductNamesAndSlugs(req, res) {
  try {
    const categories = [
      'proteines',
      'carbohydrates',
      'acides-amines',
      'acides-gras',
      'Vitamines-et-mineraux',
      'creatine',
    ];
    const productsByCategory = {};

    const requests = categories.map(async (category) => {
      const url = `https://protein-shop-tunisia.tn/categorie-produit/nutrition-sportive/${category.toLowerCase()}/`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      const products = [];

      const productEls = $('.product-grid-item');

      for (const el of productEls) {
        const name = $(el).find('.product-title').text();
        const url = $(el).find('.product-title a').attr('href');
        const matches = url.match(/\/produit\/(.+?)\/?$/);
        const slug = matches[1]
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .toLowerCase();

        products.push({ name, slug });
      }

      productsByCategory[category] = products;
    });

    await Promise.all(requests);

    res.send(productsByCategory);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error scraping website');
  }
}

async function createProduct(req, res) {
  const {
    name,
    price,
    quantity,
    description,

    category,
    marque,
    type,
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
    type,
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
  try {
    const { id } = req.params;
    console.log('id', id);
    const { name, price, quantity, description, category, marque, type } =
      req.body;
    let images;
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }
    console.log('body', req.body);

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity, description, category, marque, type, images },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
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
  scrap,
  // handleScrapRequest,
  scrapeProductNamesAndSlugs,
};
