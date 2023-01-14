const router = require("express").Router();
const User = require("../db/models/User.js");

//updating an existing cart, this will only be updating total or status
router.put("/:userId", async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		res.status(202).send(await user.update({ cart: req.body }));
	} catch (error) {
		next(error);
	}
});

module.exports = router;
