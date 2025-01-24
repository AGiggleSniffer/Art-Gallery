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
			Art.hasMany(models.Review, {
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
					max: {
						args: 50,
						msg: "Name too long, must be between 3-50 chars",
					},
					min: {
						args: 3,
						msg: "Name too short, must be between 3-50 chars",
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [0, 255],
						msg: "Description too long, cannot be over 255 chars",
					},
				},
			},
			data_url: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: { msg: "Something went wrong please try again" },
					notEmpty: { msg: "Something went wrong please try again" },
				},
			},
			likeCount: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			dislikeCount: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "Art",
		},
	);
	return Art;
};
