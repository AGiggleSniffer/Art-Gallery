const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Art, ArtTag, User, Review, sequelize } = require("../../db/models");

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
			res.json({ message: "Successfully Liked", artId: artId });
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
			res.json({ message: "Successfully Disliked", artId: artId });
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
		await Review.destroy({ where });
		return res.json({ message: "Successfully deleted" });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
