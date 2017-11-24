<template>
  <el-container :style="'height:'+ windowSize.height +'px'">

    <el-aside v-if="toolbarVisible"
              width="300px"
              style="background-color: rgb(238, 241, 246)">
    </el-aside>

    <el-container direction="vertical">
      <editor-header></editor-header>
      <editor-field style="position: relative" ref="editorContainer"></editor-field>
    </el-container>

  </el-container>
</template>

<script>
  import {setBlock} from './editor/functions/renderBlock';

  import editorHeader from './editor/Header.vue';
  import editorToolbar from './editor/Toolbar.vue';
  import editorField from './editor/Field.vue';
    export default {
      props: ['game', 'chapter'],
      components: {
        editorHeader,editorToolbar,editorField
      },
      methods: {
        setEditor(){
          this.$store.commit('setEditor',{game: this.game, chapter: this.chapter})
        }
      },
      created(){
        this.$store.commit('setEditorMode', true);
        this.setEditor();
      },
      mounted(){
        this.$store.commit('setContainer', this.$refs.editorContainer);
        let params = {
          gameHash: this.game,
          chapterHash: this.chapter
        }

        this.$http.get('editor.getBlocks',{params})
          .then(res => {

            let blocks = res.body.blocks;

            blocks.forEach(block => {
              setBlock(block)
            });


            this.$store.commit('setBlocks', blocks);
            console.log(res);
          })
      },
      computed: {
        windowSize(){
          return this.$store.getters.getSize
        },
        toolbarVisible(){
          return this.$store.getters.getToolbarVisible;
        }
      },
      beforeDestroy(){
        this.$store.commit('setEditorMode', false);
      },
      watch:{
        'this.game'(){
          this.setEditor();
        },
        'this.chapter'(){
          this.setEditor();
        }
      }
    }
</script>

<style scoped>

</style>
