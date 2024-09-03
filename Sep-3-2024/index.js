const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use('/external', express.static(`${__dirname}/node_modules/`));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/login_register');

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (req, res) => {
    User.findOne({ username: req.body.username }).then((user) => {
        if (user) {
            res.send('User already exists');
        }else{
            if(req.body.password.length < 6){
                res.send('Password must be at least 6 characters');
            }else{
                const user = new User({
                    username: req.body.username,
                    password: req.body.password
                });
                user.save().then(() => {
                    res.send('User created');
                })
            }
        }
    })
});

app.post('/login', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password }).then((user) => {
        if (user) {
            res.cookie('username', req.body.username, { expire: 60 + Date.now() });
            res.send('Login success');
        } else {
            res.send('Login failed');
        }
    }).catch((err) => {
        res.send(err.message);
    });
});

app.get('/user-data', (req, res) => {
    if (req.cookies.username) {
        res.send(req.cookies.username);
    } else {
        res.send('Not logged in');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.send('Logged out');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);