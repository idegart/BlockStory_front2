<template>
  <el-form-item label="Описание">
    <el-button @click="openEditor" type="primary" plain size="mini">Редактировать</el-button>

    <text-editor :fullscreen="true"
                 @close="closeEditor"
                 @save="saveEditor"
                 titleText="Описание"
                 :params="{fields: {text: game.extra.description}}"
                 :visible="visible">
    </text-editor>

  </el-form-item>
</template>

<script>
  import textEditor from '../../../common/textEditor.vue';
  export default {
    props: ['game'],
    components: {
      textEditor
    },
    data: () => ({
      visible: false,
    }),
    methods: {
      openEditor(){
        this.visible = true;
      },
      closeEditor(e){
        this.visible = false;
      },
      saveEditor(e){
        let data = {
          hash: this.game.hash,
          description: e.data.text
        };

        this.$http.post('game.update', data)
          .then(res => {
            console.log(res);
          });

        this.game.extra.description = data.description;
        this.visible = false;
      }
    }
  }
</script>
