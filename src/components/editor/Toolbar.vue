<template>
  <div class="toolbar">

    <div style="text-align: center">
      <router-link :to="{name: 'Game', params: {alias}}">
        <el-button>{{ $t('backToGame')}}</el-button>
      </router-link>
    </div>



    <params></params>
    <chapter-starter></chapter-starter>
    <chapters></chapters>

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
      computed: {
        alias(){
          return this.$store.getters.getAlias;
        }
      }
    }
</script>

<style scoped>
  .toolbar{
    padding: 5px;
  }
</style>
