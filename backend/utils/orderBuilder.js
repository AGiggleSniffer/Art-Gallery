const { sequelize } = require("../db/models");

exports.orderBuilder = (filter) => {
	const order = [];

	switch (filter) {
		case "Date":
			order.push(["createdAt"]);
			break;
		case "Art Name":
			order.push([[sequelize.fn("LOWER", sequelize.col("name")), "ASC"]]);
			break;
		case "Artist":
			order.push([
				[sequelize.fn("LOWER", sequelize.col("username")), "ASC"],
			]);
			break;
		case "Likes":
			order.push([[sequelize.literal("likeCount"), "DESC"]]);
			break;
		case "Dislikes":
			order.push([[sequelize.literal("dislikeCount"), "DESC"]]);
			break;
	}

	return order;
};
