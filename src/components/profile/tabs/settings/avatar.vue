<template>
  <el-form-item :label="$t('set_avatar')">
      <croppa v-model="croppa"
              :initial-image="user.avatar"
              :width="200"
              :height="200"
              :prevent-white-space="true"
              initial-size="natural"
              :placeholder="$t('set_avatar_placeholder')"
              accept=".jpeg,.png"
              :file-size-limit="1024*1025*15"
              @file-type-mismatch="onFileTypeMismatch"
              @file-size-exceed="onFileSizeExceed"
              @image-remove="avatarRemove"
              style="margin-top: 10px;line-height: 0">
      </croppa>
    <br/>
    <el-button @click="updateAvatar" type="success" size="mini" plain>{{ $t('to_update') }}</el-button>
  </el-form-item>
</template>

<script>
    export default {
      props: ['user', 'systemUser'],
      components: {
      },
      data: () => ({
        croppa: {}
      }),
      methods: {
        onFileTypeMismatch(){},
        onFileSizeExceed(){},
        avatarRemove(){
          let data = {
            image: 'avatar',
            image_hash: null
          };

          this.user.avatar = null;

          this.$http.post('user.update', data)
            .then(res => {
              this.$message({
                message: this.$t('updated'),
                type: 'success'
              });
            });
        },
        updateAvatar(){
          let data = {
            type: 'avatar',
            file: this.croppa.generateDataUrl('image/jpeg'),
            options: {
              type: 'base64'
            }
          };

          this.$http.post('image.upload', data)
            .then(res => {
              console.log(res);

              this.user.avatar = res.body.image.path;

              let data = {
                image: 'avatar',
                image_hash: res.body.image.hash
              };

              this.$http.post('user.update', data)
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
