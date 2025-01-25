const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Art, ArtTag, User, Review, sequelize } = require("../../db/models");
const { environment } = require("../../config");
const isProduction = environment === "production";

router.put("/:artId", requireAuth, async (req, res, next) => {
	const { user } = req;
	const { artId } = req.params;
	const { liked, disliked } = req.body;
	const payload = {
		liked,
		disliked,
	};
	const options = {
		where: { user_id: user.id, art_id: artId },
		/* ONLY supported for Postgres */
		// will return the results without needing another db query
		returning: true,
		plain: true,
	};

	try {
		const result = await Review.update(payload, options);

		if (liked && result[1] === 1) {
			await Art.increment({ likecount: 1 }, { where: { id: artId } });
			await Art.decrement({ dislikecount: 1 }, { where: { id: artId } });
		}

		if (disliked && result[1] === 1) {
			await Art.increment({ dislikecount: 1 }, { where: { id: artId } });
			await Art.decrement({ likecount: 1 }, { where: { id: artId } });
		}

		return res.json({
			message: "Successfully Updated",
			artId,
			liked,
			disliked,
		});
	} catch (err) {
		return next(err);
	}
});

router.post("/like/:artId", requireAuth, async (req, res, next) => {
	const { user } = req;
	const { artId } = req.params;
	const where = { user_id: user.id, art_id: artId };
	const defaults = {
		user_id: user.id,
		art_id: artId,
		liked: true,
		disliked: false,
	};

	try {
		const [_, created] = await Review.findOrCreate({ where, defaults });

		if (created) {
			await Art.increment({ likecount: 1 }, { where: { id: artId } });
			return res.json({ message: "Successfully Liked", artId });
		} else throw new Error("Already Reviewed");
	} catch (err) {
		next(err);
	}
});

router.post("/dislike/:artId", requireAuth, async (req, res, next) => {
	const { user } = req;
	const { artId } = req.params;
	const where = { user_id: user.id, art_id: artId };
	const defaults = {
		user_id: user.id,
		art_id: artId,
		liked: false,
		disliked: true,
	};

	try {
		const [_, created] = await Review.findOrCreate({ where, defaults });

		if (created) {
			await Art.increment({ dislikecount: 1 }, { where: { id: artId } });
			return res.json({ message: "Successfully Disliked", artId });
		} else throw new Error("Already Reviewed");
	} catch (err) {
		return next(err);
	}
});

router.delete("/delete/:artId", requireAuth, async (req, res, next) => {
	const { user } = req;
	const { artId } = req.params;
	const where = { user_id: user.id, art_id: artId };

	try {
		const { dataValues } = await Review.findOne({ where });

		if (dataValues.liked) {
			await Art.decrement({ likecount: 1 }, { where: { id: artId } });
		}

		if (dataValues.disliked) {
			await Art.decrement({ dislikecount: 1 }, { where: { id: artId } });
		}

		await Review.destroy({ where });

		return res.json({
			message: "Successfully deleted",
			artId,
			like: dataValues.liked,
			dislike: dataValues.disliked,
		});
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
