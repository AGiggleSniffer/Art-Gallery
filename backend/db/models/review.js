"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Review extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Review.belongsTo(models.User, { foreignKey: "user_id" });
			Review.belongsTo(models.Art, { foreignKey: "art_id" });
		}
	}
	Review.init(
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			art_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			liked: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			disliked: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
		},
		{
			sequelize,
			modelName: "Review",
			validate: {
				likeOrDislike() {
					if (this.liked && this.disliked) {
						throw new Error(
							"Only like or dislike can be true, not both.",
						);
					}
				},
			},
		},
	);
	return Review;
};
