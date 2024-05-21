"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Gallery extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Gallery.hasMany(models.GalleryTag, {
				foreignKey: "gallery_id",
				onDelete: "CASCADE",
				hooks: true,
			});
			Gallery.hasMany(models.ArtGallery, {
				foreignKey: "gallery_id",
				onDelete: "CASCADE",
				hooks: true,
			});
			Gallery.belongsTo(models.User, { foreignKey: "user_id" });
		}
	}
	Gallery.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
			},
			name: { type: DataTypes.STRING, allowNull: false },
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Gallery",
		},
	);
	return Gallery;
};
