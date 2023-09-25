<template>
  <nav>
    <div>
      <h1><strong>Vue</strong> Chat App</h1>

      <!-- <div v-if="isLogin" class="login">
        <Avatar :src="user.photoURL" />
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign OutisLogin
        </button>
      </div> -->

      <button
        class="bg-green-500 hover:bg-green-600"
        v-if="authStore.is_login"
        @click="logout"
      >
        Logout
      </button>
      <GoogleLogin v-else :callback="callback" prompt auto-login />
    </div>
  </nav>
  <ModalsContainer />
</template>

<script setup>
import { onMounted } from 'vue'
// eslint-disable-next-line no-unused-vars
import { googleOneTap, decodeCredential, googleLogout } from 'vue3-google-login'
import { useAuthStore } from '../store/auth'
import { useNotification } from '@kyvg/vue3-notification'
// import Avatar from './Avatar.vue'
// import { ModalsContainer, useModal } from 'vue-final-modal'
// import ModalConfirm from './ModalConfirm.vue'

const authStore = useAuthStore()
const { notify } = useNotification()
const callback = response => {
  handleGoogleResponse(response)
}

onMounted(() => {
  googleOneTap({ autoLogin: true })
    .then(response => {
      handleGoogleResponse(response)
    })
    .catch(error => {
      console.log(error)
      alert('Oops something went wrong!')
    })
})

function logout() {
  googleLogout()
}

function handleGoogleResponse(response) {
  const userCred = decodeCredential(response.credential)
  const reigsterPayload = {
    token: response.credential,
    email: userCred.email,
    username: userCred.name,
    photo: userCred.picture
  }

  authStore
    .register(reigsterPayload)
    .then(registerResponse => {
      const registerTokenPayload = {
        token: response.credential,
        email: registerResponse.data.email
      }
      authStore
        .registerToken(registerTokenPayload, userCred.picture)
        .then(() => {
          notify({
            title: 'Login Success',
            text: 'Welcome to V-Chat!'
          })
        })
        .catch(e => {
          console.log(e)
          alert('Oops something went wrong!')
        })
    })
    .catch(err => {
      console.log(err)
      alert('Oops something went wrong!')
    })
}

// const { open, close } = useModal({
//   component: ModalConfirm,
//   attrs: {
//     title: 'Hello World!',
//     onConfirm() {
//       close()
//     }
//   }
// })
</script>
