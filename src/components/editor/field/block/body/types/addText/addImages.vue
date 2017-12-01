<template>
  <div style="padding: 10px">
    <div>
      <el-upload
        :file-list="block.extra.images.cards"
        :action="imageUploadUrl"
        :data="imageUploadDataCard"
        :on-preview="handlePreview"
        :on-remove="handleRemoveCard"
        :on-success="successUploadCard"
        :limit="1"
        list-type="picture">
        <el-button size="small" type="primary">Upload card</el-button>
        <div slot="tip" class="el-upload__tip">jpg/png files</div>
      </el-upload>
    </div>

    <div style="margin: 15px"></div>

    <div>
      <el-upload
        :file-list="block.extra.images.backgrounds"
        :action="imageUploadUrl"
        :data="imageUploadDataBackground"
        :on-preview="handlePreview"
        :on-remove="handleRemoveBackground"
        :on-success="successUploadBackground"
        :limit="1"
        list-type="picture">
        <el-button size="small" type="primary">Upload background</el-button>
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
        imageUploadUrl:'',
        imageUploadDataCard: {},
        imageUploadDataBackground: {}
      }),
      methods: {
        handlePreview(){},
        handleRemoveCard(){

          let data = {
            block_hash: this.block.hash,
            image_card: null
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });
        },
        handleRemoveBackground(){

          let data = {
            block_hash: this.block.hash,
            image_background: null
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });
        },
        successUploadCard(response, file, fileList){
          console.log(response);
          let data = {
            block_hash: this.block.hash,
            image_card: response.image.hash
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });
        },
        successUploadBackground(response, file, fileList){
          console.log(response);
          let data = {
            block_hash: this.block.hash,
            image_background: response.image.hash
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });
        }
      },
      mounted(){
        this.imageUploadUrl = Vue.http.options.root + 'image.upload';

        this.imageUploadDataCard = {
          session_token: this.$store.getters.getSession,
          type: 'inGameCard'
        };

        this.imageUploadDataBackground = {
          session_token: this.$store.getters.getSession,
          type: 'inGameBackground'
        };
      }
    }
</script>
