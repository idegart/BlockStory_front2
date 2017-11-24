<template>
  <div style="text-align: center;padding: 15px">
    <div @mousedown.prevetn.stop
         style="display: inline;background-color: #3a8ee6">

      <el-select v-model="value"
                 size="mini"
                 style="background-color: black"
                 placeholder="Следующий блок">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

    </div>
  </div>
</template>

<script>
    export default {
      props: ['block'],
      data: () => ({
        options: [],
        value: null
      })
    }
</script>

<style scoped>
  .el-input{
    background-color: black
  }
</style>
