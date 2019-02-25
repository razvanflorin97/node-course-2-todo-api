//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // db.collection('Todos').find({_id: new ObjectID('5c73aacea7c4732d382f33f5')}).toArray().then((docs) => {
  //   console.log('---todos---');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to get todo');
  // });

  db.collection('Users').find({name: 'Razvan'}).toArray().then((count) => {
    console.log('---todos---', count);
  }, (err) => {
    console.log('Unable to get todo');
  });

  //client.close();'
});