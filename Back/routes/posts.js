const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const posts = require("../controllers/posts");
const multer = require("../middleware/multer-config");
const authorOnly = require("../middleware/author-only");

router.get("/", auth, posts.getAllPosts);
router.get("/:id", auth, posts.getPostById);
router.post("/", auth, multer, posts.createPost);
//router.put("/:id", auth, authorOnly, multer, sauceCtrl.updateSauce);
//router.delete("/:id", auth, ownerOnly, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, posts.likePost);

module.exports = router;