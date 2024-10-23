require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');
const {User} = require('./models/userModel');
const mongoose = require('mongoose');
const uri = "mongodb+srv://colinsmith:JUV2vWjYv3Sxda7J@cluster0.ywlkz.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";
app.use(express.json());


app.use('/todos',todoRouter);


mongoose.connect(uri);

app.listen(port, () => { 
  console.log(`Example app listening at port ${port}`) 
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:')); 
  db.once('open', function() {
    console.log("Connected to database");
  });

});