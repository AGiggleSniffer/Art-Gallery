"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class GalleryTag extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			GalleryTag.belongsTo(models.Gallery, { foreignKey: "gallery_id" });
		}
	}
	GalleryTag.init(
		{
			gallery_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
				validate: {
					notNull: { msg: "Gallery Id is required" },
					notEmpty: { msg: "Gallery Id is required" },
				},
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Tag Type is required" },
					notEmpty: { msg: "Tag Type Id is required" },
					len: {
						args: [3, 25],
						msg: "Tag too long, must be between 3-25 chars",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "GalleryTag",
		},
	);
	return GalleryTag;
};
