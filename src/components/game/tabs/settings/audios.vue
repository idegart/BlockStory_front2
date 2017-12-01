<template>
  <el-form-item label="Аудиозаписи">
    <el-upload
      :action="audioUploadUrl"
      :data="audioUploadDataBackground"
      :on-success="successUploadAudio"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      multiple
      :limit="3"
      :file-list="game.extra.background.audios">

      <el-button size="small" type="primary">Click to upload</el-button>

    </el-upload>
  </el-form-item>
</template>

<script>
  import Vue from 'vue';

    export default {
      props: ['game'],
      data: () => ({
        audioUploadUrl: '',
        audioUploadDataBackground: {}
      }),
      methods: {
        successUploadAudio(response, file){

          console.log(response);

          let data = {
            hash: this.game.hash,
            new_audio: response.audio.hash
          };

          this.$http.post('game.update', data)
            .then(res => {
              file.hash = response.audio.hash;
              file.url = response.audio.url;
              console.log(res);
            });
        },
        handlePreview(file){
          let win = window.open(file.url, '_blank');
          win.focus();
        },
        handleRemove(file){
          let data = {
            hash: this.game.hash,
            del_audio: file.hash
          };

          this.$http.post('game.update', data)
            .then(res => {
              console.log(res);
            });
        },
      },
      mounted(){
        this.audioUploadUrl = Vue.http.options.root + 'audio.upload';

        this.audioUploadDataBackground = {
          session_token: this.$store.getters.getSession,
          type: 'inGameGlobal'
        };

        if (this.game.extra.background.card)
          this.cardList = [
            {name: '1', url: this.game.extra.background.card}
          ];
      }
    }
</script>
