<script setup lang="ts">
import store from '@/store.ts'
import TopNav from '@components/TopNav.vue'
import Info from '@components/Info.vue'
import Warning from '@components/Warning.vue'
import Error from '@components/Error.vue'

const hideInfo = () => {
  store.info = ""
}

const hideWarning = () => {
  store.warn = ""
}
const hideError = () => {
  store.err = ""
}

</script>

<template>
  <div class="flex flex-col gap-y-5 justify-center">
    <nav>
      <TopNav />
    </nav>
    <Info
      v-show="store.info != ''"
      :message="store.info"
      @hide="hideInfo"
    />
    <Warning
      v-show="store.warn != ''"
      :message="store.warn"
      @hide="hideWarning"
    />
    <Error
      v-show="store.err != ''"
      :message="store.err"
      @hide="hideError"
    />
    <main class="p-2 flex flex-col">
      <RouterView />
    </main>
  </div>
</template>
