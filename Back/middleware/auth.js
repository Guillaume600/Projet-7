const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const userId = decodedToken.userId;
        User.findById(userId)
            .then(user => {
                req.auth = {
                    user: userId,
                    isAdmin: user.admin
                };
                next();
            })
            .catch(error => res.status(401).json({ error }));
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Vous devez vous connecter" });
    }
};