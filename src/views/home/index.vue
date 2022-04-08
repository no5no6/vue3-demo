<template>
  <div>
    <h1>Home</h1>
    <img
      src="@/assets/logo.png"
      style="width: 40px; height: 40px;"
    >
    <div>value: {{ name }}</div>
    <div>count: {{ mainStore.count }}</div>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
    <button @click="change">
      按钮
    </button>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { useMainStore } from '@/store/main'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()
const { value: name } = storeToRefs(mainStore)

const change = () => {
  name.value = '加载中...'
  mainStore.getValue(mainStore.number)
}

</script>

<style scoped>

</style>
