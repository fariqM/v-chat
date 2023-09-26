// import { ref } from 'vue'
import { defineStore } from 'pinia'
import moment from 'moment'

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: []
  }),
  getters: {},
  actions: {
    addNewMessage(payload) {
      // payload{id,username,user_id,photo,text,time}
      this.messages.push(payload)
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight)
      }, 1)
    },
    sendMessage(payload) {
      // payload{text, email, photo, token}
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
              let dateFormat = moment(msg.created_at).format('Y-MM-D HH:mm:ss')
              this.messages.push({
                id: msg.id,
                username: msg.username,
                user_id: msg.user_id,
                photo: msg.photo,
                text: msg.text,
                time: dateFormat
              })
            })
            setTimeout(() => {
              window.scrollTo(0, document.body.scrollHeight)
            }, 300)
            resolve(res)
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
})
