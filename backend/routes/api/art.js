const router = require("express").Router();
const { requireAuth } = require("../../utils/auth");
const { Art } = require("../../db/models");
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

	try {
		const myArt = await Art.findOne({ where });
		if (myArt) {
			return res.json(myArt);
		} else throw new Error("No Art Found");
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
		const { dataValues } = await Art.create(payload);
		return res.status(201).json(dataValues);
	} catch (err) {
		return next(err);
	}
});

router.put("/:artId", requireAuth, checkOwner, async (req, res, next) => {
	const { artId } = req.params;
	const { name, description, dataURL } = req.body;
	const payload = {
		name,
		description,
		data_url: dataURL,
	};
	const options = {
		where: { id: artId },
		/* ONLY supported for Postgres */
		// will return the results without needing another db query
		returning: true,
		plain: true,
	};

	try {
		const updatedArt = await Art.update(payload, options);
		// check if we are in production or if we have to make another DB query
		if (!isProduction) {
			updatedArt.sqlite = await Art.findByPk(artId);
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
