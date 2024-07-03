<script setup lang="ts">

import Close from '@assets/Close.vue'

defineProps<{
  message: String
}>()

</script>

<template>
  <div class="bg-red-200 w-full h-8 p-2 flex flex-row justify-between">
    <span class="text-red-800">
      {{ message }}
    </span>
    <button @click="$emit('hide')">
      <Close class="w-10 h-10" />
    </button>
  </div>
</template>
