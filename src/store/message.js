// import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: []
  }),
  getters: {},
  actions: {
    sendMessage(payload) {
      // payload{text, email, token}
      return new Promise((resolve, reject) => {
        window.ax
          .post('messages', payload)
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
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
})
