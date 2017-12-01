<template>
  <div>
    <div class="toolbar-item">
      <el-button @click="paramsVisible=true" round>Открыть параметры</el-button>
    </div>


    <el-dialog
      title="Параметры"
      :visible="paramsVisible"
      :fullscreen="true"
      :before-close="handleClose">

      <table-params></table-params>

    </el-dialog>


  </div>

</template>

<script>
  import tableParams from './params/tableParams.vue';
    export default {
      components: {
        tableParams
      },
      data: () => ({
        paramsVisible: false
      }),
      methods: {
        handleClose(){
          this.paramsVisible = false;
        }
      }
    }
</script>

<style scoped>
  .toolbar-item{
    margin: 10px;
    padding: 10px;
    border-top: 1px solid black;
    text-align: center;
  }
</style>
