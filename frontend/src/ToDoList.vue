<script setup lang="ts">

import { ref, computed, onMounted } from 'vue';

import ToDoItem from '@components/ToDoItem.vue'
import EditableToDoItem from '@components/EditableToDoItem.vue'

import api from '@/api.ts'
import store from '@/store.ts'

import {
  SERVER_STATUS
} from '@root/enum/status.js'

const editing_todo_id = ref('')
const todos = ref([]);

const todos_len = computed(() => todos.value.length)
const reversed_todos = computed(() => todos.value.toReversed())

onMounted(() => {
  if(store.user != null) {
    api.get(`/todos/${store.user}`).then(response => {
      const data = response.data;

      if(data.status == SERVER_STATUS.SUCCESS) {
        todos.value = data.todos;
        store.info = data.message;
      } else {
        store.err = data.message;
      }
    }).catch(error => {
      store.err = "Něco se pokazilo.";
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

    if(data.status == SERVER_STATUS.SUCCESS) {
      store.info = data.message;
      todos.push(data.todo)
    } else {
      store.err = data.message;
    }
  }).catch(error => {
    store.err = "Něco se pokazilo.";
  })
}

const edit = (uuid, text, color, deadline, priority, done, doneDate) => {

  const todo = {
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

    if(data.status == SERVER_STATUS.SUCCESS) {
      todos.value[id] = todo
    } else {
      store.err = data.message;
    }
  }).catch(error => {
    store.err = "Něco se pokazilo.";
  })
}

const toggle_complete = (todo) => {
  const id = todo.uuid;

  todo.done = !todo.done;

  // If the todo got just completed,
  // set a completion date.
  if(todo.done) {
    todo.doneDate = Date.now()
  } else {
    todo.doneDate = null
  }

}

const del = (id) => {
  api.delete(`/todos/${store.user}/${id}`).then(response => {

    const data = response.data;

    if(data.status == SERVER_STATUS.SUCCESS) {
      todos.value.splice(data.index, 1)
      store.info = data.message;
    } else {
      store.err = "Něco se pokazilo.";
    }
  }).catch(error => {
    store.err = "Něco se pokazilo.";
  })
}

</script>

<template>
  <div
    v-if="store.user != null"
    class="p-2 flex flex-row flex-wrap gap-2"
  >
    <EditableToDoItem
      v-show="!editing_todo_id"
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
