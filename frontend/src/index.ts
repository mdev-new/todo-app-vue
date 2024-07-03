import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router'

import VWave from 'v-wave'
import VueClickAway from "vue3-click-away";

import './index.css';

import App from './App.vue';
import ToDoList from './ToDoList.vue'
import Login from './Login.vue'

const routes = [
  { path: '/', component: ToDoList },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

const app = createApp(App)

app.use(router)
app.use(VWave, {
  color: 'white',
  duration: 0.2,
  easing: 'ease-out'
})
app.use(VueClickAway)

app.mount('#root')
