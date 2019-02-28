const {mongoose} = require('./../server/db/db');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({}).then(result => {
//   console.log(result);
// });


//Todo.findByIdAndRemove()

Todo.findByIdAndDelete('5c77d699ccff8ae13b1f5d8a').then(todo => {
  console.log(todo);
});