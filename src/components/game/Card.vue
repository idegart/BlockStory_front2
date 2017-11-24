<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="getCover(game.cover)" class="game-image">
    <div style="padding: 14px; text-align: center">
      <router-link :to="{name: 'Game', params: {alias: game.alias}}" class="game-link">
        <span>{{game.title}}</span>
      </router-link>

      <br/>

      <router-link :to="{name: 'Profile', params: {nickname: game.user.nickname}}" class="user-link">
        <span>{{game.user.nickname}}</span>
      </router-link>

      <br/>

      <game-tag :game="game"></game-tag>

      <br/>

      <game-tag-counters :game="game"></game-tag-counters>

      <br/>

      <game-tag-allows :allows="game.allows"></game-tag-allows>

      <br/>

      <el-tooltip effect="dark"
                  placement="right">
        <div v-if="user.hash" slot="content">Вы можете<br/>загружать прохождения</div>
        <div v-else slot="content">Чтобы сохранять<br/>необходимо зарегестрироваться</div>

        <el-dropdown @click="startClick"
                     @command="handleCommand"
                     split-button
                     type="primary"
                     size="small">
          Начать
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="!user.hash" command="continue">Продолжить</el-dropdown-item>
            <el-dropdown-item :disabled="!user.hash" command="saves">Сохранения</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-tooltip>

    </div>
  </el-card>
</template>

<script>
  import gameTag from './Tag.vue';
  import gameTagAllows from './TagAllows.vue';
  import gameTagCounters from './TagCounters.vue';
  export default {
    props: ['game'],
    components: {
      gameTag,gameTagAllows,gameTagCounters
    },
    methods: {
      getCover(path){
        return path || require('@/assets/game-default.jpg');
      },
      startClick(e){
        console.log(e);
      },
      handleCommand(e){
        if (e === 'saves'){
          this.$router.push({name: 'Game', params: {alias: this.game.alias}, query:{tab:'saves'}});
        }
        console.log(e);
      }
    },
    computed:{
      user(){
        return this.$store.getters.getUser;
      }
    }
  }
</script>

<style scoped>
  .game-image{
    width: 100%;
  }
  .game-link{
    font-size: 25px;
    text-decoration: none;
  }
  .user-link{
    font-size: 20px;
    text-decoration: none;
  }
  .el-card{
    margin-bottom: 15px;
  }
</style>
