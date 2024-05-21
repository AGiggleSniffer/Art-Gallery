const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Gallery, ArtGallery } = require("../../db/models");
const { environment } = require("../../config");
const isProduction = environment === "production";

router.get("/", async (_req, res, next) => {
	const include = [{ model: ArtGallery }];
	try {
		const galleries = await Gallery.findAll({ include });
		return res.json(galleries);
	} catch (err) {
		return next(err);
	}
});

router.get("/owned", requireAuth, async (req, res, next) => {
	const { user } = req;
	const where = { user_id: user.id };
	const include = [{ model: ArtGallery }];

	try {
		const galleries = await Gallery.findAll({ where, include });
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
	const { name, description, artIdArray } = req.body;
	const payload = {
		user_id: user.id,
		name,
		description,
	};

	try {
		const { dataValues } = await Gallery.create(payload);

		const joinTablePayload = artIdArray.map((item) => ({
			art_id: item,
			gallery_id: dataValues.id,
		}));

		await ArtGallery.bulkCreate(joinTablePayload);

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
