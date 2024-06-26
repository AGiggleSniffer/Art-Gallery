"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ArtGallery extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			ArtGallery.belongsTo(models.Art, { foreignKey: "art_id" });
			ArtGallery.belongsTo(models.Gallery, { foreignKey: "gallery_id" });
		}
	}
	ArtGallery.init(
		{
			art_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
				validate: {
					notNull: { msg: "Art Id is required" },
					notEmpty: { msg: "Art Id is required" },
				},
			},
			gallery_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
				validate: {
					notNull: { msg: "Gallery Id is required" },
					notEmpty: { msg: "Gallery Id is required" },
				},
			},
		},
		{
			sequelize,
			modelName: "ArtGallery",
		},
	);
	return ArtGallery;
};
