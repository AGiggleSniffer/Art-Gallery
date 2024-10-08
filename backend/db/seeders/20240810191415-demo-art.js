"use strict";

const { Art } = require("../models");
const { imageUrls, loremIpsum } = require("../SeedMap");
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
		const randInt = (max) => Math.floor(Math.random() * max) + 1;
		const seedArr = imageUrls.map((url) => ({
			user_id: 1,
			name: loremIpsum.slice(0, randInt(25)),
			description: loremIpsum.slice(
				randInt(loremIpsum.length),
				randInt(loremIpsum.length),
			),
			data_url: url,
		}));
		await Art.bulkCreate(seedArr);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Arts";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, { user_id: 1 }, {});
	},
};
