const express = require('express');
const bodyParser = require('body-parser');

//Local
const {mongoose} = require('./db/db');
const {Todo: todoModel} = require('./models/todo');
const {User: userModel} = require('./models/user');

//App config
let app = express();
app.use(bodyParser.json());


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



let PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});


module.exports = {
  app
};


