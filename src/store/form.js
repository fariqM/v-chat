import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTypeForm = defineStore('formType', () => {
  const isLoginForm = ref(true)

  function changeFormType(status) {
    // console.log(isLoginForm)
    isLoginForm.value = status
  }
  return { changeFormType, isLoginForm }
})
