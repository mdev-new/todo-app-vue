<script setup lang="ts">

import type {
  ToDo
} from '../../types/types.ts'

defineProps<{
  todo: ToDo
}>()

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
        </span>
        <div v-else>
          <span
            class="strike-through break-words"
          >
            {{ todo.text }}
          </span>
          <hr/>
          <i>
            Doděláno: {{ new Date(todo.doneDate).toLocaleString() }}
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
