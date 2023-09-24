<!-- eslint-disable no-unused-vars -->
<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
  >
    <div class="w-full max-w-xs">
      <login-form v-if="formStore.isLoginForm" />
      <register-form v-else />
    </div>

    <button
      style="background-color: #374151; color: aliceblue"
      class="mt-1 ml-auto px-2 border rounded-lg"
      @click="$emit('confirm')"
    >
      Close
    </button>
  </VueFinalModal>
</template>

<script setup>
// import { ref } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { useTypeForm } from '../store/form'

const formStore = useTypeForm()
</script>

<style></style>
