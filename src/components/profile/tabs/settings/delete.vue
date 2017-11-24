<template>
  <el-form-item :label="$t('set_delUser')">
    <el-button @click="delUser" type="danger" size="mini" round>
      {{ $t('set_delUser_btn') }}
    </el-button>
  </el-form-item>
</template>

<script>
    export default {
      props: ['user', 'systemUser'],
      methods: {
        delUser(){
          this.$prompt(this.$t('set_delUser_message'), this.$t('set_delUser_tip'), {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
          }).then(e => {
            let data = {
              hash: this.systemUser.hash,
              password: e.value
            };

            this.$http.post('user.delete', data)
              .then(res => {
                console.log(res);
                let error = res.body.error.status;
                if (error !== 1){
                  this.$message({
                    message: this.$t('error_common'),
                    type: 'error'
                  });
                  return;
                }
                this.$message({
                  message: this.$t('set_error_userDeleted'),
                  type: 'success'
                });
                this.$store.commit('exitUser');
                this.$router.push({name: 'Main'});
              })
          }).catch(() => {});
        }
      },
    }
</script>
