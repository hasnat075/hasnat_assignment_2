var express = require("express");
var router = express.Router();
const Products = require("../models/products");
/* GET users listing. */
router.get("/", async (req, res, next) => {
  products = await Products.find();
  res.send(products);
});
router.get("/add", async (req, res, next) => {
  res.render("add_products");
});
router.get("/edit/:id", async (req, res, next) => {
  var id = req.params.id;
  product = await Products.findById(id);
  res.render("edit", product);
});
router.post("/", async (req, res, next) => {
  try {
    body = req.body;
    var product = new Products(body);
    product.save();
    res.send(product);
  } catch (err) {
    console.log(err.message);
    res.send({ status: "Error", message: "Type Mismatch" });
  }
});
router.get("/delete/:id", async (req, res, next) => {
  try {
    var id = req.params.id;
    console.log(id);
    if (id) {
      await Products.findByIdAndDelete(id);
      // res.redirect("/products");
      res.sendStatus(200);
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err.message);
    res.send({ status: "Error", message: "Product not Found" });
  }
});
router.post("/edit", async (req, res) => {
  body = req.body;
  product = await Products.findById(body.id);

  product.name = body.name;
  product.price = body.price;
  product.type = body.type;
  console.log(product);
  await product.save();
  return res.send("OK");
});
router.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  res.send(product);
});
module.exports = router;
