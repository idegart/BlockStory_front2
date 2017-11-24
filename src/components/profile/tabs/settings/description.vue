<template>
  <el-form-item label="Описание">
    <el-button @click="openEditor" type="primary" plain size="mini">Редактировать</el-button>

    <text-editor :fullscreen="true"
                 @close="closeEditor"
                 @save="saveEditor"
                 titleText="Описание"
                 :params="{fields: {text: user.extra.description}}"
                 :visible="visible">
    </text-editor>

  </el-form-item>
</template>

<script>
  import textEditor from '../../../common/textEditor.vue';
    export default {
      props: ['user'],
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
            description: e.data.text
          };

          this.$http.post('user.update', data)
            .then(res => {
              console.log(res);
            });

          this.user.extra.description = data.description;
          this.visible = false;
        }
      }
    }
</script>
