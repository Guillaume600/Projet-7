const mongoose = require("mongoose");

const UserModel = mongoose.model(
    "Projet7", {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    "posts"
);

module.exports = { UserModel };