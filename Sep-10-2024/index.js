const express = require('express');
const app = express();
const port = 3000;
// cors
const cors = require('cors');
app.use(cors());
//  body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// mongoose
const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/express-mongo');

// schema
const Schema = mongoose.Schema;
const studentSchema = new Schema({
    name: String,
    age: Number,
    address: String
});

// model
const studentModel = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// insert student
app.post('/student', (req, res) => {
    const student = new studentModel(req.body);
    student.save().then(() => {
        res.send('inserted');
    }).catch(err => {
        res.status(400).send('unable to save to database');
    });
});

// get all students
app.get('/students', (req, res) => {
    studentModel.find().then(students => {
        res.json(students);
    }).catch(err => {
        res.status(400).send('unable to get students');
    });
})

// get student by id
app.get('/student/:id', (req, res) => {
    studentModel.findById(req.params.id).then(student => {
        res.json(student);
    }).catch(err => {
        res.status(400).send('unable to get student');
    });
});

// update student by id
app.put('/student/:id', (req, res) => {
    studentModel.findById(req.params.id).then(student => {
        student.name = req.body.name;
        student.age = req.body.age;
        student.address = req.body.address;
        student.save().then(() => {
            res.send('updated');
        }).catch(err => {
            res.status(400).send('unable to update student');
        });
    }).catch(err => {
        res.status(400).send('unable to update student');
    });
});

// delete student by id
app.delete('/student/:id', (req, res) => {
    studentModel.findByIdAndDelete(req.params.id).then(() => {
        res.send('deleted');
    }).catch(err => {
        res.status(400).send('unable to delete student');
    });
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
