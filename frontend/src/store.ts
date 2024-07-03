import { reactive } from 'vue';

const store = reactive({
  info: "",
  warn: "",
  err: "",
  get user() {
    return localStorage.getItem('user');
  },
  set user(new_val: string | null) {
    if(new_val) {
      localStorage.setItem('user', new_val)
    } else {
      localStorage.removeItem('user')
    }
  }
})

export default store;
