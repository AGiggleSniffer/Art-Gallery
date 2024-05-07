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
			gallery_id: DataTypes.INTEGER,
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "GalleryTag",
		},
	);
	return GalleryTag;
};
