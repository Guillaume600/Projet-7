const express = require("express");
const app = express();
require('./models/dbConfig');
const userRoutes = require("./routes/userController")

app.use('/', userRoutes);

app.listen(5500, () => console.log('Server started : 5500'));