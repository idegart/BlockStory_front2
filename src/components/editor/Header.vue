<template>
  <el-header style="font-size: 12px">
    <el-button @click="changeToolbarVisible"
               :icon="toolbarVisible ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"></el-button>
  </el-header>
</template>

<script>
    export default {
      methods: {
        changeToolbarVisible(){
          this.$store.commit('setToolbarVisible', !this.toolbarVisible);
        }
      },
      computed: {
        toolbarVisible(){
          return this.$store.getters.getToolbarVisible
        }
      }
    }
</script>

<style scoped>
  .el-header {
    width: 100%;
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
