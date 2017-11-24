<template>
  <div class="block" :style="bindStyle">

    <block-header :block="block" @renderConnections="renderConnections"></block-header>

    <block-footer :block="block"
                  @stopDrag="stopDrag"
                  @dragging="renderConnections"
                  @renderConnections="renderConnections"
    ></block-footer>

    <block-body :block="block"></block-body>

  </div>
</template>

<script>
  import blockHeader from './block/Header.vue';
  import blockBody from './block/Body.vue';
  import blockFooter from './block/Footer.vue';

    export default {
      props: ['block'],
      components: {
        blockHeader,blockBody,blockFooter
      },
      methods: {
        stopDrag(){
          let data = {
            block_hash: this.block.hash,
            position: this.block.position
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            })
        },
        renderConnections(){
//          setTimeout(() => {
//            this.$emit('renderConnections');
//            console.log('test');
//          }, 100);
        }
      },
      computed: {
        bindStyle() {
          return {
            top: this.block.position.top + 'px',
            left: this.block.position.left + 'px',
            zIndex: this.block.position.zIndex
          }
        },
      }
    }
</script>

<style scoped>

  .block{
    position: absolute;
    border: 1px solid #1F2D3D;
    border-radius: 10px;
    background-color: rgba(31, 45, 61, 0.9);
    color: #ffffff;
    font-size: 14px;
    box-shadow: 7px 7px 20px rgba(0,0,0,0.9);
    cursor: move;
    width: 250px;
    min-height: 50px;
    overflow: hidden;
  }

  .block * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

</style>
