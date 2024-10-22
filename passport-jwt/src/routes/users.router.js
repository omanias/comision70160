const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', async (req, res) => {
    res.render('login')
})

router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user
    res.send('You are logged in successfully with Github!')
})

module.exports = router;