<template>
  <el-form-item label="Обложка">
    <croppa v-model="croppa"
            :initial-image="game.cover"
            :width="200"
            :height="200"
            :prevent-white-space="true"
            initial-size="natural"
            placeholder="Обложка"
            accept=".jpeg,.png"
            :file-size-limit="1024*1025*15"
            @file-type-mismatch="onFileTypeMismatch"
            @file-size-exceed="onFileSizeExceed"
            @image-remove="coverRemove"
            style="margin-top: 10px;line-height: 0">
    </croppa>
    <br/>
    <el-button @click="updateCover" type="success" size="mini" plain>{{ $t('to_update') }}</el-button>
  </el-form-item>
</template>

<script>
    export default {
      props: ['game'],
      components: {
      },
      data: () => ({
        croppa: {}
      }),
      methods: {
        onFileTypeMismatch(){},
        onFileSizeExceed(){},
        coverRemove(){
          let data = {
            hash: this.game.hash,
            image_remove: 'cover',
          };

          this.$http.post('game.update', data)
            .then(res => {
              let status = res.body.error.status;
              if (status !== 1){
                return;
              }
              this.$message({
                message: this.$t('updated'),
                type: 'success'
              });
              this.user.avatar = null;
            })
        },
        updateCover(){
          let data = {
            hash: this.game.hash,
            image: 'cover',
            file: this.croppa.generateDataUrl('image/jpeg'),
            type: 'base64'
          };

          this.$http.post('game.update', data)
            .then(res => {
              console.log(res);
              let status = res.body.error.status;

              if (status !== 1){

                return;
              }
              this.$message({
                message: this.$t('updated'),
                type: 'success'
              });
              this.game.cover = res.body.image.src;
            })
        }
      }
    }
</script>
