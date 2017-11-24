<template>
  <table class="block-params" ref="tableParamsOut">
    <tr v-for="(param, index) in block.params.out">

      <td class="block-params__title">
        {{ param.title }}
      </td>

      <td v-if="!param.connector" class="block-params__icon block-params__icon-empty"></td>

      <td  v-if="param.connector"
           class="block-params__icon block-params__icon-delete"
           @mousedown.stop
           @click="deleteConnection(param)">
        <icon name="trash" :scale="0.55"></icon>
      </td>

      <td class="block-params__icon block-params__icon-connector"
          @mousedown.stop="handleDown($event,param)">
        <icon :name="getIcon(param)" :scale="0.55" :class="getClass(param)"></icon>
      </td>

    </tr>
  </table>
</template>

<script>
  import outIcon from './param/outIcon.vue';
    export default {
      props: ['block'],
      components: {
        outIcon
      },
      data: () => ({
        isDragging: false
      }),
      methods: {
        getClass(param){
          return 'OUT' + ' ' + (param.connector ? 'OUT:' + param.param_id + ':' + param.connector + ':' + param.type : null)
        },
        getIcon(param){
          switch (param.type){
            case '1':
            case 1:
              return param.connector ? 'circle' : 'circle-o'
          }
        },
        deleteConnection(param){
          this.$emit('deleteConnection', {param, block: this.block});
        },
        handleMove(e){
          if (!this.isDragging)
            return;

          this.$store.commit('setDragging', {
            position: {
              top: e.pageY+this.container.$el.scrollTop || 0,
              left: e.pageX+this.container.$el.scrollLeft || 0
            },
          });
          e.stopPropagation();
        },
        handleUp(e){
          if (!this.isDragging)
            return;
          this.isDragging = false;
          setTimeout(() =>  {
            let dragging = this.$store.getters.getStopDragging;
            if (!dragging.block.hash)
              this.$store.commit('startDragging', {});
          }, 100);
        },
        handleDown(e,param){
          this.isDragging = true;
          this.$store.commit('startDragging', {
            block: this.block,
            position: {
              top: e.pageY+this.container.$el.scrollTop || 0,
              left: e.pageX+this.container.$el.scrollLeft || 0
            },
            param
          });
        }
      },
      computed: {
        container(){
          return this.$store.getters.getContainer;
        }
      },
      mounted(){
        document.documentElement.addEventListener('mousemove', this.handleMove, true);
        document.documentElement.addEventListener('mouseup', this.handleUp, true)
      },
      beforeDestroy(){
        document.documentElement.removeEventListener('mousemove', this.handleMove, true);
        document.documentElement.removeEventListener('mouseup', this.handleUp, true)
      }
    }
</script>

<style scoped>
  .block-params{
    width: 100%;
    text-align: right;
  }
  .block-params td{
    padding: 3px;
  }
  .block-params__title{
    width: 100%;
  }
  .block-params__icon{
    width: 3px;
    cursor: pointer;
  }
  .block-params__icon-edit{
    color: #67C23A;
  }
  .block-params__icon-delete{
    color: #FA5555;
  }
  .block-params__icon:hover{
    background-color: #5A5E66;
  }
  .block-params__icon-empty:hover{
    cursor: inherit;
    background-color: inherit;
  }
</style>
