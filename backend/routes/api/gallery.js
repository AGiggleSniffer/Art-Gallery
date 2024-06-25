const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const {
	Gallery,
	ArtGallery,
	Art,
	GalleryTag,
	sequelize,
} = require("../../db/models");

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
	const include = [{ model: ArtGallery, include: Art }, { model: GalleryTag }];

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
	const { name, description, artIdArray, tags } = req.body;
	const payload = {
		user_id: user.id,
		name,
		description,
	};

	try {
		const result = await sequelize.transaction(async (t) => {
			const { dataValues } = await Gallery.create(payload, { transaction: t });

			const formattedTags = tags
				.map((tag) =>
					tag.length ? { gallery_id: dataValues.id, type: tag } : null,
				)
				.filter((ele) => ele);

			if (formattedTags.length > 20) {
				throw new Error("Limit of 20 tags allowed");
			}

			dataValues.GalleryTags = await GalleryTag.bulkCreate(formattedTags, {
				validate: true,
				transaction: t,
			});

			return dataValues;
		});

		const joinTablePayload = artIdArray.map((item) => ({
			art_id: item,
			gallery_id: result.id,
		}));

		await ArtGallery.bulkCreate(joinTablePayload);

		return res.status(201).json(result);
	} catch (err) {
		return next(err);
	}
});

router.put("/:galleryId", requireAuth, checkOwner, async (req, res, next) => {
	const { galleryId } = req.params;
	const { description, name, tags } = req.body;
	const include = [{ model: ArtGallery, include: Art }, { model: GalleryTag }];
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
		const formattedTags = tags
			.map((tag) => (tag.length ? { gallery_id: galleryId, type: tag } : null))
			.filter((ele) => ele);

		if (formattedTags.length > 20) {
			throw new Error("Limit of 20 tags allowed");
		}

		await sequelize.transaction(async (t) => {
			await GalleryTag.destroy({
				where: { gallery_id: galleryId },
				transaction: t,
			});

			await GalleryTag.bulkCreate(formattedTags, {
				validate: true,
				transaction: t,
			});
		});

		await Gallery.update(payload, options);

		const updatedGallery = await Gallery.findByPk(galleryId, { include });

		return res.json(updatedGallery);
	} catch (err) {
		return next(err);
	}
});

router.post(
	"/:galleryId/arts",
	requireAuth,
	checkOwner,
	async (req, res, next) => {
		const { galleryId } = req.params;
		const { artIdArray } = req.body;
		const where = { id: galleryId };
		const include = [{ model: ArtGallery, include: Art }];
		try {
			const joinTablePayload = artIdArray.map((item) => ({
				art_id: item,
				gallery_id: galleryId,
			}));

			await ArtGallery.bulkCreate(joinTablePayload);

			const results = await Gallery.findOne({ where, include });

			return res.status(201).json(results);
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
		const { galleryId } = req.params;
		const { artGalIdArr } = req.body;
		const where = { id: artGalIdArr };
		const include = [{ model: ArtGallery, include: Art }];

		try {
			await ArtGallery.destroy({ where });
			const results = await Gallery.findOne({
				where: { id: galleryId },
				include,
			});
			return res.json(results);
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
