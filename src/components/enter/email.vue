<template>
  <div v-loading="isLoading">
    <el-steps :active="activeStep" finish-status="success" align-center>
      <el-step :title="$t('email')"></el-step>
      <el-step :title="$t('password')"></el-step>
      <el-step v-if="isReg" :title="$t('confirmation')"></el-step>
    </el-steps>


    <el-form v-if="activeStep==0">

      <el-form-item :label="$t('enter_email')">
        <el-input v-model="email" :autofocus="true" :placeholder="$t('enter_email')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="toEnter">{{ $t('to_enter') }}</el-button>
        <el-button type="primary" @click="toReg">Регистрация</el-button>
      </el-form-item>

    </el-form>


    <el-form v-if="activeStep==1">

      <el-form-item :label="$t('enter_password')">
        <el-input v-model="pass" :type="passVisible?'password':'text'" :placeholder="$t('enter_password')">
          <template slot="append">
            <el-button slot="append" icon="el-icon-view" @click="passVisible=!passVisible"></el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="toContinue">{{ $t('continue') }}</el-button>
        <el-button @click="clearForm">{{ $t('cancel') }}</el-button>
      </el-form-item>

    </el-form>


    <el-form v-if="activeStep==2">

      <el-form-item :label="$t('enter_key')">
        <el-input v-model="key" @input="autoKey" :placeholder="$t('enter_key')"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" @click="checkKey()">{{ $t('continue') }}</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import {validateEmail} from '@/functions/regex'
  export default {
    data: () => ({
      activeStep: 0,
      isLoading: false,
      isReg: false,
      passVisible: true,
      email: '',
      pass: '',
      key: '',
      keyError: 0
    }),
    methods: {

      toEnter(){
        this.isReg = false;

        if (!this.checkEmail())
          return;

        this.isLoading = true;
        let params = {
          email: this.email
        };

        this.$http.get('auth.checkEmail', {params})
          .then(res => {
            this.isLoading = false;
            let error = res.body.error.status;
            if (error !== 1){
              if (error === 101){
                this.$message({
                  message: this.$t('error_notEmail'),
                  type: 'warning'
                });
                return;
              }
              if (error === 2){
                this.$message({
                  message: this.$t('error_userNotExist'),
                  type: 'warning'
                });
                return;
              }
              this.$message({
                message: this.$t('error_common'),
                type: 'warning'
              });
              console.error(res.body.error.message);
              return;
            }
            this.activeStep = 1;
          })
      },
      toReg(){
        this.isReg = true;

        if (!this.checkEmail())
          return;

        this.isLoading = true;
        let params = {
          email: this.email
        };

        this.$http.get('auth.checkEmail', {params})
          .then(res => {
            this.isLoading = false;
            let error = res.body.error.status;
            if (error !== 2){
              if (error === 101){
                this.$message({
                  message: this.$t('error_notEmail'),
                  type: 'warning'
                });
                return;
              }
              if (error === 1){
                this.$message({
                  message: this.$t('error_userExist'),
                  type: 'warning'
                });
                return;
              }
              this.$message({
                message: this.$t('error_common'),
                type: 'warning'
              });
              console.error(res.body.error.message);
              return;
            }
            this.activeStep = 1;
          })
      },
      toContinue(){
        this.pass = this.pass.trim();
        if (this.pass.length < 4 || this.pass.length > 16){
          this.$message({
            message: this.$t('error_passLength'),
            type: 'warning'
          });
          return false;
        }
        this.isLoading = true;

        let data = {
          email: this.email,
          password: this.pass
        };


        if (this.isReg){
          this.$http.post('auth.regEmail', data)
            .then(res => {
              if (res.body.error.status !== 1){
                this.$message({
                  message: this.$t('error_common'),
                  type: 'warning'
                });
                return;
              }
              this.$message({
                message: this.$t('message_checkEmail'),
                type: 'success'
              });
              this.isLoading = false;
              this.activeStep = 2;
            });
          return;
        }
        this.$http.post('auth.enterEmail', data)
          .then(res => {
            this.isLoading = false;
            let error = res.body.error.status;
            if (error !== 1){
              if (error === 101){
                this.$message({
                  message: this.$t('error_notEmail'),
                  type: 'warning'
                });
                return;
              }
              if (error === 102){
                this.$message({
                  message: this.$t('error_userNotExist'),
                  type: 'warning'
                });
                this.clearForm();
                return;
              }
              if (error === 103){
                this.$message({
                  message: this.$t('error_badPass'),
                  type: 'warning'
                });
                this.clearForm();
                return;
              }
              if (error === 104){
                this.$notify({
                  title: this.$t('error_common_warning'),
                  message: this.$t('error_userBanned')
                });
                this.clearForm();
                return;
              }
              if (error === 105){
                this.$prompt(this.$t('enter_key'), this.$t('error_noKey'), {
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                }).then(e => {
                  this.key = e.value;
                  this.checkKey();
                }).catch(() => {
                  this.clearForm();
                });
                return;
              }
              this.$message({
                message: this.$t('error_common'),
                type: 'warning'
              });
              this.clearForm();
              return;
            }
            let user = res.body.user;
            this.$store.commit('setUser', user);
            this.$store.commit('setSession', res.body.token.session);
            this.$router.push({name: 'Profile', params: {nickname: user.nickname}});
          })
      },
      autoKey(e){
        if (this.key.length === 8)
          this.checkKey();
      },
      checkKey(){
        this.isLoading = true;
        let data = {
          email: this.email,
          key: this.key.trim()
        };

        this.$http.post('auth.checkEmailKey', data)
          .then(res => {
            this.isLoading = false;
            let error = res.body.error.status;
            if (error !== 1){
              this.keyError++;
              if (this.keyError>=4){
                this.$message({
                  message: this.$t('error_common'),
                  type: 'warning'
                });
                this.clearForm();
              }
              this.$message({
                message: this.$t('error_badKey'),
                type: 'warning'
              });
              return;
            }
            let user = res.body.user;
            this.$store.commit('setUser', user);
            this.$store.commit('setSession', res.body.token.session);
            this.$router.push({name: 'Profile', params: {nickname: user.nickname}});
          })

      },
      checkEmail(){
        this.email = this.email.trim();
        if (!validateEmail(this.email)){
          this.$message({
            message: this.$t('error_notEmail'),
            type: 'warning'
          });
          return false;
        }
        return true;
      },
      clearForm(){
        this.activeStep = 0;
        this.email = '';
        this.pass = '';
        this.key = '';
        this.keyError = 0;
      }
    }
  }
</script>
