<script setup lang="ts">

import {
  ref
} from 'vue';

import type {
  ToDo
} from '@root/types/types.ts'

const props = withDefaults(defineProps<{
  todo?: ToDo,
  isNew?: Boolean
}>(), {
  todo: {
    uuid: '',
    text: '',
    color: '#abcdef',
    done: false,
    doneDate: null,
    deadline: null,
    priority: 2
  },
  isNew: false
})

const dateToInput = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const text = ref(props.todo.text)
const color = ref(props.todo.color)
const deadline = ref(dateToInput(new Date(props.todo.deadline)))
const priority = ref(props.todo.priority)

</script>

<template>
  <div
    class="flex flex-col justify-between gap-x-2 gap-y-1 shadow-md p-2 w-72 h-40 rounded-md"
    :style="{ backgroundColor: color }"
  >
    <textarea
      v-model="text"
      type="text"
      class="w-full h-full rounded resize-none border-2"
      placeholder="Zadej text..."
    />
    <div class="flex flex-row gap-x-1">
      <label for="deadline">Deadline</label>
      <input
        v-model="deadline"
        id="deadline"
        type="datetime-local"
        class="rounded-sm"
      />
    </div>
    <div class="flex flex-row gap-x-14">
      <div class="flex flex-row gap-x-2 w-1/3">
        <label for="color">Barva</label>
        <input
          v-model="color"
          type="color"
          id="color"
          class="rounded-xl"
        >
      </div>
      <div class="flex flex-row gap-x-2">
        <input
          v-model="priority"
          type="range"
          id="priority"
          min="1"
          max="3"
          default="2"
          class="rounded-xl w-1/3"
        >
        <label for="priority">Důležitost</label>
      </div>
    </div>
    <div class="flex flex-row justify-between gap-x-2">
      <button
        v-if="!isNew"
        class="shadow-md hover:cursor-pointer hover:bg-blue-400 flex-grow basis-0 bg-white"
        @click="$emit('cancel')"
      >
        Zrušit
      </button>
      <button
        class="shadow-md hover:cursor-pointer hover:bg-blue-400 flex-grow basis-0 bg-white"
        @click="$emit('save', todo.uuid, text, color, Date.parse(deadline), priority, todo.done, todo.doneDate)"
      >
        Uložit
      </button>
    </div>
  </div>
</template>
