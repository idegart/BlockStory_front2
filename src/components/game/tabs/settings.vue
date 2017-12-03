<template>
  <el-form label-width="120px">

    <game-editor :game="game"></game-editor>
    <game-publish :game="game"></game-publish>
    <game-alias :game="game"></game-alias>
    <game-title :game="game"></game-title>
    <game-description :game="game"></game-description>
    <game-genre :game="game"></game-genre>
    <game-tags :game="game"></game-tags>
    <game-cover :game="game"></game-cover>
    <game-background :game="game"></game-background>
    <game-image-card :game="game"></game-image-card>
    <game-back-color :game="game"></game-back-color>
    <game-audios :game="game"></game-audios>

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
  import gamePublish from './settings/publish.vue';
  import gameImageCard from './settings/imageCard.vue';
  import gameAudios from './settings/audios.vue';
  import gameGenre from './settings/genre.vue';
    export default {
      props: ['game'],
      components: {
        gameEditor,gameAlias,gameTitle,gameAllows,gameCover,gameBackground,gameBackColor,gameDescription,
        gameTags,gameDelete,gamePublish,gameImageCard,gameAudios,gameGenre
      }
    }
</script>
