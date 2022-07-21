const express = require("express");
const router = express.Router();

const { UserModel } = require('../models/user');

router.get('/', (req, res) => {
    UserModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data :" + err);
    })
})

module.exports = router