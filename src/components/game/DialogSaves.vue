<template>
  <el-dialog
    title="Сохранения"
    :visible="visible"
    fullscreen
    :before-close="handleClose">

    <table-saves :saves="saves"></table-saves>

  </el-dialog>

</template>

<script>
  import tableSaves from './saves/table.vue';
    export default {
      props: ['visible'],
      components: {
        tableSaves
      },
      data: () => ({
        saves: []
      }),
      methods: {
        loadSaves(){

        },
        handleClose(){
          this.$emit('close')
        }
      },
      watch: {
        visible(e){
          if (e)
            this.loadSaves();
          else
            this.saves = [];
        }
      }
    }
</script>
