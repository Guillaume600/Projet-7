/**
 * Pour pouvoir appeler et utiliser les extensions et les routes
 */
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const express = require('express');
const cors = require('cors');
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");
const path = require('path');
const dotEnv = require("dotenv");
dotEnv.config();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limiter chaque adresse IP à 100 requêtes toutes les 15mn
    standardHeaders: true, // Renvoyer l'info de la limite atteinte aux `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
/**
 * permet de monter la fonction middleware spécifiée
 */
app.use(express.json());
app.use(cors({
    methods:"GET, POST, PUT, DELETE, HEAD, OPTIONS"
}));
app.use(helmet({
    crossOriginResourcePolicy:false,
    expectCt: false,
    hsts: false,
}));
app.use(mongoSanitize());
app.use(limiter);
// Routes
app.use("/api", userRoutes);
app.use("/api/posts", postsRoutes);
app.use('/api/images', express.static(path.join(__dirname, './images')));

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.DB_URL, function(err) {
        if (err) { throw err; }
        console.log(`Serveur lancé sur le ${process.env.PORT} et connecté à la base de données`);
    });
});

//add helmet & mongo mask