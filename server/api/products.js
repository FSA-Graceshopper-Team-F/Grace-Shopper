const router = require("express").Router();
const Product = require("../db/models/Product.js");
const User = require('../db/models/User')

router.route('/')
.get(async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    next(err);
  }
})
.post(async (req,res,next) => {
  const user = await User.findByToken(req.headers.authorization);
  try{
    if(user.isAdmin){
      const { name, price } = req.body;
      //validation
      if(!name || !price){
        res.status(400);
        throw new Error('Please include a product name and price');
      }
      //Find if product already exists
      const productExists = await Product.findOne({name});
      if(productExists){
        res.status(400);
        throw new Error('Product already exists');
      }
      //Create product
      const product = await Product.create({name, price})
      if(product){
        res.status(201).json({
          name: product.name,
          price: product.price,
        })
      }
    } else{
      res.status(401)
      throw new Error('Invalid credentials');
    }
  } catch(err){
    next(err);
  }
});




router.route('/:productId')
.get(async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
})
.put(async (req,res,next) => {
  const user = await User.findByToken(req.headers.authorization);
  if(user.isAdmin){
    try{
      const product = await Product.findOne({
        where:{
          id: req.params.productId
        }
      })
      if(!product){
        res.status(404);
        throw new Error('Product not found');
      }else{
        const updatedProduct = await product.update(req.body);
        res.status(202).json(updatedProduct);
      }
    } catch(err){
      next(err);
    }
  }
})


module.exports = router;
