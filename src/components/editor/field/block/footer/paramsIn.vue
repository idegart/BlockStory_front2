<template>
  <table class="block-params">
    <tr v-for="(param, index) in block.params.in">
      <td class="block-params__icon" @mouseup="handleUp($event,param)">
        <icon :name="getIcon(param.type,false)" :scale="0.55" :class="getStyle(param)"></icon>
      </td>
      <td class="block-params__title">
        {{ param.title }}
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
      getStyle(param){
        return 'IN' + ' ' + 'IN:' + param.param_id + ':' + param.type
      },
      getIcon(type, connected = false){
        switch (type){
          case '1':
          case 1:
            return connected ? 'circle' : 'circle-o'

        }
      },
      handleUp(e, param){
        if (!this.startDragging.block.hash)
          return;

        this.$store.commit('stopDragging', {
          block: this.block,
          position: {
            top: e.layerY,
            left: e.layerX
          },
          param
        });

        this.$emit('setConnection');
      },
    },
    computed: {
      startDragging(){
        return this.$store.getters.getStartDragging;
      }
    }
  }
</script>

<style scoped>
  .block-params{
    text-align: left;
  }
  .block-params td{
    padding: 3px;
  }
  .block-params__icon{
    width: 10%;
  }
  .block-params__icon:hover{
    background-color: #5A5E66;
  }
</style>
