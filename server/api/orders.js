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
		const userCurrentCart = await User.findOne({
			where: { id: req.params.userId },
			attributes: ["id", "cart"],
		});
		res.status(201).send(
			await Order.create({
				userId: userCurrentCart.id,
				order: userCurrentCart.cart,
			})
		);
		await userCurrentCart.update({ cart: [] });
	} catch (error) {
		next(error);
	}
});

//deleting an exisiting order
router.delete("/:orderId", async (req, res, next) => {
	try {
		const orderToDestroy = await Order.findOne({
			where: {
				id: req.params.orderId,
			},
		});
		await orderToDestroy.destroy();
		res.status(204).send(orderToDestroy);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
