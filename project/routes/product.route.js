const { Router } = require("express");
const { showProducts, addProduct, upload, getAddProductPage } = require("../controllers/product.controller");

const productRouter = Router();

productRouter.get("/", showProducts);  // Route to display all products
productRouter.get("/add", getAddProductPage);  // Route to display add product form
productRouter.post("/add", upload.single("image"), addProduct);  // Route to handle product addition

module.exports = productRouter;
