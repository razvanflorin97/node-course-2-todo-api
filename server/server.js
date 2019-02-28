const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

//Local
const {mongoose} = require('./db/db');
const {Todo: todoModel} = require('./models/todo');
const {User: userModel} = require('./models/user');

//App config
let app = express();
const port = process.env.port || 3000;
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
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(e => {
    res.status(400).send();
  });
  
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  todoModel.findByIdAndDelete(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(err => {
    res.status(400).send();
  });
});



//let PORT = 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


module.exports = {
  app
};

