// import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: null,
    email: null,
    username: null,
    photo: null,
    current_user_id: null,
    is_login: false
  }),
  getters: {
    getUserId: state => state.user_id,
    getUsername: state => state.is_login
  },
  actions: {
    register(payload) {
      // payload{username, email, token}
      return new Promise((resolve, reject) => {
        window.ax
          .post('register', payload)
          .then(res => {
            resolve(res)
          })
          .catch(e => {
            console.log(e)
            reject(e)
          })
      })
    },
    registerToken(payload, photoUrl) {
      // payload{token, email}
      return new Promise((resolve, reject) => {
        window.ax
          .post('register-token', payload)
          .then(res => {
            this.current_user_id = res.data.user_id
            this.token = payload.token
            this.email = res.data.email
            this.username = res.data.username
            this.is_login = true
            setTimeout(() => {
              this.photo = photoUrl
            }, 500)
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    logout() {
      return new Promise(resolve => {
        this.current_user_id = null
        this.token = null
        this.photo = null
        this.email = null
        this.username = null
        this.is_login = false
        resolve()
      })
    }
  }
})
