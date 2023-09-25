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
    getAllMessage() {
      return new Promise((resolve, reject) => {
        window.ax
          .get('messages')
          .then(res => {
            this.messages = []
            res.data.messages.forEach(msg => {
              // Create a Date object from the timestamp
              const date = new Date(msg.created_at)

              // Get the day, month, year, hour, minute, and second components
              const day = date.getUTCDate()
              const month = date.getUTCMonth() + 1 // Month is zero-based, so add 1
              const year = date.getUTCFullYear()
              const hour = date.getUTCHours()
              const minute = date.getUTCMinutes()
              const second = date.getUTCSeconds()

              // Create a formatted date string
              const formattedDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`
              this.messages.push({
                id: msg.id,
                username: msg.username,
                user_id: msg.user_id,
                photo: msg.photo,
                text: msg.text,
                time: formattedDate
              })
            })
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
})
