const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

const multer = require('multer');
// create storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "."+ file.originalname.split('.').pop());
    }
})

const upload = multer({ storage: storage });

//  upload image
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('Image uploaded successfully! ' + req.body.msg);
})


//  home route
app.get('/', (req, res) => {
    res.send('Hello World!');
})

//  get parameter from url
app.get('/student/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`);
})

// not required parameter
app.get('/student-city/:city?', (req, res) => {
    if(req.params.city){
        res.send(`Student city is ${req.params.city}`);
    }else{
        res.send('Student city is unknown!');
    }
})

// query parameter
app.get('/student-class', (req, res) => {
    res.send(`Student class is ${req.query.class}`);
})

// middleware
const checkAge = (req, res, next) => {
    if(req.params.age < 18){
        res.send('You are not eligible to vote!');
    }else{
        next();
    }
}

app.get('/student-age/:age', checkAge, (req, res) => {
    res.send('You are eligible to vote!');
})

app.post('/student', (req, res) => {
    res.send(`Student name is ${req.body.name}`);
})

// set cookie
app.post('/login', (req, res) => {
    res.cookie('username', req.body.username);
    res.send('Login successful!');
})

// get cookie
app.get('/user-info', (req, res) => {
    res.send(`Welcome ${req.cookies.username}`);
})

// delete cookie
app.post('/logout', (req, res) => {
    if(req.cookies.username){
        res.clearCookie('username');
        res.send('Logout successful!')
    }else{
        res.send('You are not logged in!');
    }
})

// create server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})