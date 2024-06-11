<script setup>

defineProps({
  id: Number,
  text: String,
  done: Boolean
})

</script>

<template>
  <div class="flex flex-row gap-x-2">
    <input type="checkbox" :id="id" :checked="done" class="hover:cursor-pointer" v-on:change="$emit('completed', id)"/>
    <label :for="id">
      <strike v-if="done">
        {{ text }}
      </strike>
      <span v-else >
        {{ text }}
      </span>
    </label>
    <button class="border-2 hover:cursor-pointer hover:bg-red-400" v-on:click="$emit('deleted', id)">Smazat</button>
  </div>
</template>

<style scoped>

</style>
