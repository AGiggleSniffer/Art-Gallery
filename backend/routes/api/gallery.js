const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Gallery } = require("../../db/models");
const { environment } = require("../../config");
const isProduction = environment === "production";

router.get("/", async (_req, res, next) => {
	try {
		const galleries = await Gallery.findAll();
		return res.json(galleries);
	} catch (err) {
		return next(err);
	}
});

router.get("/owned", requireAuth, async (req, res, next) => {
	const { user } = req;
	const where = { user_id: user.id };

	try {
		const galleries = await Gallery.findAll({ where });
		return res.json(galleries);
	} catch (err) {
		return next(err);
	}
});

router.get("/:galleryId", async (req, res, next) => {
	const { galleryId } = req.params;
	const where = { id: galleryId };

	try {
		const galleries = await Gallery.findOne({ where });
		if (galleries) {
			return res.json(galleries);
		} else throw new Error("No Galleries Found");
	} catch (err) {
		return next(err);
	}
});

router.post("/", requireAuth, async (req, res, next) => {
	const { user } = req;
	const { name, description, dataURL } = req.body;
	const payload = {
		user_id: user.id,
		name,
		description,
		data_url: dataURL,
	};

	try {
		const { dataValues } = await Gallery.create(payload);
		return res.status(201).json(dataValues);
	} catch (err) {
		return next(err);
	}
});

router.put("/:galleryId", requireAuth, async (req, res, next) => {
	const { galleryId } = req.params;
	const { description } = req.body;
	const payload = {
		description: description,
	};
	const options = {
		where: { id: galleryId },
		/* ONLY supported for Postgres */
		// will return the results without needing another db query
		returning: true,
		plain: true,
	};

	try {
		const updatedGallery = await Spot.update(payload, options);
		// check if we are in production or if we have to make another DB query
		if (!isProduction) {
			updatedGallery.sqlite = await Spot.findByPk(spotId);
		}
		return res.json(updatedGallery.sqlite || updatedGallery[1].dataValues);
	} catch (err) {
		return next(err);
	}
});

router.delete("/:galleryId", requireAuth, async (req, res, next) => {
	const { galleryId } = req.params;
	const where = { id: galleryId };

	try {
		await Gallery.destroy({ where });
		return res.json({ message: "Successfully deleted" });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
