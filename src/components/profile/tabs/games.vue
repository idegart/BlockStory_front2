<template>
  <div style="text-align: center">

    <el-button @click="createGame" type="success" round plain>Создать квест</el-button>

    <div>
      <h3>Авторские работы</h3>
      <el-alert
        v-if="!user.extra.games.owner.length"
        title="Пользователь еще не добавил своих квестов"
        type="info">
      </el-alert>
      <el-row :gutter="10"
              type="flex"
              style="flex-wrap: wrap"
              justify="space-around">
        <el-col v-for="(game, index) in user.extra.games.owner"
                :key="index"

                :xs="24" :sm="12" :md="8" :lg="6" :xl="4">

          <game-card :game="game"></game-card>

        </el-col>
      </el-row>
    </div>

    <div>
      <h3>Соавтор</h3>
      <el-alert
        v-if="!user.extra.games.shared.length"
        title="Пользователь еще не стал соавтором"
        type="info">
      </el-alert>
      <el-row :gutter="10"
              type="flex"
              style="flex-wrap: wrap"
              justify="space-around">
        <el-col v-for="(game, index) in user.extra.games.shared"
                :key="index"

                :xs="24" :sm="12" :md="8" :lg="6" :xl="4">

          <game-card :game="game"></game-card>

        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import  _ from 'lodash';

  import gameCard from '../../game/Card.vue';
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
    export default {
      props: ['user'],
      components: {
        ElCol,
        ElRow,
        gameCard
      },
      data: () => ({
        titleValid: false
      }),
      methods: {
//        titleValidation: _.debounce(
//          function (e) {
//            return 'Title is test'
//          }, 300
//        ),
        createGame(){
          let test = this.$prompt('Введите название квеста', '', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            roundButton: true,
//            inputValidator: this.titleValidation,
            inputErrorMessage: 'Название должно быть от 4 до 32 симвалов',
            inputPattern: /^([\sA-zА-я0-9]{4,32})$/i
          }).then(e => {
            let data = {
              title: e.value
            };

            this.$http.post('game.create', data)
              .then(res => {
                let data = res.body.data;
                this.$router.push({name: 'Game', params: {alias: data.game.alias}});
                console.log(res);
              });

//            this.$message({
//              type: 'success',
//              message: e.value
//            });
          }).catch(() => {});
        }
      }
    }
</script>
