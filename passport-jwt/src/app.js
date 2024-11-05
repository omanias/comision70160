const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const initializePassport = require('../src/config/passport.config.js');
const { passportCall } = require('./utils.js');

const app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

mongoose.connect('mongodb+srv://omarmanias:1234562024@cluster0.bxjfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://omarmanias:1234562024@cluster0.bxjfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        ttl: 600,
    }),
    secret: 'coderSecret',
    resave: false,
    saveUninitialized: false
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user);
})

/* app.get('/current', passportCall('jwt'), (req, res) => {
    if (!user) return done(null, false, { messages: "no se encontró el usuario" })
    res.send(req.user);
}) */

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})