const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Art } = require("../../db/models");
const { environment } = require("../../config");
const isProduction = environment === "production";

router.get("/", requireAuth, async (req, res, next) => {
	const { user } = req;
	const where = { user_id: user.id };

	try {
		const myArt = await Art.findAll({ where });
		return res.json({ myArt });
	} catch (err) {
		return next(err);
	}
});

router.post("/", requireAuth, async (req, res, next) => {
	const { user } = req;
	const { galleryId, name, description, bitmap } = req.body;
	const payload = {
		user_id: user.id,
		gallery_id: galleryId,
		name,
		description,
		bitmap,
	};

	try {
		const { dataValues } = await Art.create(payload);
		return res.status(201).json(dataValues);
	} catch (err) {
		return next(err);
	}
});

router.put("/:artId", requireAuth, async (req, res, next) => {
	const { artId } = req.params;
	const { galleryId, description, bitmap } = req.body;
	const payload = {
		gallery_id: galleryId,
		description: description,
		bitmap: bitmap,
	};
	const options = {
		where: { id: artId },
		/* ONLY supported for Postgres */
		// will return the results without needing another db query
		returning: true,
		plain: true,
	};

	try {
		const updatedArt = await Spot.update(payload, options);
		// check if we are in production or if we have to make another DB query
		if (!isProduction) {
			updatedArt.sqlite = await Spot.findByPk(spotId);
		}
		return res.json(updatedArt.sqlite || updatedArt[1].dataValues);
	} catch (err) {
		return next(err);
	}
});

router.delete("/:artId", requireAuth, async (req, res, next) => {
	const { artId } = req.params;
	const where = { id: artId };

	try {
		await Art.destroy({ where });
		return res.json({ message: "Successfully deleted" });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
