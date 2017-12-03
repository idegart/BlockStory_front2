<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="getCover(game.cover)" class="game-image">
    <div style="padding: 14px; text-align: center">
      <div class="card-text">
        <div class="card-text__title">
          <router-link :to="{name: 'Game', params: {alias: game.alias}}" class="game-link">
            <span>{{game.title}}</span>
          </router-link>
        </div>
        <div class="card-text__author">
          <router-link :to="{name: 'Profile', params: {nickname: game.user.nickname}}" class="user-link">
            <span>Автор: {{game.user.nickname}}</span>
          </router-link>
        </div>
      </div>

      <div class="card-tags">
        <game-tag :game="game"></game-tag>
      </div>

      <div class="card-tags">
        <game-tag-genre :genre="game.genre"></game-tag-genre>
      </div>

      <div class="card-counters">
        <game-tag-counters :game="game"></game-tag-counters>
      </div>

      <div class="card-allows">
        <game-tag-allows :allows="game.allows"></game-tag-allows>
      </div>

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
            <el-dropdown-item :disabled="true" command="continue" disabled>Продолжить</el-dropdown-item>
            <el-dropdown-item :disabled="true" command="saves" disabled>Сохранения</el-dropdown-item>
            <el-dropdown-item v-if="(['admin','moderator'].indexOf(user.type)+1)&&game.status!=='published'" divided command="publish">Опубликовать</el-dropdown-item>
            <el-dropdown-item v-if="(['admin','moderator'].indexOf(user.type)+1)&&game.status=='published'" divided command="toSandbox">Unpublic</el-dropdown-item>
            <el-dropdown-item v-if="(['admin','moderator'].indexOf(user.type)+1)&&game.status!=='banned'" command="ban">Заблокировать</el-dropdown-item>
            <el-dropdown-item v-if="(['admin','moderator'].indexOf(user.type)+1)&&game.status==='banned'" command="unban">Разблокировать</el-dropdown-item>
            <el-dropdown-item v-if="(['admin','moderator'].indexOf(user.type)+1)&&!game.allows.age" command="setAge">18+</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-tooltip>

    </div>
  </el-card>
</template>

<script>
  import gameTag from './Tag.vue';
  import gameTagGenre from './TagGenre.vue';
  import gameTagAllows from './TagAllows.vue';
  import gameTagCounters from './TagCounters.vue';
  export default {
    props: ['game'],
    components: {
      gameTag,gameTagAllows,gameTagCounters,gameTagGenre
    },
    methods: {
      getCover(path){
        return path || require('@/assets/game-default.jpg');
      },
      startClick(){
        this.$router.push({name: 'Play', params: {alias: this.game.alias}});
      },
      setStatus(status){
        let data = {
          hash: this.game.hash,
          status
        };

        this.$http.post('game.update', data)
          .then(res => {
            console.log(res);
            this.game.status = status;
          })

      },
      handleCommand(e){
        switch (e){
          case 'saves':
            this.$router.push({name: 'Game', params: {alias: this.game.alias}, query:{tab:'saves'}});
            return;
          case 'publish':
            this.setStatus('published');
            return;
          case 'ban':
            this.setStatus('banned');
            return;
          case 'unban':
          case 'toSandbox':
            this.setStatus('new');
            return;
          case 'setAge':
            let data = {
              hash: this.game.hash,
              allow: 'age'
            };
            this.$http.post('game.update', data)
              .then(res => {
                console.log(res);
                this.game.allows.age = true;
              })
        }
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
  .card-text{
    text-align: left;
    line-height: 1em;
  }
  .card-text__author{
    margin-top: 5px;
  }
  .game-link span{
    font-size: 22px;
    color: #475669;
  }
  .user-link span{
    font-size: 18px;
    color: #8492A6;
  }
  .game-image{
    width: 100%;
  }
  .game-link{
    font-size: 25px;
    text-decoration: none;
  }
  .card-tags, .card-counters, .card-allows{
    margin-top: 10px;
  }
  .card-allows{
    margin-bottom: 10px;
  }
  .user-link{
    font-size: 20px;
    text-decoration: none;
  }
  .el-card{
    margin-bottom: 15px;
  }
</style>
