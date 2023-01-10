const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

const { Product } = require("../db/models/Product.js");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
