const Posts = require("../models/posts");

module.exports = (req, res, next) => {
    if (req.auth.isAdmin) {

        console.log(`[AUTH-ONLY] Utilisateur admin reconnu`);
        next();
    } else {
        Posts.findOne({ _id: req.params.id })
            .then(post => {
                console.log(post.author._id, req.auth.user);
                if (post.author._id.toString() === req.auth.user) {
                    next();
                } else {
                    res.status(401).json({ error: "Vous n'êtes pas autorisé à effectuer cette action" });
                }
            })
            .catch(error => res.status(404).json({ error }));
    }
};