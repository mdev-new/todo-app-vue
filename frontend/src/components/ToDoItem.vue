<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue'

import type {
  ToDo
} from '../../types/types.ts'

const props = defineProps<{
  todo: ToDo
}>()

const deadline = ref(0)
let intervalId = 0;

const rawDateToMinutes = (date_ms) => Math.floor(date_ms / (1000 * 60))

const updateDeadlineLeft = () => {
  const minutes = rawDateToMinutes(props.todo.deadline - Date.now())
  deadline.value = minutes;
}

onMounted(() => {
  updateDeadlineLeft()
  intervalId = setInterval(updateDeadlineLeft, 1000 * 60)
})

onUnmounted(() => {
  clearInterval(intervalId);
})

</script>

<template>
  <div
    class="flex flex-col justify-between gap-2 shadow-md p-2 w-40 h-40 rounded"
    :style="{ backgroundColor: todo.color }"
  >
    <div
      class="w-full h-full p-1 overflow-scroll"
    >
      <label>
        <span
          v-if="!todo.done"
          class="break-words"
          :style="{
            fontWeight: (todo.priority == 3) ? '700' : '400',
            fontStyle: (todo.priority == 1) ? 'italic' : 'normal'
          }"
        >
          {{ todo.text }}
          <hr/>
          <i class="text-xs">
            Do deadline zbývá {{ deadline }} minut.
          </i>
        </span>
        <div v-else>
          <span
            class="line-through break-words"
            :style="{
              fontWeight: (todo.priority == 3) ? '700' : '400',
              fontStyle: (todo.priority == 1) ? 'italic' : 'normal'
            }"
          >
            {{ todo.text }}
          </span>
          <hr/>
          <i class="text-xs">
            Doděláno: {{ new Date(todo.doneDate).toLocaleString() }},
            {{ rawDateToMinutes(todo.deadline - todo.doneDate) }} min před deadline.
          </i>
        </div>
      </label>
    </div>
    <div class="flex flex-row gap-x-2">
      <input
        type="checkbox"
        class="hover:cursor-pointer"
        :checked="todo.done"
        @change="$emit('complete', todo)"
      >
      <button
        class="shadow-md hover:cursor-pointer hover:bg-blue-400 bg-white w-1/2"
        @click="$emit('edit', todo.uuid)"
      >
        Upravit
      </button>
      <button
        class="shadow-md hover:cursor-pointer hover:bg-red-400 bg-white w-1/2"
        @click="$emit('delete', todo.uuid)"
      >
        Smazat
      </button>
    </div>
  </div>
</template>
