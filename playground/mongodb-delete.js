//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

 db.collection('Users').findOneAndDelete({name: 'Razvan'}).then((result) => {
   console.log(JSON.stringify(result, undefined, 2));
 })

  //client.close();'
});