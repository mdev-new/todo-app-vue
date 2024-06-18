<script setup>
import { ref } from 'vue';
import ToDoItem from './components/ToDoItem.vue'

const task = ref('');
const username = ref('');
const registerShow = ref(false);
const todos = []; //loggedIn ? : [];

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

const register = () => {
  const response = await fetch(`http://localhost:3000/todos/${username.value}`, {
    method: "POST"
  })
}

const load = () => {
  const response = await fetch(`http://localhost:3000/todos/${username.value}`, {
    method: "GET"
  })
}

function create() {
  if(task.value === "") {
    alert("Zadej úkol.")
    return;
  }

  const response = await fetch(`http://localhost:3000/todos/${username.value}`, {
    method: "POST"
    body: new ToDo(task.value)
  })
}

const complete = (id) => {
  todos.value[id].done = !todos.value[id].done;
  todos.value[id].doneDate = Date.now();
  save()
}

const del = (id) => {

}

const flip = () => registerShow.value = !registerShow.value

</script>

<template>
  <div class="flex flex-col gap-y-5 justify-center">
    <h1 class="text-2xl text-center font-bold text-blue-500">ToDo aplikace</h1>
    <button
      role="button"
      v-on:click="flip"
    >
      Zobrazit registraci
    </button>
    <div v-if="registerShow.value" class="self-center w-1/3 p-2 flex flex-col shadow-sm h-20 gap-y-2">
      <h3>Registrovat</h3>
      <input
        v-model="task"
        type="text"
        placeholder="Username"
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
    <div
      class="flex flex-row gap-x-2"
      v-if="todos.length > 0"
    >
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
