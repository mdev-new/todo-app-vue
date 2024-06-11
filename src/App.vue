<script setup>
import { ref } from 'vue';
import ToDoItem from './components/ToDoItem.vue'

const task = ref('');

const todos = ref(JSON.parse(localStorage.getItem("todos")) || [])

class ToDo {
  text = "";
  done = false;
  constructor(text) {
    this.text = text;
    this.done = false;
  }
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos.value))
}

function create() {

  const newTodo = new ToDo(task.value);
  todos.value.push(newTodo);
}

function complete(id) {
  todos.value[id].done = !todos.value[id].done;
  save()
}

function del(id) {
  todos.value.splice(id, 1)
  save()
}


</script>

<style scoped>
</style>

<template>
  <div class="flex flex-col justify-center">
    <h1 class="text-2xl text-center font-bold text-blue-500">ToDo aplikace</h1>
    <div class="flex flex-col w-full sm:w-1/3">
      <input v-model="task" type="text" placeholder="Text úkonu" >
      <button v-on:click="create" type="submit" class="border-2 border-blue-400 hover:bg-red-400 m-1">Uložit</button>
    </div>
    <ul>
      <li v-for="(todo, index) of todos">
        <ToDoItem :id="index" :text="todo.text" :done="todo.done" v-on:completed="complete" v-on:deleted="del"></ToDoItem>
      </li>
    </ul>
  </div>
</template>
