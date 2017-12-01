<template>
  <el-form-item :label="$t('set_background')">
    <croppa v-model="croppa"
            :initial-image="game.extra.background.image"
            :width="400"
            :height="200"
            :prevent-white-space="true"
            initial-size="natural"
            :placeholder="$t('set_background_placeholder')"
            accept=".jpeg,.png"
            :file-size-limit="1024*1025*25"
            @file-type-mismatch="onFileTypeMismatch"
            @file-size-exceed="onFileSizeExceed"
            @image-remove="backgroundRemove"
            style="margin-top: 10px;line-height: 0"
    >
    </croppa>
    <br/>
    <el-button @click="updateBackground" type="success" size="mini" plain>{{ $t('to_update') }}</el-button>
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
      backgroundRemove(){
        let data = {
          hash: this.game.hash,
          image: 'background',
          image_hash: null
        };

        this.game.extra.background.image = null;

        this.$http.post('game.update', data)
          .then(res => {
            this.$message({
              message: this.$t('updated'),
              type: 'success'
            });
          });
      },
      updateBackground(){
        let data = {
          type: 'gameBackground',
          file: this.croppa.generateDataUrl('image/jpeg'),
          options: {
            type: 'base64'
          }
        };

        this.$http.post('image.upload', data)
          .then(res => {
            console.log(res);

            this.game.extra.background.image = res.body.image.path;

            let data = {
              hash: this.game.hash,
              image: 'background',
              image_hash: res.body.image.hash
            };

            this.$http.post('game.update', data)
              .then(res => {
                this.$message({
                  message: this.$t('updated'),
                  type: 'success'
                });
              });
          })
      }
    }
  }
</script>

<style scoped>
  .croppa-container {
    background-color: lightblue;
    border: 2px solid grey;
    border-radius: 8px;
  }

  .croppa-container:hover {
    opacity: 1;
    background-color: #8ac9ef;
  }
  .el-form-item{
    line-height: 0;
    font-size: 20px;
  }
</style>
