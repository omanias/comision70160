const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const usersRouter = require('./routes/users.router.js');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const initializePassport = require('../src/config/passport.config.js')

const app = express()
const PORT = 8080

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('');

 app.use(session({
    store: MongoStore.create({
        mongoUrl: '',
        ttl: 600,
    }),
    secret: 'coderSecret',
    resave: false,
    saveUninitialized: false
})); 
 
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser())
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use('/api/sessions', usersRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})