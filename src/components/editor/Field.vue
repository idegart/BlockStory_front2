<template>
  <el-main ref="mainContainer" class="editor-container">

    <canvas ref="canvas"
            @mousedown="handleClick"
            @contextmenu.prevent.stop="openMenu"
            width="8000" height="1000">
    </canvas>

    <block v-for="(block, index) in blocks"
           :key="index"
           :block="block"
           @renderConnections="renderField"
    ></block>

    <el-dialog title="Добавить блок" :visible.sync="smallMenu">
      <add-block @close="smallMenu=false" :click="click"></add-block>
    </el-dialog>

    <text-editor></text-editor>

  </el-main>
</template>

<script>
  import renderLines from './functions/renderLines';

  import block from './field/Block.vue';
  import addBlock from './field/addBlock.vue';
  import textEditor from './field/textEditor.vue';
    export default {
      components: {
        block,addBlock,textEditor
      },
      data: () => ({
        canvas: null,
        ctx: null,
        containerDragging: false,
        scroll: {
          top: null,
          left: null
        },
        smallMenu: false,
        click: {
          top: 0,
          left: 0
        }
      }),
      methods: {
        renderField(){
          let data = {
            OUT: document.getElementsByClassName('OUT'),
            IN: document.getElementsByClassName('IN'),
            extra: {
              start: {
                position: {
                  top: this.connection.start.position.top - 60,
                  left: this.connection.start.position.left - (this.toolbarVisible?300:0)
                }
              },
              stop: {
                position: {
                  top: this.connection.dragging.position.top - 60,
                  left: this.connection.dragging.position.left - (this.toolbarVisible?300:0)
                }
              }
            }
          };

          let offset = {
            top: this.$refs.mainContainer.$el.scrollTop - 60 || 0,
            left: this.$refs.mainContainer.$el.scrollLeft - (this.toolbarVisible?300:0) || 0
          };

          renderLines(this.canvas, this.ctx, offset, data);
        },
        openMenu(e){
          this.smallMenu = true;
          console.log('open',e);
          this.handleUp();
        },
        handleClick(e){
          this.containerDragging = true;
          this.click.top = e.offsetY;
          this.click.left = e.offsetX;
          this.renderField();
        },
        handleMove(e){
          this.moveField(e);
        },
        handleUp(e){
        },
        moveField(e){
          if (!e.buttons){
            this.scroll.top = this.scroll.left = null;
            return;
          }

          if (typeof this.scroll.top === 'number'){
            this.$refs.mainContainer.$el.scrollTop += this.scroll.top - e.pageY;
            this.$refs.mainContainer.$el.scrollLeft += this.scroll.left - e.pageX;
          }

          this.scroll.top = e.pageY;
          this.scroll.left = e.pageX;
        }
      },
      computed: {
        blocks(){
          return this.$store.getters.getBlocks;
        },
        connection(){
          return this.$store.getters.getConnection;
        },
        container(){
          return this.$store.getters.getContainer;
        },
        toolbarVisible(){
          return this.$store.getters.getToolbarVisible;
        }
      },
      mounted(){
        this.$refs.canvas.addEventListener('mousemove', this.handleMove, true);

        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext("2d");

        setTimeout(() => {
          this.renderField();
        },500);
      },
      beforeDestroy(){
        this.$refs.canvas.removeEventListener('mousemove', this.handleMove, true);
      },
      watch: {
        blocks: {
          deep: true,
          handler: function () {
            console.log('watch block');
            setTimeout(() => {
              this.renderField();
            },100);
          }
        },
        connection: {
          deep: true,
          handler: function () {
            this.renderField();
          }
        }
      }
    }
</script>

<style scoped>
  .el-main{
    padding: 0;
    background-color: #B3C0D1;
  }
  canvas{
    background-image: linear-gradient( rgba(187, 187, 187, 0.2), transparent 1px),
    linear-gradient( 90deg, rgba(187, 187, 187, 0.2), transparent 1px),
    linear-gradient( rgba(0, 0, 0, 1), transparent 2px),
    linear-gradient( 90deg, rgba(0, 0, 0, 1), transparent 2px);
    background-size: 14px 14px, 14px 14px, 112px 112px, 112px 112px;
    background-position: 0 0;
    background-color: #262626;
  }
  .editor-container * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: default;
  }
</style>
