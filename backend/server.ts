import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import {
  SERVER_STATUS,
  SERVER_STATUS_EXTRA
} from '../enum/status.js'

import type {
  User,
  ToDo
} from '../types/types'

const app = express()
const port = process.env.port || 5000

app.use(cors())
app.use(express.json())

// Ano, šla by implementovat lepší DB
// ale toto je momentálně nejjednodušší :)
const users : User[] = []

const makeUser = (username) : User => ({
  username: username,
  todos: []
})

const findUser = (username) => users.find(val => val.username === username)

const makeTodo = (text, color, deadline, priority): ToDo => ({
  uuid: uuidv4(),
  text: text,
  color: color,
  done: false,
  doneDate: null,
  deadline: deadline,
  priority: priority
})

const findTodoIndex = (user: User, uuid: string) => user.todos.findIndex(todo => todo.uuid === uuid)

app.post('/register/:username', (req, res) => {
  const username = req.params.username;
  const user = findUser(username);

  if(user) {
    res.status(400).json({
      status: SERVER_STATUS.FAIL,
      extra_status: SERVER_STATUS_EXTRA.ALREADY_EXISTS,
      message: 'Uživatel již existuje.'
    })

    return;
  }

  users.push(makeUser(username))

  res.status(201).json({
    status: SERVER_STATUS.SUCCESS,
    extra_status: null,
    message: 'Úspěšně registrováno.'
  })
})

app.get('/login/:username', (req, res) => {
  const username = req.params.username;
  const user = findUser(username);

  if(!user) {
    res.status(404).json({
      status: SERVER_STATUS.FAIL,
      extra_status: SERVER_STATUS_EXTRA.NOT_FOUND,
      message: 'Uživatel neexistuje.'
    })

    return;
  }

  res.status(200).json({
    status: SERVER_STATUS.SUCCESS,
    extra_status: null,
    message: 'Úspěšně načteno.',
    user: user
  })
})

app.get('/todos/:username', (req, res) => {
  const user = findUser(req.params.username);

  if(!user) {
    res.status(404).json({
      status: SERVER_STATUS.FAIL,
      extra_status: SERVER_STATUS_EXTRA.NOT_FOUND,
      message: "Uživatel nenalezen"
    })

    return;
  }

  res.status(200).json({
    status: SERVER_STATUS.SUCCESS,
    extra_status: null,
    message: "Úspěšně načteno.",
    todos: user.todos
  })
})

app.post('/todos/:user', (req, res) => {
  const body = req.body;
  const user = findUser(req.params.user);

  if(!user) {
    res.status(404).json({
      status: SERVER_STATUS.FAIL,
      extra_status: SERVER_STATUS_EXTRA.NOT_FOUND,
      message: "Uživatel nenalezen"
    })

    return;
  }

  // todo validation
  const todo = makeTodo(
    body.text,
    body.color,
    body.deadline,
    body.priority
  )

  user.todos.push(todo)

  res.status(201).json({
    status: SERVER_STATUS.SUCCESS,
    extra_status: null,
    message: "Todo úspěšně uloženo.",
    todo: todo
  })
})

app.put('/todos/:user/:uuid', (req, res) => {
  const user = findUser(req.params.user);
  const uuid = req.params.uuid;

  if(!user || !uuid) {
    res.status(404).json({
      status: SERVER_STATUS.FAIL,
      extra_status: SERVER_STATUS_EXTRA.NOT_FOUND,
      message: "Uživatel nenalezen"
    })

    return;
  }

  const todoIndex = findTodoIndex(user, uuid)

  if(todoIndex == -1) {
    res.status(404).json({
      status: SERVER_STATUS.FAIL,
      extra_status: SERVER_STATUS_EXTRA.NOT_FOUND,
      message: "Todo nenalezeno."
    })

    return;
  }

  // todo validation
  user.todos[todoIndex] = req.body;

  res.status(201).json({
    status: SERVER_STATUS.SUCCESS,
    extra_status: null,
    message: "Todo úspěšně aktualizováno.",
    index: todoIndex
  })
})

app.delete('/todos/:user/:uuid', (req, res) => {
  const user = findUser(req.params.user);
  const uuid = req.params.uuid;

  if(!user || !uuid) {
    res.status(404).json({
      status: SERVER_STATUS.FAIL,
      extra_status: SERVER_STATUS_EXTRA.NOT_FOUND,
      message: "Uživatel nenalezen"
    })

    return;
  }

  const todoIndex = findTodoIndex(user, uuid)

  if(todoIndex == -1) {
    res.status(404).json({
      status: SERVER_STATUS.FAIL,
      extra_status: SERVER_STATUS_EXTRA.NOT_FOUND,
      message: "Todo nenalezeno."
    })

    return;
  }

  user.todos.splice(todoIndex, 1)

  res.status(202).json({
    status: SERVER_STATUS.SUCCESS,
    extra_status: null,
    message: "Todo bylo úspěšně smazáno.",
    index: todoIndex
  })
})

app.listen(port, () => {
  console.log(`Běžím na portu ${port}`)
})
