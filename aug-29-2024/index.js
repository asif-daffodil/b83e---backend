const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4000;

async function mongooseConnect() {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/mongoose83')
    }catch(err){
        console.log(err.message);
    }
}

mongooseConnect();

// Create a user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: {
            value: true,
            message: 'Email is required'
        },
        unique: {
            value: true,
            message: 'Email must be unique'
        }
    },
    phone: {
        type: String,
        required: {
            value: true,
            message: 'Phone number is required'
        },
        unique: {
            value: true,
            message: 'Phone number must be unique'
        }
    }
});



// Create a user model
const User = mongoose.model('User', userSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
    });

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/addUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send('User added successfully');
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).send('Email or Phone number already exists');
        } else {
            res.status(400).send(err.message);
        }
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/updateUser/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send('User updated successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/deleteUser/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send('User deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});