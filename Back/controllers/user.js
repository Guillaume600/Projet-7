const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const config = require("../config");


const User = require("../models/User");

exports.signup = (req, res, next) => {
    console.log("[Signup] Inscription utilisateur");
    if (!req.body.password || !req.body.email) {
        console.log(req.body);
        console.log(`[Signup] Inscription échouée : utilisateur ou mdp requis`);
        res.status(400).json({ message: "Utilisateur ou mot de passe requis" });
        return;
    }
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => {
                    console.log(`[Signup] Utilisateur ajouté : ${user.email}`);
                    res.status(201).json({ message: "Utilisateur créé !" });
                })
                .catch(error => {
                    console.log(`[Signup] Erreur lors de l'ajout d'utilisateur : ${error}`);
                    res.status(400).json({ message: error });
                });
        })
        .catch(error => {
            console.log(`[Signup] Erreur lors de l'ajout d'utilisateur : ${error}`);
            res.status(500).json({ message: error });
        });
};

exports.login = (req, res, next) => {
    console.log("[Login] Connexion de l'utilisateur");
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                console.log(`[Login] Erreur de connexion : email inconnu : ${req.body.email} `);
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            console.log(`[Login] Erreur de connexion : mot de passe incorrect : ${req.body.email} `);
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                        } else {
                            console.log(`[Login] Connexion réussie : ${req.body.email} `);
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: "24h" })
                            });
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).json({ message: error });
                    })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: error });
        })
};

exports.me = (req, res, next) => {
    const userId = req.auth.user;
    User.findById(userId)
    .then(user => {
        user.password=undefined;
        res.status(200).json(user);
    })
    .catch(error => res.status(500).json({ error }));
};