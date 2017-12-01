<template>
  <el-tabs v-model="activeTab" type="border-card">
    <el-tab-pane label="Общее" name="common">
      <tab-common :game="game"></tab-common>
    </el-tab-pane>
    <el-tab-pane label="Комментарии" name="comments">
      <tab-comments :game="game"></tab-comments>
    </el-tab-pane>
    <el-tab-pane label="Соавторы" name="coAuthors">
      <tab-co-authors :game="game"></tab-co-authors>
    </el-tab-pane>
    <el-tab-pane label="Сохранения" name="saves">
      <tab-saves :game="game"></tab-saves>
    </el-tab-pane>
    <!--<el-tab-pane v-if="game.allows.statistics || authUser.hash && (authUser.hash==game.user.hash || isCoauthor)"-->
                 <!--label="Статистика" name="statistic">-->
      <!--<tab-statistic :game="game"></tab-statistic>-->
    <!--</el-tab-pane>-->
    <el-tab-pane v-if="authUser.hash && (authUser.hash==game.user.hash || isCoauthor)"
                 label="Настройки" name="settings">
      <tab-settings :game="game"></tab-settings>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import tabCommon from './tabs/common.vue';
  import tabComments from './tabs/comments.vue';
  import tabCoAuthors from './tabs/coAuthors.vue';
  import tabSaves from './tabs/saves.vue';
//  import tabStatistic from './tabs/statistic.vue';
  import tabSettings from './tabs/settings.vue';
    export default {
      props: ['game'],
      components: {
        tabCommon,tabComments,tabCoAuthors,tabSaves,tabSettings
      },
      data: () => ({
        activeTab: 'common'
      }),
      methods: {
        setTab(){
          let activeTab = this.$route.query.tab;
          if (activeTab && (['common','comments','saves'].indexOf(activeTab)+1))
            this.activeTab = activeTab;

          this.$router.replace({query: {}})
        }
      },
      mounted(){
        this.setTab();
      },
      computed: {
        authUser(){
          return this.$store.getters.getUser;
        },
        isCoauthor(){
          let coAuthors = this.game.extra.coAuthors;
          let userHash = this.authUser.hash;

          for (let i=0; i < coAuthors.length; i++){
            let author = coAuthors[i];
            if (author.hash === userHash)
              return true;
          }

          return false;
        }
      },
      watch:{
        "$route"(){
          this.setTab();
        }
      }
    }
</script>
