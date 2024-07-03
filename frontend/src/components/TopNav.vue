<script setup lang="ts">
import Dropdown from '@components/Dropdown.vue'
import DropdownItem from '@components/DropdownItem.vue'

import DownArrow from '@assets/DownArrow.vue'

import store from '@/store.ts'

const logout = () => {
  store.user = null;
}

</script>

<template>
  <div class="flex flex-row justify-between content-center bg-gray-600 px-2 py-1">
    <div class="flex flex-row gap-x-8">
      <h1 class="text-xl text-white">ToDo aplikace</h1>
      <RouterLink to="/" class="m-auto text-gray-300 hover:text-white">
        Domovská stránka
      </RouterLink>
    </div>
    <Dropdown>
      <template v-slot:toggle>
        <div v-wave class="flex flex-row gap-x-2 bg-slate-500 p-1 rounded-md hover:bg-slate-800">
          <div class="text-white">
            <span v-if="store.user != null">Uživatel {{ store.user }}</span>
            <span v-else>Nepřihlášený uživatel</span>
          </div>
          <DownArrow class="w-3 h-3 m-auto" />
        </div>
      </template>

      <ul v-if="store.user != null">
        <DropdownItem @click="logout">
          Odhlásit {{ store.user }}
        </DropdownItem>
      </ul>

      <ul v-else>
        <DropdownItem>
          <RouterLink to="/login">
            Přihlásit se
          </RouterLink>
        </DropdownItem>
      </ul>

    </Dropdown>
  </div>
</template>
