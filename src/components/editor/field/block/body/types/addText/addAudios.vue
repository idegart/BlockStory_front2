<template>
  <div style="padding: 10px">
    <div>
      <el-upload
        :file-list="block.extra.audios.background"
        :action="audioUploadUrl"
        :data="audioUploadDataBackground"
        :on-preview="handlePreview"
        :on-remove="handleRemoveBackground"
        :on-success="successUploadBackground"
        accept="audio/*"
        :limit="1">
        <el-button size="small" type="primary">Upload audio</el-button>
        <div slot="tip" class="el-upload__tip">jpg/png files</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
    export default {
      props: ['block'],
      data: () => ({
        audioUploadUrl:'',
        audioUploadDataBackground: {}
      }),
      methods: {
        handlePreview(){},
        handleRemoveBackground(){

          let data = {
            block_hash: this.block.hash,
            audio_card: null
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });
        },
        successUploadBackground(response){
          console.log(response);
          let data = {
            block_hash: this.block.hash,
            audio_card: response.audio.hash
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });
        }
      },
      mounted(){
        this.audioUploadUrl = Vue.http.options.root + 'audio.upload';

        this.audioUploadDataBackground = {
          session_token: this.$store.getters.getSession,
          type: 'inGameGlobal'
        };
      }
    }
</script>
