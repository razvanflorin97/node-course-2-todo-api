//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// let obj = new ObjectID();
// console.log(obj);


//console.log(MongoClient);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //new doc into users collection
  // db.collection('Users').insertOne({
  //   //_id : 1,
  //   name: 'Razvan v3',
  //   age: 21,
  //   location: 'Romania'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert user');
  //   }
  //   console.log('New user into database');
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  client.close();
});