<template>
  <div>
    <text-editor :fullscreen="textEditor.fullScreen"
                 @close="closeEditor"
                 @save="saveEditor"
                 :titleText="textEditor.title"
                 :params="textEditor.params"
                 mode="editor"
                 :visible="textEditor.visible">
    </text-editor>
  </div>
</template>

<script>
  import textEditor from '../../common/textEditor.vue';
    export default {
      components: {
        textEditor
      },
      methods: {
        closeEditor(){
          this.$store.commit('setEditorTextEditor',{});
        },
        saveEditor(e){
          let data = {
            block_hash: this.textEditor.block.hash,
            text: e.data.text
          };

          this.$store.commit('updateTextBlock', data);

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });

          this.closeEditor();
        }
      },
      computed: {
        textEditor(){
          return this.$store.getters.getEditorTextEditor
        }
      }
    }
</script>
