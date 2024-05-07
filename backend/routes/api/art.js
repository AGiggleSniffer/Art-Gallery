const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Art } = require("../../db/models");
const { environment } = require("../../config");
const isProduction = environment === "production";

router.get("/", async (req, res) => {
	const { user } = req;
	const where = { user_id: user.id };
	const myArt = await Art.findAll({ where });
	return res.json({ myArt, user });
});

router.post("/", async (req, res, next) => {
	const { user } = req;
	const { galleryId, description, bitmap } = req.body;
	const payload = {
		user_id: user.id,
		gallery_id: galleryId,
		description: description,
		bitmap: bitmap,
	};

	try {
		const { dataValues } = await Art.create(payload);
		return res.status(201).json(dataValues);
	} catch (err) {
		return next(err);
	}
});

router.put("/:artId", async (req, res, next) => {
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

router.delete("/:artId", async (req, res, next) => {
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
