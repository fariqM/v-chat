<template>
  <div class="container-sm mt-20">
    <div class="mx-5">
      <Message
        v-for="{ id, text, userPhotoURL, userName, userId } in messages"
        :key="id"
        :name="userName"
        :photo-url="userPhotoURL"
        :sender="userId === user?.uid"
      >
        {{ text }}
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
// import ref
// import { useAuth, useChat } from '@/firebase'

import SendIcon from './SendIcon.vue'
import Message from './Message.vue'
import { reactive, ref } from 'vue'

import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()

const messages = ref([
  {
    id: 1,
    userName: 'fariqM',
    userPhotoURL:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
    userId: 21,
    text: 'this is message'
  },
  {
    id: 2,
    userName: 'irma',
    userPhotoURL:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
    userId: 1,
    text: 'this is message 2'
  }
])

const user = reactive({
  uid: 21
})
const message = ref('')

function send() {
  messages.value.push({
    id: 3,
    userName: 'fariqM',
    userPhotoURL:
      'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg',
    userId: 21,
    text: message.value
  })
  message.value = ''
}

// export default {
//   components: { Message, SendIcon },
//   setup() {
//     const { user, isLogin } = useAuth()
//     const { messages, sendMessage } = useChat()

//     const bottom = ref(null)
//     watch(
//       messages,
//       () => {
//         nextTick(() => {
//           bottom.value?.scrollIntoView({ behavior: 'smooth' })
//         })
//       },
//       { deep: true }
//     )

//     const message = ref('')
//     const send = () => {
//       sendMessage(message.value)
//       message.value = ''
//     }

//     return { user, isLogin, messages, bottom, message, send }
//   }
// }
</script>
