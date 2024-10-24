require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const todoRouter = require('./routes/todoRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const {User} = require('./models/userModel');
const mongoose = require('mongoose');
const uri = "mongodb+srv://colinsmith:JUV2vWjYv3Sxda7J@cluster0.ywlkz.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0";
const cors = require('cors');
app.use(cors());
app.use(express.json());

//set the user router to /users

app.use('/auth',authRouter);

//auth middleware
app.use(async (req, res, next) => {
  const authToken = req.headers['authorization'];

  if(authToken){
    const user = await User.findOne({authToken: authToken});
    if(user) {
      return next(); //pass the auth check
    }
    else {
      return res.status(401).send({error: "Unauthorized"});
    }
  } else {
    return res.status(401).send({error: "Unauthorized"});
  }


});;


//http://localhost:3001/users/

http://localhost:3001/todos/
app.use('/todos',todoRouter);
app.use('/users', userRouter);

mongoose.connect(uri);

app.listen(port, () => { 
  console.log(`Example app listening at port ${port}`) 
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:')); 
  db.once('open', function() {
    console.log("Connected to database");
  });

});