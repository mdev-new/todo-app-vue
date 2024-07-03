<script setup lang="ts">
import { ref } from 'vue'

import type { User } from '@root/types/types.ts'

import store from '@/store.ts'
import api from '@/api.ts'

import {
  SERVER_STATUS,
  SERVER_STATUS_EXTRA
} from '@root/enum/status.js'

const username = ref('');

const login = () => {
  api.get(`/login/${username.value}`).then(response => {

    const data = response.data;

    if(data.status == SERVER_STATUS.SUCCESS) {
      store.user = data.user.username;
    } else {
      store.err = data.message;
    }
  }).catch(error => {
    store.err = "Něco se pokazilo.";
  })
}

const register = () => {
  api.post(`/register/${username.value}`).then(response => {
    const data = response.data;

    if(data.status == SERVER_STATUS.SUCCESS) {
      store.info = data.message;
    } else {
      store.err = data.message;
    }
  }).catch(error => {
    store.err = "Něco se pokazilo.";
  })
}

</script>

<template>
  <div
    v-if="store.user == null"
    class="self-center flex flex-col shadow-sm gap-y-3 w-1/2"
  >
    <h1>Přihlašovací okno</h1>
    <input
      v-model="username"
      type="text"
      placeholder="Uživatelské jméno"
      class="border"
      autofocus
    />
    <div class="flex flex-row">
      <button
        type="button"
        class="shadow-md hover:bg-slate-300 w-1/2"
        @click="register"
      >
        Registrovat
      </button>
      <button
        type="submit"
        class="shadow-md hover:bg-slate-300 w-1/2"
        @click="login"
      >
        Přihlásit
      </button>
    </div>
  </div>
  <p v-else>
    Již jste přihlášeni. Můžete pokračovat
    <RouterLink class="underline text-blue-700 hover:text-blue-900" to="/">do aplikace</RouterLink>.
  </p>
</template>
