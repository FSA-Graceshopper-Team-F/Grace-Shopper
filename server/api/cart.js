const router = require("express").Router();
const Product = require("../db/models/Product.js");
const { Op } = require("sequelize");
router.get("/:itemsArray", async (req, res, next) => {
	try {
		console.log(req.params.itemsArray.split(","));
		const productIds = req.params.itemsArray.split(",");
		const allCartItems = await Product.findAll({
			where: {
				id: {
					[Op.in]: productIds,
				},
			},
		});
		res.json(allCartItems);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
