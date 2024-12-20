"use strict";

const { Art } = require("../models");
const { imageUrls } = require("../SeedMap");
const { loremIpsum } = require("../loremIpsum");
const { NUM_OF_PHOTOS } = require("../SeederConstants");
const { randInt } = require("../../utils/randInt");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */

		const seedArr = [];
		for (let i = 0; i < NUM_OF_PHOTOS; i++) {
			let num1 = randInt(loremIpsum.length - 4);
			let num2 = randInt(50) + 3 + num1;
			const name = loremIpsum.slice(num1, num2);

			num1 = randInt(loremIpsum.length - 255);
			num2 = randInt(255) + num1;
			const desc = loremIpsum.slice(num1, num2);

			const payload = {
				user_id: randInt(3),
				name: name,
				description: desc,
				data_url: imageUrls[randInt(7) - 1],
			};

			seedArr.push(payload);
		}

		try {
			await Art.bulkCreate(seedArr, { validate: true });
		} catch (err) {
			console.log(err);
			throw new Error("Art Seeder Validation Error");
		}
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Arts";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{ user_id: { [Op.in]: [1, 2, 3] } },
			{},
		);
	},
};
