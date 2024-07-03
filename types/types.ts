export type ToDo = {
  uuid: string,
  text: string,
  color: string,
  done: boolean,
  doneDate: number | null,
  deadline: number | null,
  priority: number
}

export type User = {
  username: string,
  todos: ToDo[]
}
