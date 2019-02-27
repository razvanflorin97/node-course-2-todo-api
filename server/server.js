const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Local
const {mongoose} = require('./db/db');
const {Todo: todoModel} = require('./models/todo');
const {User: userModel} = require('./models/user');

//App config
let app = express();
app.use(bodyParser.json());

//Routes
app.post('/todos', (req, res) => {
  let todo = new todoModel({
    text: req.body.text,
    completed: req.body.completed
  });
  todo.save()
  .then((todo) => {
    res.send(todo);
  }, (e) => {
    res.status(400).send(e);
});
});

app.get('/todos', (req, res) => {
  todoModel.find().then((todos) => {
    res.send({todos: todos});
  }, (err) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  //valid id using isValid
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  todoModel.findById(id).then((todo) => {
    if (!todo){
      res.status(404).send();
    }
    res.send({todo});
  }).catch(e => {
    res.status(400).send();
  });
  
});



let PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});


module.exports = {
  app
};

