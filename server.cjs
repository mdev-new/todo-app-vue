const app = require('express')()
const cors = require('cors')
const port = 3000

app.use(cors())

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

app.post('/register', (req, res) => {
  users.push(new User(req.body.username))
  res.send('ok')
})

app.get('/todos/:user', (req, res) => {
  res.json(user(req.params.user).todos)
})

app.post('/todos/:user', (req, res) => {
  user(req.params.user).todos.push(req.body)
  res.status(200).send()
})

app.post('/todos/:user/:id', (req, res) => {
  user(req.params.user).todos[req.params.id] = req.body
  res.status(200).send()
})

app.get('/', (req, res) => {
  res.send("Ahoj!")
})

app.listen(port, () => {
  console.log(`Běžím na portu ${port}`)
})
