"use strict";
const { faker } = require("@faker-js/faker");
const { times } = require("lodash");
const { db } = require("../server/db");
const User = require("../server/db/models/User");
const Product = require("../server/db/models/Product");
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
	const fakeImage = faker.image.imageUrl(200, 200,true);
	//creating users
	await User.create({ 
    email: fakeEmail,
    password: fakePassword });

	//creating products
	await Product.create({
		name: fakeProduct,
		description: fakeDescription,
    imageUrl: fakeImage,
		price: fakePrice,
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
		await times(50, () => seed());
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
