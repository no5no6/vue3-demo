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
import { onMounted } from 'vue'
import { getArticleList } from '@/api/article'

const mainStore = useMainStore()
const { value: name } = storeToRefs(mainStore)

const change = () => {
  name.value = '加载中...'
  mainStore.getValue(mainStore.number)
}

onMounted(async () => {
  const response = await getArticleList()

  console.log(response.articles[0].author)
  console.log(response, 'rrrrr')
})

</script>

<style lang="scss" scoped>
// @import '@/styles/variables.scss';

h1 {
  // vite.config.js 中配置了全局注入
  color: $color;
}
</style>
