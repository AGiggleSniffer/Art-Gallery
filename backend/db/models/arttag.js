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
			art_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				onDelete: "CASCADE",
				validate: {
					notNull: { msg: "Art Id is required" },
					notEmpty: { msg: "Art Id is required" },
				},
			},
			type: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: { msg: "Tag Type is required" },
					notEmpty: { msg: "Tag Type is required" },
					len: {
						args: [0, 50],
						msg: "Tag too long",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "ArtTag",
		},
	);
	return ArtTag;
};
