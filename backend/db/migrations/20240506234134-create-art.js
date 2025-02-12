"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"Arts",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				user_id: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: { model: "Users" },
					onDelete: "CASCADE",
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				description: {
					type: Sequelize.STRING,
				},
				data_url: {
					type: Sequelize.TEXT,
					allowNull: false,
				},
				likecount: {
					type: Sequelize.INTEGER,
					defaultValue: 0,
				},
				dislikecount: {
					type: Sequelize.INTEGER,
					defaultValue: 0,
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
		await queryInterface.dropTable("Arts");
	},
};
