<script setup lang="ts">

import { ref, computed, onMounted } from 'vue';

import ToDoItem from '@components/ToDoItem.vue'
import EditableToDoItem from '@components/EditableToDoItem.vue'

import api from '@/api.ts'
import store from '@/store.ts'

import {
  SERVER_STATUS
} from '@root/enum/status.js'

import type {
  ToDo
} from '@root/types/types.ts'

const editing_todo_id = ref('')
const todos = ref([]);

const todos_len = computed(() => todos.value.length)
const reversed_todos = computed(() => todos.value.toReversed())

onMounted(() => {
  if(store.user != null) {
    api.get(`/todos/${store.user}`).then(response => {
      const data = response.data;

      todos.value = data.todos;
      store.info = data.message;
    }).catch(error => {

      if(!error.response) {
        store.err = "Něco se pokazilo.";
      } else {
        const data = error.response.data;
        store.err = data.message;
      }
    })
  }
})

const toggle_edit = (id) => {
  editing_todo_id.value = id;
}

const create = (uuid, text, color, deadline, priority) => {
  if(text == "") {
    store.warn = "Zadej úkol.";
    return;
  }

  const todo_partial = {
    text,
    color,
    deadline,
    priority
  }

  api.post(`/todos/${store.user}`, todo_partial).then(response => {
    const data = response.data;

    store.info = data.message;
    todos.value.push(data.todo)
  }).catch(error => {

    if(!error.response) {
      store.err = "Něco se pokazilo.";
    } else {
      const data = error.response.data;
      store.err = data.message;
    }
  })
}

const edit = (uuid, text, color, deadline, priority, done, doneDate) => {

  const todo: ToDo = {
    uuid,
    text,
    color,
    done,
    doneDate,
    deadline,
    priority
  }

  api.put(`/todos/${store.user}/${uuid}`, todo).then(response => {
    const data = response.data;

    todos.value[data.index] = todo
    editing_todo_id.value = ''
    store.info = data.message;
  }).catch(error => {

    if(!error.response) {
      store.err = "Něco se pokazilo.";
    } else {
      const data = error.response.data;
      store.err = data.message;
    }
  })
}

const toggle_complete = (todo) => {

  edit(
    todo.uuid,
    todo.text,
    todo.color,
    todo.deadline,
    todo.priority,
    !todo.done,
    (!todo.done) ? Date.now() : null
  )

}

const del = (id) => {
  api.delete(`/todos/${store.user}/${id}`).then(response => {

    const data = response.data;

    todos.value.splice(data.index, 1)
    store.info = data.message;
  }).catch(error => {

    if(!error.response) {
      store.err = "Něco se pokazilo.";
    } else {
      const data = error.response.data;
      store.err = data.message;
    }
  })
}

</script>

<template>
  <div
    v-if="store.user != null"
    class="p-2 flex flex-row flex-wrap gap-2"
  >
    <EditableToDoItem
      v-show="editing_todo_id == ''"
      @save="create"
      is-new="true"
    />
    <div
      v-if="todos_len > 0"
      v-for="todo of reversed_todos"
    >
      <ToDoItem
        v-show="editing_todo_id !== todo.uuid"
        :todo="todo"
        @complete="toggle_complete"
        @edit="toggle_edit"
        @delete="del"
      />
      <EditableToDoItem
        v-show="editing_todo_id === todo.uuid"
        :todo="todo"
        @save="edit"
        @cancel="toggle_edit('')"
      />
    </div>
    <span v-else>Nic dalšího tu zatím není.</span>
  </div>
  <p v-else>
    Musíte se <RouterLink to="/login" class="underline text-blue-700 hover:text-blue-900">přihlásit</RouterLink>.
  </p>
</template>
