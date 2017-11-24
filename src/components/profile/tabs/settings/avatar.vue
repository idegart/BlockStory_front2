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
            image_remove: 'avatar',
          };

          this.$http.post('user.update', data)
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
        updateAvatar(){
          let data = {
            image: 'avatar',
            file: this.croppa.generateDataUrl('image/jpeg'),
            type: 'base64'
          };

          this.$http.post('user.update', data)
            .then(res => {
              let status = res.body.error.status;

              if (status !== 1){

                return;
              }
              this.$message({
                message: this.$t('updated'),
                type: 'success'
              });
              this.user.avatar = res.body.image.src;
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
