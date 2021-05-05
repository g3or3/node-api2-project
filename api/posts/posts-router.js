const router = require("express").Router();

const Post = require("./posts-model");

router.get("/", async (req, res) => {
	try {
		const posts = await Post.find();
		res.json(posts);
	} catch (err) {
		res.status(500).json({
			message: "The posts information could not be retrieved",
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post) {
			res.json(post);
		} else {
			res.status(404).json({
				message: "The post with the specified ID does not exist",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: "The post information could not be retrieved",
		});
	}
});

router.post("/", async (req, res) => {
	if (!req.body.title && !req.body.contents) {
		res.status(400).json({
			message: "Please provide title and contents for the post",
		});
	} else {
		try {
			const newPost = await Post.insert(req.body);
			res.status(201).json(newPost);
		} catch (err) {
			res.status(500).json({
				message: "The was an error while saving the post to the database",
			});
		}
	}
});

router.put("/:id", async (req, res) => {
	if (!req.body.title && !req.body.contents) {
		res.status(400).json({
			message: "Please provide title and contents for the post",
		});
	} else {
		try {
			const updatedPost = await Post.update(req.params.id, req.body);
			if (!updatedPost) {
				res.status(404).json({
					message: "The post with the specified ID does not exist",
				});
			} else {
				res.json(updatedPost);
			}
		} catch (err) {
			res.status(500).json({
				message: "The post information could not be modified",
			});
		}
	}
});

router.delete("/:id", async (req, res) => {
	try {
		if (await Post.remove(req.params.id)) {
			res.json(req.body);
		} else {
			res.status(404).json({
				message: "The post with the specified ID does not exist",
			});
		}
	} catch (err) {
		res.status(500).json({ messsage: "The post could not be removed" });
	}
});

router.get("/:id/comments", async (req, res) => {
	try {
		const comments = await Post.findCommentById(req.params.id);
		if (!comments) {
			res.status(404).json({
				messsage: "The post with the specified ID does not exist.",
			});
		} else {
			res.json(comments);
		}
	} catch (err) {
		res.status(500).json({
			message: "The comments information could not be retrieved",
		});
	}
});

module.exports = router;
