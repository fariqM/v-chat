<template>
  <nav>
    <div>
      <h1><strong>Vue</strong> Chat App</h1>
      <div class="login" v-if="authStore.photo">
        <Avatar :src="authStore.photo" />
      </div>
      <button
        class="bg-green-500 hover:bg-green-600 ml-3"
        v-if="authStore.is_login"
        @click="logout"
      >
        Logout
      </button>
      <GoogleLogin v-else :callback="callback" prompt auto-login />
    </div>
  </nav>
</template>

<script setup>
import Avatar from './Avatar.vue'
import { onMounted } from 'vue'
import { googleOneTap, decodeCredential, googleLogout } from 'vue3-google-login'
import { useAuthStore } from '../store/auth'
import { useNotification } from '@kyvg/vue3-notification'

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
    })
})

function logout() {
  googleLogout()
  authStore.logout().then(() => {
    notify({
      title: 'Logout Success',
      text: 'Thanks for coming!'
    })
  })
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
</script>
