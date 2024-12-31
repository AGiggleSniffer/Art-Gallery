const { sequelize } = require("../db/models");

exports.orderBuilder = (filter) => {
	const result = { order: [], where: {} };
	switch (filter) {
		case "": {
			result.order.push([["createdAt", "DESC"]]);
			return result;
		}
		case "Oldest": {
			result.order.push([["createdAt"]]);
			return result;
		}
		case "Name": {
			result.order.push([
				[sequelize.fn("LOWER", sequelize.col("name")), "ASC"],
			]);
			return result;
		}
		case "Artist": {
			result.order.push([
				[sequelize.fn("LOWER", sequelize.col("username")), "ASC"],
			]);
			return result;
		}
		case "Likes": {
			result.order.push([[sequelize.literal("likeCount"), "DESC"]]);
			return result;
		}
		case "Dislikes": {
			result.order.push([[sequelize.literal("dislikeCount"), "DESC"]]);
			return result;
		}
		default: {
			// if no pre defined filter
			// console.log(`\n\n\nFilter: ${filter}\n\n\n`);
			// result.order.push([[sequelize.literal("ArtTag.type")]]);
			// result.where["$ArtTag.type$"] = filter;
			return result;
		}
	}
};
