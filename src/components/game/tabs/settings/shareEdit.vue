<template>
  <el-form-item label="Предоставить доступ">

    <el-tag
      v-for="user in game.extra.coAuthors"
      :key="user.hash"
      :closable="true"
      @close="delUser(user)"
      type="primary">
      {{user.nickname}}
    </el-tag>

    <br/>

    <el-select
      v-if="game.extra.coAuthors.length<5"
      v-model="user"
      @change="setUser"
      filterable
      remote
      placeholder="Никнейм"
      :remote-method="searchUser"
      :loading="loading">
      <el-option
        v-for="user in users"
        :key="user.hash"
        :label="user.nickname"
        :value="user.hash">
      </el-option>
    </el-select>

    <span v-if="game.extra.coAuthors.length>=5">Максимум 5 человек</span>

  </el-form-item>
</template>

<script>
  import _ from 'lodash';

  export default {
    props: ['game'],
    data: () => ({
      user: null,
      users: [],
      loading: false
    }),
    methods: {
      delUser(user){

        let data = {
          hash: this.game.hash,
          share_edit: user.hash,
          method: 'del'
        };

        this.$http.post('game.update', data)
          .then(res => {
            console.log(res);
            this.game.extra.coAuthors.splice(this.game.extra.coAuthors.indexOf(user), 1);
          });
      },
      searchUser(nickname){

        if (nickname === '' || nickname === null)
          return;

        let data = {
          game_hash: this.game.hash,
          nickname
        };

        this.$http.post('user.find', data)
          .then(res => {
            console.log(res);
            this.users = res.body.users
          });
      },
      setUser(user){
        let data = {
          hash: this.game.hash,
          share_edit: user,
          method: 'add'
        };

        this.$http.post('game.update', data)
          .then(res => {
            console.log(res);
            for (let i=0; i < this.users.length; i++){

              if (this.users[i].hash === user){
                this.game.extra.coAuthors.push(this.users[i]);
                this.user = ''
              }
            }
          });
      }
    }
  }
</script>
