import { reactive } from 'vue';

const store = reactive({
  info: "",
  warn: "",
  err: "",
  get user() {
    return sessionStorage.getItem('user');
  },
  set user(new_val: string | null) {
    if(new_val) {
      sessionStorage.setItem('user', new_val)
    } else {
      sessionStorage.removeItem('user')
    }
  }
})

export default store;
