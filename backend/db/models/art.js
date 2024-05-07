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
			Art.belongsTo(models.Gallery, { foreignKey: "gallery_id" });
      Art.belongsTo(models.User, { foreignKey: "user_id" });
		}
	}
	Art.init(
		{
			user_id: DataTypes.INTEGER,
			gallery_id: DataTypes.INTEGER,
			description: DataTypes.STRING,
			bitmap: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Art",
		},
	);
	return Art;
};
