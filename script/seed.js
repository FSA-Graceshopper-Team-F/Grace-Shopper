"use strict";
const { faker } = require("@faker-js/faker");
const { range } = require("lodash");
const { db } = require("../server/db");
const User = require("../server/db/models/User");
const Product = require("../server/db/models/Product");
const Order = require("../server/db/models/Order");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const seed = async () => {
	// faker functions
	const fakeEmail = faker.internet.email();
	const fakePassword = faker.internet.password();
	const fakeProduct = faker.commerce.productName();
	const fakeDescription = faker.commerce.productDescription();
	const fakePrice = faker.commerce.price(1, 100);
	const fakeImage = faker.image.imageUrl(200, 200, true);

	//creating products
	await Product.create({
		name: fakeProduct,
		description: fakeDescription,
		imageUrl: fakeImage,
		price: fakePrice,
	});
	//creating Users
	await User.create({
		email: fakeEmail,
		password: fakePassword,
		cart: [
			{ productId: 1, quantity: 2 },
			{ productId: 2, quantity: 3 },
			{ productId: 3, quantity: 1 },
		],
	});
};

const orderSeed = async () => {
	await Order.create({
		userId: 1,
		order: [
			{ productId: 1, quantity: 2 },
			{ productId: 2, quantity: 3 },
			{ productId: 3, quantity: 1 },
		],
	});
	await Order.create({
		userId: 2,
		order: [
			{ productId: 3, quantity: 2 },
			{ productId: 2, quantity: 3 },
			{ productId: 1, quantity: 1 },
		],
	});
};

const adminSeed =  () => {
	 User.create({
		email: "admin@admin.com",
		password: "admin",
		isAdmin: true,
		cart: [
			{ productId: 1, quantity: 2 },
			{ productId: 2, quantity: 3 },
			{ productId: 3, quantity: 1 },
			{ productId: 4, quantity: 2 },
			{ productId: 34, quantity: 3 },
			{ productId: 31, quantity: 1 },
		],
	});
};
/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log("seeding...");
	try {
		//wiping DB
		await db.sync({ force: true });
		//using lodash times function to seed 50 sets of data
		Promise.all(range(50).map(seed)).then((results) => orderSeed());
		adminSeed();
		console.log("db seeded");
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
