const router = require("express").Router();
const Order = require("../db/models/Order");
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
	const user = await User.findByToken(req.headers.authorization);
	try {
		if (user.isAdmin) {
			const users = await User.findAll({
				// explicitly select only the id and email fields - even though
				// users' passwords are encrypted, it won't help if we just
				// send everything to anyone who asks!
				attributes: ["id", "email"],
			});
			res.json(users);
		} else {
			res.json([{ email: "access denied" }]);
		}
	} catch (err) {
		next(err);
	}
});

router.get("/:userId", async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization)
		res.json(user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
