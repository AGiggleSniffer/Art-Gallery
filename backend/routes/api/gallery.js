const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Gallery, ArtGallery, Art } = require("../../db/models");
const { environment } = require("../../config");
const isProduction = environment === "production";

const checkOwner = async (req, _res, next) => {
	const { user } = req;
	const { galleryId } = req.params;
	const where = { id: galleryId };

	try {
		const myGallery = await Gallery.findOne({ where });
		if (myGallery.user_id === user.id) {
			return next();
		} else throw new Error("Not Authorized");
	} catch (err) {
		next(err);
	}
};

router.get("/", async (_req, res, next) => {
	const include = [{ model: ArtGallery, include: Art }];
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
	const include = [{ model: ArtGallery, include: Art }];

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
	const include = [{ model: ArtGallery, include: Art }];

	try {
		const galleries = await Gallery.findOne({ where, include });
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

router.put("/:galleryId", requireAuth, checkOwner, async (req, res, next) => {
	const { galleryId } = req.params;
	const { description, name } = req.body;
	const payload = {
		description,
		name,
	};
	const options = {
		where: { id: galleryId },
		/* ONLY supported for Postgres */
		// will return the results without needing another db query
		returning: true,
		plain: true,
	};

	try {
		const updatedGallery = await Gallery.update(payload, options);
		// check if we are in production or if we have to make another DB query
		if (!isProduction) {
			updatedGallery.sqlite = await Gallery.findByPk(galleryId);
		}
		return res.json(updatedGallery.sqlite || updatedGallery[1].dataValues);
	} catch (err) {
		return next(err);
	}
});

router.put(
	"/:galleryId/arts",
	requireAuth,
	checkOwner,
	async (req, res, next) => {
		const { galleryId } = req.params;
		const { artIdArray } = req.body;
		try {
			const joinTablePayload = artIdArray.map((item) => ({
				art_id: item,
				gallery_id: galleryId,
			}));

			await ArtGallery.bulkCreate(joinTablePayload);

			return res.json({ message: "Succesfully edited" });
		} catch (err) {
			return next(err);
		}
	},
);

router.delete(
	"/:galleryId/arts",
	requireAuth,
	checkOwner,
	async (req, res, next) => {
		const { artGalIdArr } = req.body;
		const where = { id: artGalIdArr };

		try {
			const result = await ArtGallery.destroy({ where });
			return res.json({ message: `Successfully deleted ${result} items` });
		} catch (err) {
			return next(err);
		}
	},
);

router.delete(
	"/:galleryId",
	requireAuth,
	checkOwner,
	async (req, res, next) => {
		const { galleryId } = req.params;
		const where = { id: galleryId };

		try {
			await Gallery.destroy({ where });
			return res.json({ message: "Successfully deleted" });
		} catch (err) {
			return next(err);
		}
	},
);

module.exports = router;
