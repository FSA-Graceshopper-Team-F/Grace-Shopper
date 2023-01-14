const router = require("express").Router();
const User = require("../db/models/User");
module.exports = router;
router.post("/login", async (req, res, next) => {
	try {
		const token = await User.authenticate(req.body);
		const user = await User.findByToken(token);0
		res.send({ token: token });
		if (req.body.cart.length !== 0)
			return await user.update({ cart: req.body.cart });
	} catch (err) {
		next(err);
	}
});

router.post("/signup", async (req, res, next) => {
	try {
		const user = await User.create(req.body);
		res.send({ token: await user.generateToken() });
	} catch (err) {
		if (err.name === "SequelizeUniqueConstraintError") {
			res.status(400).send("User already exists, redirecting you");
		} else {
			next(err);
		}
	}
});

router.get("/me", async (req, res, next) => {
	try {
		res.send(await User.findByToken(req.headers.authorization));
	} catch (ex) {
		next(ex);
	}
});
