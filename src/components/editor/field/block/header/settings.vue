<template>
  <div @mouseover="spin=true" @mouseleave="spin=false">

    <el-dropdown trigger="click" @command="handleClick">
      <el-button size="mini" style="padding: 1px 5px">
        <icon name="cog" :scale="0.9" :spin="spin"></icon>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="delete">{{ $t('deleteBlock')}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

</template>

<script>

    export default {
      props: ['block'],
      data: () => ({
        spin: false
      }),
      methods: {
        handleClick(e){
          switch (e){
            case 'delete':
              this.deleteBlock();
              return;
          }
          console.log(e);
        },
        deleteBlock(){
          let data = {
            block_hash: this.block.hash
          }

          this.$http.post('block.delete', data)
            .then(res => {
              this.$store.commit('deleteBlock', this.block);
              this.$emit('renderConnections');
              console.log(res);
            })
        }
      }
    }
</script>
