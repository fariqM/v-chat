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

      <button class="bg-green-500 hover:bg-green-600" @click="() => open()">
        Join Chat
      </button>
    </div>
  </nav>
  <ModalsContainer />
</template>

<script setup>
// import Avatar from './Avatar.vue'
import { ModalsContainer, useModal } from 'vue-final-modal'
import ModalConfirm from './ModalConfirm.vue'

const { open, close } = useModal({
  component: ModalConfirm,
  attrs: {
    title: 'Hello World!',
    onConfirm() {
      close()
    }
  }
})
</script>
