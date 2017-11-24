<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="getAvatar(user.avatar)" class="profile-image">
    <div style="padding: 14px; text-align: center">
      <router-link :to="{name: 'Profile', params: {nickname: user.nickname}}" class="profile-link">
        <span>{{user.nickname}}</span>
      </router-link>
      <user-tag :type="user.type" style="margin-top: 5px"></user-tag>
    </div>
  </el-card>
</template>

<script>
  import userTag from './Tag.vue';
    export default {
      props: ['user'],
      components: {
        userTag
      },
      methods: {
        getAvatar(path){
          return path || require('@/assets/avatar-default.png');
        }
      }
    }
</script>

<style scoped>
  .profile-image{
    width: 100%;
  }
  .profile-link{
    display: block;
    font-size: 25px;
    text-decoration: none;
  }
</style>
