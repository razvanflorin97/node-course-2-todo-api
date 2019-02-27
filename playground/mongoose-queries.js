const {mongoose} = require('./../server/db/db');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID} = require('mongodb');


// let id = '5c76854322f8852394708a0c';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('todos: ', todos);
// });


// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo){
//     return console.log('ID not found');
//   }
//   console.log('Todo by id:', todo);
// })
// .catch((e) => {
//   console.log(e);
// });

let userID = '5c7694f6ccff8ae13b1f33b0';

User.findById(userID).then((user) => {
  if(!user){
    return console.log('User not found');
  }
  console.log('User:', user);s
}, (e) => {
  console.log(e);
});

