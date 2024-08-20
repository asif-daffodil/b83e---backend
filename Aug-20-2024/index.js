const express = require('express');
const app = express();
const port = 5000;

// cors
const cors = require('cors');
app.use(cors());

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// route
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/about', (req, res) => {
    res.send('About Us');
})

// params
app.get('/user/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
})

//  multiple params
app.get('/user/:name/:city', (req, res) => {
    res.send(`User Name: ${req.params.name} City: ${req.params.city}`);
})

// query
app.get('/shaon', (req, res) => {
    res.send(`Shaon is a ${req.query.nature} person and he lives in ${req.query.city}`);
})

// post
app.post('/contact', (req, res) => {
    req.body.msg = 'Hello World';
    res.send(req.body);
})

// cookie
app.get('/cookie', (req, res) => {
    res.cookie('name', 'shaon');
    res.cookie('city', 'dhaka');
    res.send('Cookie set');
})

// get cookie
app.get('/getcookie', (req, res) => {
    res.send(req.cookies);
})

// create server
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});