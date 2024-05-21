"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"ArtGalleries",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				art_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: { model: "Arts" },
					onDelete: "CASCADE",
				},
				gallery_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: { model: "Galleries" },
					onDelete: "CASCADE",
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			options,
		);
	},
	async down(queryInterface, Sequelize) {
		options.tableName = "Arts";
		await queryInterface.dropTable("ArtGalleries");
	},
};
