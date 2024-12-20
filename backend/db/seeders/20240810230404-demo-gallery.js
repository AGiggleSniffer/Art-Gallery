"use strict";

const { Gallery, ArtGallery } = require("../models");
const { loremIpsum } = require("../loremIpsum");
const {
	MAX_ART_PER_GAL,
	NUM_OF_GAL,
	NUM_OF_PHOTOS,
} = require("../SeederConstants");
const { randInt } = require("../../utils/randInt");

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const galSeedArr = [];
		const artGalSeedArr = [];

		for (let i = 0; i < NUM_OF_GAL; i++) {
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
			};

			galSeedArr.push(payload);

			for (let si = 0; si < randInt(MAX_ART_PER_GAL); si++) {
				const paylaod = {
					gallery_id: i + 1,
					art_id: randInt(NUM_OF_PHOTOS),
				};

				artGalSeedArr.push(paylaod);
			}
		}

		try {
			await Gallery.bulkCreate(galSeedArr, { validate: true });
			await ArtGallery.bulkCreate(artGalSeedArr, { validate: true });
		} catch (err) {
			console.log(err);
			throw new Error("Gallery Seeder Validation Error");
		}
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Galleries";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{ user_id: { [Op.in]: [1, 2, 3] } },
			{},
		);
	},
};
