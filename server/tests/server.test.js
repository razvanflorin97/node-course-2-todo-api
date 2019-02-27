const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const dummyTodos = [
  {
    text: 'First test todo',
    _id: new ObjectID()
  },
  {
    text: 'Second test todo',
    _id: new ObjectID()
  }
];


beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(dummyTodos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text: text})
    .expect(200)
    .expect((res) => {
      console.log(res.body.text);
      expect(res.body.text).toBe(text);
    })
    .end((err) => {
      if(err){
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      })
      .catch((e) => {
        done(e);
      });
    });
  });


  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err) => {
      if(err){
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});


describe('GET /todos', () => {
  it('should get all todos', (done) =>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(dummyTodos[0].text);
    })
    .end(done);
  });

  it('should return a 404 if todo not found', (done) => {
    request(app)
    .get('/todos/5c7694f6ccff8ae13b1f33b0')
    .expect(404)
    .end(done);
  });


  it('should return 404 for non-object id\'s', (done) => {
    request(app)
    .get('/todos/5c7694f6ccff8ae13b1f33b')
    .expect(404)
    .end(done);
  });
});