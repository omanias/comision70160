const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express()
const PORT = 8080

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'coder@coder.com' && password === 'coderpass') {

        let token = jwt.sign({ email, password }, 'coderSecret', { expiresIn: '24h' })
        res.cookie('coderCookieToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true })
        console.log('Cookie establecida:', token);
        res.json({ message: 'Usuario logueado con éxito', token });
    } else {
        res.status(401).send('Usuario o contraseña incorrectos');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})