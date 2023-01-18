const router = require("express").Router();
const User = require("../db/models/User");

router.get("/", async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
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
		res.send(401);
		next(err);
	}
});

router.get("/:userId", async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.put("/me", async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		res.send(user.update(req.body));
	} catch (error) {
		next(error);
	}
});

module.exports = router;
