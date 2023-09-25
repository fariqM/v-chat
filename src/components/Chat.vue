<template>
  <div class="container-sm mt-20">
    <div class="mx-5">
      <Message
        v-for="{
          id,
          text,
          photo,
          username,
          user_id,
          time
        } in messageStore.messages"
        :key="id"
        :name="username"
        :photo-url="photo"
        :sender="user_id === authStore.current_user_id"
      >
        <p style="font-size: 0.8rem; margin-bottom: 4px">
          {{ time }}
        </p>
        <p>{{ text }}</p>
      </Message>
    </div>
  </div>

  <div ref="bottom" class="mt-20" />

  <div class="bottom">
    <div class="container-sm" v-if="authStore.is_login">
      <form @submit.prevent="send">
        <input v-model="message" placeholder="Message" required />
        <button type="submit">
          <SendIcon />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import SendIcon from './SendIcon.vue'
import Message from './Message.vue'
import { ref, onMounted } from 'vue'

import { useAuthStore } from '../store/auth'
import { useMessageStore } from '../store/message'

const authStore = useAuthStore()
const messageStore = useMessageStore()

const message = ref('')

onMounted(() => {
  messageStore.getAllMessage().then(() => {
    // console.log(res.data)
  })
})

function send() {
  const payload = {
    text: message.value,
    token: authStore.token,
    email: authStore.email,
    photo: authStore.photo
  }

  messageStore
    .sendMessage(payload)
    .then(res => {
      setNewMessage(res.data.callback)
    })
    .catch(e => {
      console.log(e)
    })
}

function setNewMessage(data) {
  const payload = {
    id: data.id,
    username: authStore.username,
    user_id: authStore.current_user_id,
    photo: data.photo,
    text: data.text,
    time: formateDate(data.created_at)
  }
  messageStore.addNewMessage(payload)
}

function formateDate(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp)

  // Get the day, month, year, hour, minute, and second components
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1 // Month is zero-based, so add 1
  const year = date.getUTCFullYear()
  const hour = date.getUTCHours()
  const minute = date.getUTCMinutes()
  const second = date.getUTCSeconds()

  // Create a formatted date string
  const formattedDate = `${day}-${month}-${year} ${hour}:${minute}:${second}`
  return formattedDate
}
</script>
