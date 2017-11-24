<template>
  <el-form-item :label="$t('set_nickname')">
    <el-input v-model="user.nickname">
      <el-button slot="append"
                 @click="updateNickname"
                 :disabled="checkNickname"
                 icon="el-icon-edit"></el-button>
    </el-input>
    <div v-if="checkNickname"
         class="el-form-item__error">
      {{ $t('set_nickname_error_style') }}
    </div>
  </el-form-item>
</template>

<script>
    export default {
      props: ['user', 'systemUser'],
      data: () => ({
        error: false
      }),
      methods: {
        inputNickname(){

        },
        updateNickname(){
          let data = {
            hash: this.systemUser.hash,
            nickname: this.user.nickname,
          };

          this.$http.post('user.update', data)
            .then(res => {
              let error = res.body.error.status;
              if (error !== 1){
                if (error === 103){
                  this.$message({
                    message: this.$t('set_error_nickname_bad'),
                    type: 'warning'
                  });
                  return;
                }
                if (error === 104){
                  this.$message({
                    message: this.$t('set_error_nickname_busy'),
                    type: 'warning'
                  });
                  return;
                }
                this.$message({
                  message: this.$t('error_common'),
                  type: 'warning'
                });
                return;
              }
              this.$message({
                message: this.$t('updated'),
                type: 'success'
              });
              this.$store.commit('updateUser', {key: 'nickname', value: this.user.nickname});
              this.$router.push({name: 'Profile', params: {nickname: this.user.nickname}})
            })
        }
      },
      computed:{
        checkNickname(){
          let nickname = this.user.nickname;

          let re = /^([A-z0-9]{4,16})$/i;
          return !re.test(nickname)
        }
      }
    }
</script>

<style scoped>
  .el-form-item__error{
    font-size: 14px;
  }
</style>
