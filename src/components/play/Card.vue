<template>
  <el-card class="play-card"
           :style="renderStyle"
  >

    <div slot="header" class="play-card__title">

      <router-link :to="{name: 'Game', params:{alias: game.alias}}"class="play-card__title-link">
        {{game.title}}
      </router-link>

      <audio-player :game="game" :block="block"></audio-player>

      <el-button @click="$emit('goStart')" style="float: right; margin: 0 15px" type="text">Начать сначала</el-button>

    </div>

    <text-block-select v-if="block.type=='text_block_select'"
                       :data = block.data
                       @goNext="goNext"
    ></text-block-select>

  </el-card>
</template>

<script>
  import audioPlayer from './player/audio.vue';
  import textBlockSelect from './types/textBlockSelect.vue';
    export default {
      props: ['game','block'],
      components: {
        audioPlayer,textBlockSelect
      },
      methods: {
        goNext(e){
          this.$emit('goNext',e);
        }
      },
      computed: {
        renderStyle(){
          let data = {};

          let blockCard = this.block && this.block.data.images && this.block.data.images.cards
            && this.block.data.images.cards[0] && this.block.data.images.cards[0].url || null;

          if (blockCard){
            data.backgroundImage = 'url(' + blockCard + ')';
          } else {
            if (this.game.extra.background.card){
              data.backgroundImage = 'url(' + this.game.extra.background.card + ')';
            }
          }

          return data;
        }
      }
    }
</script>

<style scoped>
  .play-card{
    /*background: no-repeat;*/
    background-size: 100% 100%;
  }
  .play-card__title-link{
    font-size: 25px;
    text-decoration: none;
  }
</style>
