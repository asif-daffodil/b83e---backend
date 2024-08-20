const express = require('express');
const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
const port = 5000;

const myCompany = (req, res, next) => {
    console.log("My Company Middleware");
    next();
}

const checkAdmin = (req, res, next) => {
    if(req.query.admin !== 'true') {
        res.status(401).send("Should be admin");
    }
    next();
}

app.get('/', myCompany, (req, res) => {
    res.send("Hello World");
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

app.get('/user/:name?', (req, res) => {
    const name = typeof req.params.name == 'undefined' ? 'Guest' : req.params.name
    res.send("You name is : " + name);
})

app.get('/test', (req, res) => {
    res.send(req.query.name + " " + req.query.city);
})

app.get('/admin', checkAdmin, (req, res) => {
    res.send("Hello Admin");
})

app.get('/welcome', (req, res) => {
    res.render('welcome', {title: 'Express'});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
