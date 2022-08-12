<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          Aside
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
  .el-main {
    background-color: rgba(238, 237, 237, 0.808);
  }

  .el-container {
    background-color: rgb(200, 200, 200);
    height: 100vh;
  }

  .el-aside {
    background-color: rgb(210, 210, 210);
  }
</style>
