<template>
  <el-form label-width="120px">

    <game-editor :game="game"></game-editor>
    <game-alias :game="game"></game-alias>
    <game-title :game="game"></game-title>
    <game-description :game="game"></game-description>
    <game-tags :game="game"></game-tags>
    <game-cover :game="game"></game-cover>
    <game-background :game="game"></game-background>
    <game-back-color :game="game"></game-back-color>

    <game-allows :game="game"></game-allows>
    <game-delete :game="game"></game-delete>

  </el-form>
</template>

<script>
  import gameEditor from './settings/editor.vue';
  import gameAlias from './settings/alias.vue';
  import gameTitle from './settings/title.vue';
  import gameDescription from './settings/description.vue';
  import gameCover from './settings/cover.vue';
  import gameBackground from './settings/background.vue';
  import gameBackColor from './settings/backColor.vue';
  import gameAllows from './settings/allows.vue';
  import gameTags from './settings/tags.vue';
  import gameDelete from './settings/delete.vue';
    export default {
      props: ['game'],
      components: {
        gameEditor,gameAlias,gameTitle,gameAllows,gameCover,gameBackground,gameBackColor,gameDescription,
        gameTags,gameDelete
      }
    }
</script>
