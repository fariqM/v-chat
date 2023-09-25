// import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: null,
    email: null,
    username: null,
    photo: null,
    is_login: false
  }),
  getters: {
    getUserId: state => state.user_id,
    getUsername: state => state.is_login
  },
  actions: {
    register(payload) {
      // console.log(payload)
      // return
      return new Promise((resolve, reject) => {
        window.ax
          .post('register', payload)
          .then(res => {
            console.log(res);
            if (res.status == 201) {
              this.token = payload.token
              this.email = payload.email
              this.username = payload.username
              this.is_login = true
              resolve()
            }
          })
          .catch(e => {
            console.log(e)
            reject(e)
          })
      })
    }
  }
})
