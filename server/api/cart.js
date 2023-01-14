const router = require("express").Router();
const User = require("../db/models/User.js");

//updating an existing cart, this will only be updating total or status
router.put("/:userId", async (req, res, next) => {
	try {
		const cartToUpdate = await User.findOne({
			where: {
				id: req.params.userId,
			},
			attributes: ["cart","id"],
		});
		res.status(202).send(await cartToUpdate.update({ cart: req.body.cart }));
	} catch (error) {
		next(error);
	}
});

module.exports = router;
