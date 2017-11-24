<template>
  <el-form-item :label="$t('password')">
    <el-button v-if="!changePass" @click="changePass=!changePass" size="mini" type="warning" plain>{{ $t('set_password_btn') }}</el-button>

    <el-input v-if="changePass" type="password" :placeholder="$t('set_password_placeholder_old')" v-model="oldPass"></el-input>
    <el-input v-if="changePass" type="password" :placeholder="$t('set_password_placeholder_new')" v-model="newPass"></el-input>

    <el-button v-if="changePass" @click="toChange" :disabled="passValidator" size="mini" type="success" plain>{{ $t('set_password_btn_save') }}</el-button>
    <el-button v-if="changePass" @click="clearForm" size="mini" type="info" plain>{{ $t('cancel') }}</el-button>

  </el-form-item>
</template>

<script>
    export default {
      props: ['user', 'systemUser'],
      data: () => ({
        changePass: false,
        oldPass: '',
        newPass: ''
      }),
      methods: {
        clearForm(){
          this.changePass = false;
          this.oldPass = '';
          this.newPass = '';
        },
        toChange(){
          let data = {
            old_password: this.oldPass,
            new_password: this.newPass,
          };

          this.clearForm();

          this.$http.post('user.update', data)
            .then(res => {
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
            })
        }
      },
      computed: {
        passValidator(){
          return !Boolean(this.newPass)
        }
      }
    }
</script>
