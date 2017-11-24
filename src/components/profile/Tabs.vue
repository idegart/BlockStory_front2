<template>
  <el-tabs v-model="activeTab" type="border-card">
    <el-tab-pane v-if="user.extra.donate.allow" class="tab-test" label="Донат" name="donate">
      <tab-donate :user="user"></tab-donate>
    </el-tab-pane>
    <el-tab-pane :label="$t('common')" name="common">
      <tab-common :user="user"></tab-common>
    </el-tab-pane>
    <el-tab-pane :label="$t('comments')" name="comments">
      <tab-comments :user="user"></tab-comments>
    </el-tab-pane>
    <el-tab-pane :label="$t('games')" name="games">
      <tab-games :user="user"></tab-games>
    </el-tab-pane>
    <el-tab-pane :label="$t('settings')" name="settings" v-if="user.hash==systemUser.hash">
      <tab-settings :user="user"></tab-settings>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import tabDonate from './tabs/donate.vue';
  import tabCommon from './tabs/common.vue';
  import tabComments from './tabs/comments.vue';
  import tabGames from './tabs/games.vue';
  import tabSettings from './tabs/settings.vue';
    export default {
      props: ['user'],
      components: {
        tabDonate,tabCommon,tabComments,tabGames,tabSettings
      },
      data: () => ({
        activeTab: 'common'
      }),
      computed: {
        systemUser(){
          return this.$store.getters.getUser;
        }
      }
    }
</script>
