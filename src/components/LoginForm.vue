<template>
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="identity-input mb-4">
      <h1 class="text-gray-700 text-sm font-bold mb-2">Login</h1>
      <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">
        Username</label
      >
      <input
        id="identity"
        class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Username"
      />
      <span class="text-xs text-red-700"></span>
    </div>

    <div class="password-input mb-6">
      <label for="identity" class="block text-gray-700 text-sm font-bold mb-2"
        >Password</label
      >

      <input
        class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        placeholder="*******"
      />

      <span class="text-xs text-red-700"></span>
    </div>

    <div class="flex items-center justify-between">
      <button
        class="bg-gray-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Sign In
      </button>
      <button
        class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        @click="formStore.changeFormType(false)"
      >
        Sign Up
      </button>
    </div>
  </form>
</template>

<script setup>
import { useTypeForm } from '../store/form'
const formStore = useTypeForm()
</script>

<style></style>
