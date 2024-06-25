<script setup>
import { ref, computed } from 'vue';
import ToDoItem from './components/ToDoItem.vue'

const task = ref('');
const username = ref('');
const todos = ref([]);
const status = ref('');
const loggedIn = ref(false);

const todosLen = computed(() => {
  return todos.value.length
})

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

function set_status(s) {
  status.value = s;
  setTimeout(() => {
    status.value = '';
  }, 3000);
}

function register() {
  fetch(`http://localhost:3000/register/${username.value}`, {
    method: "POST"
  }).then(response => {

    return response.json();

  }).then(json_resp => {
    console.log(json_resp)
    set_status(json_resp.message);
  })
}

function load() {
  loggedIn.value = true;
  fetch(`http://localhost:3000/todos/${username.value}`, {
    method: "GET"
  }).then(response => {

    // todo if error reject promise

    return response.json();
  }).then(json_resp => {
    set_status(json_resp.message);
    todos.value = json_resp.todos;
  })
}

function create() {
  if(task.value === "") {
    alert("Zadej úkol.")
    return;
  }

  const t = new ToDo(task.value)

  fetch(`http://localhost:3000/todos/${username.value}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(t)
  }).then(response => {
    return response.json()

  }).then(json_resp => {
    if(json_resp.status == 'success') {
      todos.value.push(t)
    }

  })
}

const complete = (id, todo) => {

  todo.done = !todo.done;
  if(todo.done) {
    todo.doneDate = Date.now()
  } else {
    todo.doneDate = null
  }

  fetch(`http://localhost:3000/todos/${username.value}/${id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(response => {
    return response.json()

  }).then(json_resp => {
    if(json_resp.status == 'success') {
      todos.value[i] = todo
    }

  })

}

const del = (id) => {
  fetch(`http://localhost:3000/todos/${username.value}/${id}`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }).then(response => {
    return response.json()
  }).then(json_resp => {
    if(json_resp.status == 'success') {
      todos.value.splice(id, 1)
      console.log(todos.value)
    }
  })

}

</script>

<template>
  <div class="flex flex-col gap-y-5 justify-center">
    <h1 class="text-2xl text-center font-bold text-blue-500">ToDo aplikace</h1>
    <p v-if="status.value != ''">
      {{ status }}
    </p>
    <div v-if="!loggedIn" class="self-center w-1/3 p-2 flex flex-col shadow-sm h-20 gap-y-2">
      <h3>Registrovat/Přihlásit</h3>
      <input
        v-model="username"
        type="text"
        placeholder="Uživatelské jméno"
        class="border"
      />
      <button
        v-on:click="load"
        type="button"
        class="shadow-md hover:bg-slate-300"
      >
        Přihlásit
      </button>
      <button
        v-on:click="register"
        type="button"
        class="shadow-md hover:bg-slate-300"
      >
        Registrovat
      </button>
    </div>
    <div v-else>
      <div class="self-center w-full p-2 flex flex-col shadow-sm h-20 gap-y-2">
        <input
          v-model="task"
          type="text"
          placeholder="Text úkonu"
          class="border"
        />
        <button
          v-on:click="create"
          type="button"
          class="shadow-md hover:bg-slate-300"
        >
          Uložit
        </button>
      </div>
      <hr/>
      <div
        class="flex flex-row gap-x-2"
        v-if="todosLen > 0"
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
  </div>
</template>
