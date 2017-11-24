<template>
  <el-form-item :label="$t('email')">
    <el-input v-model="user.settings.email.address"
              :disabled="user.settings.email.confirmed"
              :placeholder="$t('set_email_placeholder_email')">
      <el-button v-if="!user.settings.email.confirmed"
                 @click="updateEmail"
                 slot="append" icon="el-icon-message"></el-button>
    </el-input>
    <el-input v-model="email_key"
              v-if="!user.settings.email.confirmed"
              :disabled="user.settings.email.confirmed"
              :placeholder="$t('set_email_placeholder_key')">
      <el-button @click="updateKey"
                 slot="append" icon="el-icon-check"></el-button>
    </el-input>
    <div v-if="error"
         class="el-form-item__error">
      {{ $t('set_nickname_error_style') }}
    </div>
  </el-form-item>
</template>

<script>
  export default {
    props: ['user', 'systemUser'],
    data: () => ({
      error: false,
      email_key: '',
    }),
    methods: {
      updateKey(){
        let data = {
          hash: this.systemUser.hash,
          email_key: this.email_key,
        };

        this.$http.post('user.update', data)
          .then(res => {
            console.log(res);
            let error = res.body.error.status;
            if (error !== 1){
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
            this.user.settings.email.confirmed = true;
          })
      },
      updateEmail(){
        let data = {
          hash: this.systemUser.hash,
          email: this.user.settings.email.address,
        };

        this.$http.post('user.update', data)
          .then(res => {
            console.log(res);
            let error = res.body.error.status;
            if (error !== 1){
              if (error === 105){
                this.$message({
                  message: this.$t('set_error_email_bad'),
                  type: 'warning'
                });
                return;
              }
              if (error === 106){
                this.$message({
                  message: this.$t('set_error_email_busy'),
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
          })
      }
    }
  }
</script>

<style scoped>
  .el-form-item__error{
    font-size: 14px;
  }
</style>
