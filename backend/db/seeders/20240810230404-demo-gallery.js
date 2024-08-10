"use strict";

const { Gallery, ArtGallery } = require("../models");
const { imageUrls, loremIpsum } = require("../SeedMap");
let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

const NUMOFGAL = 10;
const MAXARTPERGAL = 15;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const randInt = (max) => Math.floor(Math.random() * max) + 1;
		const galSeedArr = [];
		const artGalSeedArr = [];

		for (let i = 0; i < NUMOFGAL; i++) {
			galSeedArr.push({
				user_id: 1,
				name: loremIpsum.slice(0, randInt(25)),
				description: loremIpsum.slice(
					randInt(loremIpsum.length),
					randInt(loremIpsum.length),
				),
			});

			for (let si = 0; si < randInt(MAXARTPERGAL); si++) {
				artGalSeedArr.push({
					gallery_id: i + 1,
					art_id: randInt(7),
				});
			}
		}

		await Gallery.bulkCreate(galSeedArr);
		await ArtGallery.bulkCreate(artGalSeedArr);
	},

	async down(queryInterface, Sequelize) {
		options.tableName = "Galleries";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(options, { user_id: 1 }, {});
	},
};
