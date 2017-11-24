<template>
  <div @mousedown="handleDown"
       class="block-footer">
    <block-params :block="block" @renderConnections="renderConnections"></block-params>
  </div>
</template>

<script>
  import blockParams from './footer/Params.vue';
    export default {
      props: ['block'],
      components: {
        blockParams
      },
      data:() => ({
        is_dragging: false,
        size: {
          height: 10,
          width: 10
        }
      }),
      methods:{
        renderConnections(){
          this.$emit('renderConnections');
        },
        handleMove(data){
          if (!this.is_dragging)
            return;

          let container_offset = {
            top: this.container.$el.scrollTop,
            left: this.container.$el.scrollLeft
          };

          let position = {
            top: data.clientY - 70 + container_offset.top - this.size.height/2,
            left: data.clientX - (this.toolbarVisible ? 300 : 0) + container_offset.left - this.size.width/2
          };

          if (position.top < 10)
            position.top = 10;
          if (position.top >= this.screenSize.height - this.size.height - 15)
            position.top = this.screenSize.height - this.size.height - 15;
          if (position.left < 10)
            position.left = 10;
          if (position.left >= this.screenSize.width - this.size.width - 15)
            position.left = this.screenSize.width - this.size.width - 15;

          this.block.position.top = position.top;
          this.block.position.left = position.left;

          this.$emit('dragging');
        },
        handleDown(data){
          this.is_dragging = true;
          this.size.height = this.$el.parentElement.clientHeight;
          this.size.width = this.$el.parentElement.clientWidth;
        },
        handleUp(){
          if (!this.is_dragging)
            return;

          this.is_dragging = false;
          this.$emit('stopDrag');
        },
      },
      computed: {
        container(){
          return this.$store.getters.getContainer;
        },
        toolbarVisible(){
          return this.$store.getters.getToolbarVisible;
        },
        screenSize(){
          return {
            height: this.container.$el.scrollHeight,
            width: this.container.$el.scrollWidth
          };
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
  .block-footer{
    cursor: auto;
  }
</style>
