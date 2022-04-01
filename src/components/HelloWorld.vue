<script setup lang="tsx">
// import { ref } from 'vue'
import Foo from './foo'
import Bar from './bar'

defineProps<{ msg: string }>()

const abc = <h1>abc1323134</h1>

</script>

<template>
  <h1>{{ msg }}</h1>
  <abc />
  <Foo msg="options API1" />
  <Bar msg="composition API" />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
