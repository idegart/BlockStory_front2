<template>
  <el-form-item label="Карточка">
    <el-upload
      :action="cardUploadUrl"
      :data="cardUploadDataBackground"
      :file-list="cardList"
      list-type="picture-card"
      :on-success="successUploadCard"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      accept="image/*"
      :limit="1">
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="game.extra.background.card" alt="">
    </el-dialog>

  </el-form-item>
</template>

<script>
  import Vue from 'vue';

    export default {
      props: ['game'],
      data: ()=>({
        cardUploadUrl: '',
        cardUploadDataBackground: {},
        dialogVisible: false,
        cardList: []
      }),
      methods: {
        uploadCard(image_card=null){
          let data = {
            hash: this.game.hash,
            image_card
          };

          this.$http.post('game.update', data)
            .then(res => {
              console.log(res);
            })
        },
        successUploadCard(response){
          this.game.extra.background.card = response.image.path;
          this.uploadCard(response.image.hash);
          console.log(response);
        },
        handleRemove(file, fileList) {
          this.uploadCard();
        },
        handlePictureCardPreview() {
          this.dialogImageUrl = this.game.extra.background.card;
          this.dialogVisible = true;
        }
      },
      mounted(){
        this.cardUploadUrl = Vue.http.options.root + 'image.upload';

        this.cardUploadDataBackground = {
          session_token: this.$store.getters.getSession,
          type: 'gameCard'
        };

        if (this.game.extra.background.card)
          this.cardList = [
            {name: '1', url: this.game.extra.background.card}
          ];
      }
    }
</script>
