const Posts = require("../models/posts");

exports.getAllPosts = (req, res, next) => {
    Posts.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getPostById = (req, res, next) => {
    Posts.findById(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const post = new Posts({
        ...postObject,
        author: req.auth.user,
        createdAt: Date.now()
    });

    if (req.file) {
        post.imageUrl = `/images/${req.file.filename}`;
    }

    post.save()
        .then(() => { res.status(201).json({ message: "Post crée !" }) })
        .catch(error => res.status(400).json({ error }));
};

exports.likePost = (req, res, next) => {
    Posts.findById(req.params.id)
        .then((post) => {
            post.usersLiked = post.usersLiked.filter(userId => {
                return userId !== req.auth.user;
            });
            let like = false;
            if (req.body.like) {
                like = true;
                post.usersLiked.push(req.auth.user);
            }
            post.save()
                .then(() => { res.status(201).json({ message: `Post ${like ? "" : "non"} liké !` }) })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
}