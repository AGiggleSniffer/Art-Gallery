"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class ArtTag extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			ArtTag.belongsTo(models.Art, { foreignKey: "art_id" });
		}
	}
	ArtTag.init(
		{
			art_id: DataTypes.INTEGER,
			type: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "ArtTag",
		},
	);
	return ArtTag;
};
