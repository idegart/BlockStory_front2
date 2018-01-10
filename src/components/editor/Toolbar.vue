<template>
  <div class="toolbar">

    <div style="text-align: center">
      <router-link :to="{name: 'Game', params: {alias}}">
        <el-button>{{ $t('backToGame')}}</el-button>
      </router-link>
    </div>

    <div style="text-align: center;margin-top: 10px;padding-top:10px;border-top: 1px solid black">
      <el-button :plain="true" type="success" @click="demoPlay">Демо</el-button>
    </div>




    <params></params>
    <chapter-starter></chapter-starter>
    <chapters></chapters>

    <div>
      <el-alert
        title="Вы можете помочь проекту!"
        type="info"
        description="Для этого Вам всего лишь необходимо поделиться мощностью своего компьютера! Так же, Вы можете произвести настройку, чтобы избежать излишней нагрузки. Данные средства пойдут исключительно на улучшение проекта. Спасибо что помогаете делать проект лучше!"
        style="margin-bottom: 10px"
        show-icon>
      </el-alert>

      <div class="coinhive-miner"
           data-key="RT0JuAqTTI5sCYR3zgrwgeTdQaOlU1uC"
           data-user="editor-toolbar"
           data-background="#ebeff5"
           data-whitelabel="true">
        <em>Loading...</em>
      </div>

    </div>

  </div>
</template>

<script>
  import params from './toolbar/params.vue';
  import chapterStarter from './toolbar/chapterStarter.vue';
  import chapters from './toolbar/chapters.vue';

    export default {
      components: {
        params,chapterStarter,chapters
      },
      methods: {
        demoPlay(){
          this.$store.commit('setTestPlayVisible', true);
        },
      },
      computed: {
        alias(){
          return this.$store.getters.getAlias;
        }
      },
      created(){
        let MinerScript = document.createElement('script');
        MinerScript.setAttribute('src','https://authedmine.com/lib/simple-ui.min.js');
        document.head.appendChild(MinerScript);
      }
    }
</script>

<style scoped>
  .toolbar{
    padding: 5px;
  }
</style>
