const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 4000;

// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongodb
const uri = 'mongodb://localhost:27017/batch83';
const client = new MongoClient(uri);


// create server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// home route
app.get('/', (req, res) => {
  res.send('Hello World');
});


// get all students
app.get('/students', async (req, res) => {
  try {
    await client.connect();
    const students = await client.db().collection('students').find().toArray();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
});

// get student by id on object id
app.get('/students/:id', async (req, res) => {
  try {
    await client.connect();
    const student = await client.db().collection('students').findOne({ _id: new ObjectId(req.params.id) });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create student
app.post('/students', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db().collection('students').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update student by id
app.put('/students/:id', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db().collection('students').updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete student by id
app.delete('/students/:id', async (req, res) => {
  try {
    await client.connect();
    const result = await client.db().collection('students').deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});