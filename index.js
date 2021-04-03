const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kpa70.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority";

console.log(process.env.DB_NAME)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookCollection = client.db("Book_Store").collection("books");

  app.post('/addItems', (req,res) =>{
    const selectedBook = req.body;
    console.log('db connected')
    bookCollection.insertOne(selectedBook)
    .then(result =>{
      console.log(result.insertedCount);
      res.send(result.insertedCount);
    })
  })
  
});

app.listen(port);