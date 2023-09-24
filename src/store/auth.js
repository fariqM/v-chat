// import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user_id: null,
    username: null,
    is_login: false
  }),
  getters: {
    getUserId: state => state.user_id,
    getUsername: state => state.is_login
  }
  // actions: {
  //   // register(payload) {
  //   //   //   return new Promise((resolve, reject) => {
  //   //   //   })
  //   // }
  // }
})
