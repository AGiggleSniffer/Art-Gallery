"use strict";

const { Review } = require("../models");
const { NUM_OF_PHOTOS, NUM_OF_REVIEWS } = require("../SeederConstants");
const { randInt } = require("../../utils/randInt");

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

		const reviewArr = [];
		for (let i = 0; i < NUM_OF_REVIEWS; i++) {
			const bool = randInt(0, 1) ? true : false;
			reviewArr.push({
				user_id: randInt(1, 3),
				art_id: randInt(1, NUM_OF_PHOTOS),
				liked: bool,
				disliked: !bool,
			});
		}

		try {
			await Review.bulkCreate(reviewArr);
		} catch (err) {
			console.log(err);
			throw new Error("Review Seeder Validation Error");
		}
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		options.tableName = "Reviews";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{ user_id: { [Op.in]: [1, 2, 3] } },
			{},
		);
	},
};
