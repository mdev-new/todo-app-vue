<script setup>
import { ref } from 'vue';
import ToDoItem from './components/ToDoItem.vue'

const task = ref('');
const todos = ref(JSON.parse(localStorage.getItem("todos")) || [])

class ToDo {
  text = "";
  done = false;
  doneDate = null;
  constructor(text) {
    this.text = text;
    this.done = false;
    this.doneDate = null;
  }
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos.value))
}

function create() {
  if(task.value === "") {
    alert("Zadej hodnotu.")
    return;
  }

  todos.value.push(new ToDo(task.value));
  save()
}

function complete(id) {
  todos.value[id].done = !todos.value[id].done;
  todos.value[id].doneDate = Date.now();
  save()
}

function del(id) {
  todos.value.splice(id, 1)
  save()
}

</script>

<template>
  <div class="flex flex-col gap-y-5 justify-center">
    <h1 class="text-2xl text-center font-bold text-blue-500">ToDo aplikace</h1>
    <div class="self-center w-full p-2 flex flex-col shadow-sm h-20 gap-y-2">
      <input
        v-model="task"
        type="text"
        placeholder="Text úkonu"
        class="border"
      />
      <button
        v-on:click="create"
        type="submit"
        class="shadow-md hover:bg-slate-300"
      >
        Uložit
      </button>
    </div>
    <hr/>
    <div class="flex flex-row gap-x-2" v-if="todos.length > 0">
      <ToDoItem
        v-for="(todo, index) of todos"
        :id="index"
        :todo="todo"
        v-on:completed="complete"
        v-on:deleted="del"
      />
    </div>
    <p v-else>Nic tu zatím není.</p>
  </div>
</template>
