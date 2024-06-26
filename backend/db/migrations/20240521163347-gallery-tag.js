"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"GalleryTags",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				gallery_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: { model: "Galleries" },
					onDelete: "CASCADE",
				},
				type: {
					type: Sequelize.STRING,
					allowNull: false,
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
		options.tableName = "GalleryTags";
		await queryInterface.dropTable("GalleryTags");
	},
};
