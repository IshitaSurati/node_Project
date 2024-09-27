const Product = require("../models/product_schema");
const multer = require("multer");

// File upload setup
const storage = multer.diskStorage({
  destination: "public/uploads", // Destination folder for uploaded images
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Custom file naming
  },
});

const upload = multer({ storage });

// Controller to display all products
const showProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from DB
    res.render("index", { products });    // Render home page with products
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
};

// Controller to add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file.path;  // Store uploaded image path

    const product = new Product({
      name,
      description,
      price,
      image,
    });

    await product.save();  // Save the new product to the database
    res.redirect("/");      // Redirect to home page after product is added
  } catch (err) {
    res.status(500).send("Error adding product");
  }
};

// Render the Add Product page
const getAddProductPage = (req, res) => {
  res.render("addProduct");
};

module.exports = { showProducts, addProduct, upload, getAddProductPage };
