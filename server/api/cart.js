const router = require("express").Router();
const User = require("../db/models/User.js");

//updating an existing cart, this will only be updating total or status
router.put("/:userId", async (req, res, next) => {
	try {
		console.log(req.params, "params")
		const cartToUpdate = await User.findOne({
			where: {
				id: req.params.userId,
			},
			attributes: ["cart","id"],
		});
		console.log(cartToUpdate, "cart to update");
		console.log("req body", req.body);
		res.status(202).send(await cartToUpdate.update({ cart: req.body.cart }));
	} catch (error) {
		next(error);
	}
});

module.exports = router;
