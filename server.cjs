const express = require('express');
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json())

class User {
  username = ""
  todos = []
  constructor(uname) {
    this.username = uname;
    this.todos = [];
  }
}

// Ano, šla by implementovat lepší DB
// ale toto je momentálně nejjednodušší :)
const users = []

const user = (username) => users.find(val => val.username == username)

app.post('/register/:username', (req, res) => {
  const uname = req.params.username;
  const u = user(uname);

  if(!u) {
    users.push(new User(uname))
    res.json({
      status: 'success',
      message: 'Successfully registered.'
    })
  } else {
    res.status(500).json({
      status: 'fail',
      message: 'User already exists.'
    })
  }
})

app.get('/todos/:user', (req, res) => {
  const u = user(req.params.user);
  if(!u) {
    res.status(404).json({
      status: 'fail',
      message: 'User not found.'
    })
    return;
  }

  res.json({
    status: 'success',
    message: 'Successfully loaded.',
    todos: u.todos
  })
})

app.post('/todos/:user', (req, res) => {
  const u = user(req.params.user);
  if(!u) {
    res.status(404).json({status: 'not_found'})
    return;
  }

  u.todos.push(req.body)
  res.status(200).json({
    status: 'success'
  })
})

app.post('/todos/:user/:id', (req, res) => {
  const u = user(req.params.user);
  const i = req.params.id;
  if(!u) {
    res.status(404).json({status: 'not_found'})
    return;
  }

  if(Object.keys(req.body).length === 0) {
    // empty obj; delete the todo
    u.todos.splice(i, 1)
  } else {
    u.todos[i] = req.body
  }

  res.status(200).json({
    status: 'success'
  })
})

app.get('/', (req, res) => {
  res.send("Ahoj!")
})

app.listen(port, () => {
  console.log(`Běžím na portu ${port}`)
})
