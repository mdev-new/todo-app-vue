<script setup lang="ts">
import { ref } from 'vue';

const dropdown_active = ref(false);

const dropdown_toggle = () => dropdown_active.value = !dropdown_active.value;
const dropdown_hide = () => dropdown_active.value = false;
const dropdown_show = () => dropdown_active.value = true;

</script>

<template>
  <div class="relative" v-click-away="dropdown_hide">
    <button
      role="button"
      @click="dropdown_toggle"
    >
      <slot name="toggle" />
    </button>
    <div
      v-if="dropdown_active"
      class="origin-top-right absolute right-0 mt-2 w-28 bg-white rounded-md border py-1"
      @click="dropdown_hide"
    >
      <slot />
    </div>
  </div>
</template>
