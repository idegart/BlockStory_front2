<template>
  <el-container :style="'height:'+ windowSize.height +'px'">

    <el-aside v-show="toolbarVisible"
              width="300px"
              style="background-color: rgb(238, 241, 246)">
      <editor-toolbar></editor-toolbar>
    </el-aside>

    <el-container direction="vertical">
      <editor-header></editor-header>
      <editor-field style="position: relative" ref="editorContainer"></editor-field>
    </el-container>

    <test-play></test-play>

  </el-container>
</template>

<script>
  import {setBlock} from './editor/functions/renderBlock';

  import editorHeader from './editor/Header.vue';
  import editorToolbar from './editor/Toolbar.vue';
  import editorField from './editor/Field.vue';

  import testPlay from './editor/testPlay.vue';
    export default {
      props: ['game', 'chapter'],
      components: {
        editorHeader,editorToolbar,editorField,testPlay
      },
      methods: {
        setEditor(){
          this.$store.commit('setLoading', true);
          this.$store.commit('setEditor',{game: this.game, chapter: this.chapter});
          this.$store.commit('setContainer', this.$refs.editorContainer);
          let params = {
            gameHash: this.game,
            chapterHash: this.chapter
          }

          this.$http.get('editor.getAll',{params})
            .then(res => {
              console.log(res);
              let blocks = res.body.blocks;

              blocks.forEach(block => {
                setBlock(block)
              });

              this.$store.commit('setBlocks', blocks);
              this.$store.commit('setChapters', res.body.chapters);
              this.$store.commit('setParams', res.body.params);
              this.$store.commit('setChapterStarter', res.body.extra.chapter_starter);
              this.$store.commit('setAlias', res.body.extra.alias);
              this.$store.commit('setLoading', false);
            })
        }
      },
      created(){
        this.$store.commit('setEditorMode', true);
        this.setEditor();
      },
      mounted(){
        this.setEditor();
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
        },
        '$route'(){
          this.setEditor();
        }
      }
    }
</script>

<style scoped>

</style>
