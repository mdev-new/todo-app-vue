<script setup>

defineProps({
  id: Number,
  todo: Object
})

</script>

<template>
  <div
    class="flex flex-col justify-between gap-x-2 shadow-md p-2 w-40 h-40"
  >
    <div>
      <label>
        <span v-if="!todo.done">
          {{ todo.text }}
        </span>
        <div v-else>
          <strike>
            {{ todo.text }}
          </strike>
          <hr/>
          <i>
            Doděláno: {{ new Date(todo.doneDate).toDateString() }}
          </i>
        </div>
      </label>
    </div>
    <div class="flex flex-row gap-x-2">
      <input
        type="checkbox"
        :id="id"
        :checked="todo.done"
        class="hover:cursor-pointer"
        v-on:change="$emit('completed', id, todo)"
      >
      <button
        class="shadow-md hover:cursor-pointer hover:bg-red-400 w-full"
        v-on:click="$emit('deleted', id)"
      >
        Smazat
      </button>
    </div>
  </div>
</template>
