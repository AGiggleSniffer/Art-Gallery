"use strict";

const { Art, ArtTag, sequelize } = require("../models");
const images = require("../DataUrlMap.js");
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

		for (let i = 0; i < NUM_OF_PHOTOS; i++) {
			let num1 = randInt(0, loremIpsum.length - 4);
			let num2 = randInt(3, 50) + num1;
			const name = loremIpsum.slice(num1, num2);

			num1 = randInt(0, loremIpsum.length - 1);
			num2 = randInt(0, 255) + num1;
			const desc = loremIpsum.slice(num1, num2);

			const index = randInt(0, images.length - 1);
			const img = images[index];

			const payload = {
				user_id: randInt(1, 3),
				name: name,
				description: desc,
				data_url: img.url,
				likecount: randInt(0, 200),
				dislikecount: randInt(0, 200),
			};

			try {
				await sequelize.transaction(async (t) => {
					const { dataValues } = await Art.create(payload, {
						transaction: t,
					});

					const formattedTags = img.tags.map((tag) => ({
						art_id: dataValues.id,
						type: tag,
					}));

					await ArtTag.bulkCreate(formattedTags, {
						validate: true,
						transaction: t,
					});
				});
			} catch (err) {
				console.log(err);
				throw new Error("Art Seeder Validation Error");
			}
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
