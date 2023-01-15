const router = require("express").Router();
const Order = require("../db/models/Order.js");
const User = require("../db/models/User.js");
//retrieving ALL orders, this is admin only
router.get("/", async (req, res, next) => {
	try {
		const allOrders = await Order.findAll();
		res.json(allOrders);
	} catch (error) {
		next(error);
	}
});

//retrieving a single users, entire order history
router.get("/:userId", async (req, res, next) => {
	try {
		const orderHistory = await Order.findAll({
			where: {
				userId: req.params.userId,
			},
		});
		res.json(orderHistory);
	} catch (error) {
		next(error);
	}
});

//creating a new order
router.post("/:userId", async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		res.status(201).send(
			await Order.create({
				userId: user.id,
				order: user.cart,
				address: req.body.address
			})
		);
		await user.update({ cart: [] });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
