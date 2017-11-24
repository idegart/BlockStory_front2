<template>
  <el-form-item label="Яндекс кошелек">
    <!--{{ user.settings.donate }}-->
    <el-input v-model="user.settings.donate.ya_money"
              placeholder="Введите свой кошелек"
              @input="inputMoney">
      <el-button slot="append"
                 @click="updateMoney"
                 :disabled="error"
                 icon="el-icon-edit"></el-button>
    </el-input>
    <div v-if="error"
         class="el-form-item__error">
      Кошелек должен содержать 13-15 цифр
    </div>
    <el-switch
      v-if="user.settings.donate.ya_money&&!error"
      @change="setDonate"
      v-model="user.settings.donate.allow"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
  </el-form-item>
</template>

<script>
    export default {
      props: ['user','systemUser'],
      data: () => ({
        error: false
      }),
      methods: {
        setDonate(e){
          if (this.error)
            return;

          let data = {
            hash: this.systemUser.hash,
            allow_donate: e ? 'true' : 'false',
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
            });
          this.user.extra.donate.allow = e;
        },
        inputMoney(){
          let money = this.user.settings.donate.ya_money;
          let re = /^([0-9]{13,15})$/i;
          if (!re.test(money)){
            this.error = true;
            return;
          }
          this.error = false;
        },
        updateMoney(){
          if (this.error)
            return;

          let data = {
            hash: this.systemUser.hash,
            ya_money: this.user.settings.donate.ya_money,
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
            })
          this.user.extra.donate.ya_money = this.user.settings.donate.ya_money;
        }
      }
    }
</script>
