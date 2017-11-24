<template>
  <div>
    <el-alert
      v-if="!authUser.hash"
      title="Данный раздел доступен только авторизированным пользователям"
      type="info">
    </el-alert>

    <el-alert
      v-if="!game.allows.statistics&&authUser.hash&&authUser.hash!=game.user.hash"
      title="Статистика недоступна"
      type="info">
    </el-alert>

    <div v-if="authUser.hash&&game.allows.statistics||authUser.hash==game.user.hash">
      <el-button v-if="!loaded" @click="loaded=true">Load</el-button>
      <line-chart
        v-if="loaded"
        id="line"
        :data="statistic"
        xkey="data"
        :ykeys="['reg','all']"
        :labels="['пользователи','все']"
        :grid="true"
        :parseTime="false"
      ></line-chart>
      <span v-if="loaded" style="display:block;text-align: center">Дней назад</span>
    </div>
  </div>
</template>

<script>
  import Raphael from 'raphael/raphael'
  global.Raphael = Raphael

  import { LineChart } from 'vue-morris'
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";

  const COLORS = [ '#42B8E0', '#33658A', '#F6AE2D', '#F26419', '#0E3A53' ];


  export default {
    props: ['game'],
    components: {
      LineChart
    },
    data: () => ({
      loaded: false,
      statistic: [
        { data: '7', reg: '10', all: '10' },
        { data: '6', reg: '15', all: '20' },
        { data: '5', reg: '20', all: '10' },
        { data: '4', reg: '25', all: '15' },
        { data: '3', reg: '30', all: '25' },
        { data: '2', reg: '25', all: '25' },
        { data: '1', reg: '10', all: '15' }
      ]
    }),
    computed:{
      authUser(){
        return this.$store.getters.getUser;
      }
    }



  }
</script>
