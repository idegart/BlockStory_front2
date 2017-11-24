<template>
  <el-form label-width="120px">

    <user-nickname :user="user" :systemUser="systemUser"></user-nickname>
    <user-email :user="user" :systemUser="systemUser"></user-email>
    <user-password :user="user" :systemUser="systemUser"></user-password>
    <user-vk :user="user" :systemUser="systemUser"></user-vk>
    <user-avatar :user="user" :systemUser="systemUser"></user-avatar>
    <user-back :user="user"></user-back>
    <user-back-color :user="user"></user-back-color>
    <user-description :user="user" :systemUser="systemUser"></user-description>
    <user-donate :user="user" :systemUser="systemUser"></user-donate>
    <user-delete :user="user" :systemUser="systemUser"></user-delete>

  </el-form>
</template>

<script>
  import userNickname from './settings/nickname.vue'
  import userEmail from './settings/email.vue'
  import userPassword from './settings/password.vue'
  import userVk from './settings/vk.vue'
  import userAvatar from './settings/avatar.vue'
  import userBack from './settings/back.vue'
  import userBackColor from './settings/backColor.vue';
  import userDescription from './settings/description.vue'
  import userDelete from './settings/delete.vue'
  import userDonate from './settings/donate.vue'
    export default {
      props: ['user'],
      components: {
        userNickname,userEmail,userPassword,userVk,userAvatar,userBack,userBackColor,
        userDescription,userDelete,userDonate
      },
      computed: {
        systemUser(){
          return this.$store.getters.getUser;
        }
      }
    }
</script>

<style scoped>
  .el-form-item__content{
    line-height: 0;
  }
</style>
