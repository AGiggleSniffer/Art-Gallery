const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Art, ArtTag, sequelize } = require("../../db/models");
const { environment } = require("../../config");
const isProduction = environment === "production";

const checkOwner = async (req, _res, next) => {
	const { user } = req;
	const { artId } = req.params;
	const where = { id: artId };

	try {
		const myArt = await Art.findOne({ where });
		if (myArt.user_id === user.id) {
			return next();
		} else throw new Error("Not Authorized");
	} catch (err) {
		next(err);
	}
};

router.get("/", async (_req, res, next) => {
	try {
		const myArt = await Art.findAll();
		return res.json(myArt);
	} catch (err) {
		return next(err);
	}
});

router.get("/owned", requireAuth, async (req, res, next) => {
	const { user } = req;
	const where = { user_id: user.id };

	try {
		const myArt = await Art.findAll({ where });
		return res.json(myArt);
	} catch (err) {
		return next(err);
	}
});

router.get("/:artId", async (req, res, next) => {
	const { artId } = req.params;
	const where = { id: artId };
	const include = [{ model: ArtTag }];

	try {
		const myArt = await Art.findOne({ where, include });
		if (myArt) {
			return res.json(myArt);
		} else throw new Error("No Art Found");
	} catch (err) {
		return next(err);
	}
});

router.post("/", requireAuth, async (req, res, next) => {
	const { user } = req;
	const { name, description, dataURL, tags } = req.body;
	const payload = {
		user_id: user.id,
		name,
		description,
		data_url: dataURL,
		tags,
	};

	try {
		const result = await sequelize.transaction(async (t) => {
			const { dataValues } = await Art.create(payload, { transaction: t });

			const formattedTags = tags
				.map((tag) =>
					tag.length ? { art_id: dataValues.id, type: tag } : null,
				)
				.filter((ele) => ele);

			if (formattedTags.length > 20) {
				throw new Error("Limit of 20 tags allowed");
			}

			dataValues.ArtTags = await ArtTag.bulkCreate(formattedTags, {
				validate: true,
				transaction: t,
			});

			return dataValues;
		});

		return res.status(201).json(result);
	} catch (err) {
		return next(err);
	}
});

router.put("/:artId", requireAuth, checkOwner, async (req, res, next) => {
	const { artId } = req.params;
	const { name, description, dataURL, tags } = req.body;
	const include = [{ model: ArtTag }];
	const payload = {
		name,
		description,
		data_url: dataURL,
	};
	const options = {
		include,
		where: { id: artId },
		/* ONLY supported for Postgres */
		// will return the results without needing another db query
		returning: true,
		plain: true,
	};

	try {
		const formattedTags = tags
			.map((tag) => (tag.length ? { art_id: artId, type: tag } : null))
			.filter((ele) => ele);

		if (formattedTags.length > 20) {
			throw new Error("Limit of 20 tags allowed");
		}

		await sequelize.transaction(async (t) => {
			await ArtTag.destroy({
				where: { art_id: artId },
				transaction: t,
			});

			await ArtTag.bulkCreate(formattedTags, {
				validate: true,
				transaction: t,
			});
		});

		const updatedArt = await Art.update(payload, options);

		// check if we are in production or if we have to make another DB query
		if (!isProduction) {
			updatedArt.sqlite = await Art.findByPk(artId, { include });
		}

		return res.json(updatedArt.sqlite || updatedArt[1].dataValues);
	} catch (err) {
		return next(err);
	}
});

router.delete("/:artId", requireAuth, checkOwner, async (req, res, next) => {
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
