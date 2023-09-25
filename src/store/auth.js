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
      console.log('photo', photoUrl)
      return new Promise((resolve, reject) => {
        window.ax
          .post('register-token', payload)
          .then(res => {
            this.token = payload.token
            this.photo = photoUrl
            this.email = res.data.email
            this.username = res.data.username
            this.is_login = true
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
})
