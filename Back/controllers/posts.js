const Posts = require("../models/posts");
const fs = require("fs");

exports.getAllPosts = (req, res, next) => {
    Posts.find()
        .sort({
            createdAt: "descending"
        })
        .populate("author")
        .then(posts => {
            posts.forEach(post => {
                post.author.admin = undefined;
                post.author.password = undefined;
                post.author.email = post.author.email.split("@")[0].replaceAll(".", " ");
            });
            return posts;
        })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.getPostById = (req, res, next) => {
    Posts.findById(req.params.id)
        .populate("author")
        .then(post => {
            post.author.admin = undefined;
            post.author.password = undefined;
            post.author.email = post.author.email.split("@")[0].replaceAll(".", " ");
            return post;
        })

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

exports.deletePost = (req, res, next) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post.imageUrl) {
                const postImageUrl = post.imageUrl.split("/").pop();
                try {
                    fs.rm(`./images/${postImageUrl}`, (error) => {
                        if (error) {
                            res.status(400).json({ error });
                        } else {
                            Posts.deleteOne({ _id: req.params.id })
                                .then(() => res.status(200).json({ message: "Post supprimé !" }))
                                .catch((error) => res.status(400).json({ error }));
                        }
                    });
                } catch (error) {
                    res.status(500).json({ error });
                }

            } else {
                Posts.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Post supprimé !" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
};

exports.updatePost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `/images/${req.file.filename}`
    } : { ...JSON.parse(req.body.post) };

    delete postObject._userId;
    Posts.findOne({ _id: req.params.id })
        .then((post) => {
            //si fichier modifié
            if (req.file) {
                if (post.imageUrl) {
                    const postImageUrl = post.imageUrl.split("/").pop();
                try {
                    fs.rm(`./images/${postImageUrl}`, (error) => {
                        if (error) {
                            res.status(400).json({ error });
                        }
                    });
                } catch (error) {
                    res.status(500).json({ error });
                } 
            }
            }
    
            Posts.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Post modifié !' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
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
                .then(() => { res.status(201).json({ like: post.usersLiked }) })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
}

