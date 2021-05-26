<template>
  <div>{{title}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      title: 'test vite success'
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>