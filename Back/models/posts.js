const mongoose = require("mongoose");

const postsModel = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    usersLiked: { type: [String], default: [] },
    createdAt: { type: Date, required: true }
});

module.exports = mongoose.model("Posts", postsModel);