"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Art extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Art.hasMany(models.ArtTag, {
				foreignKey: "art_id",
				onDelete: "CASCADE",
				hooks: true,
			});
			Art.hasMany(models.ArtGallery, {
				foreignKey: "art_id",
				onDelete: "CASCADE",
				hooks: true,
			});
			Art.belongsTo(models.User, { foreignKey: "user_id" });
		}
	}
	Art.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Name is required" },
					notEmpty: { msg: "Name is required" },
				},
			},
			description: DataTypes.STRING,
			data_url: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: { msg: "Something went wrong please try again" },
					notEmpty: { msg: "Something went wrong please try again" },
				},
			},
		},
		{
			sequelize,
			modelName: "Art",
		},
	);
	return Art;
};
