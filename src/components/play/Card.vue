<template>
  <el-card class="play-card"
           :style="renderStyle">

    <div slot="header" class="play-card__title" v-if="game">

      <el-row type="flex" justify="space-between" style="flex-wrap: wrap">
        <el-col :xs="24" :sm="10" :md="10" :lg="12">
          <router-link :to="{name: 'Game', params:{alias: game.alias}}"class="play-card__title-link">
            {{game.title}}
          </router-link>
        </el-col>
        <el-col :xs="24" :sm="14" :md="14" :lg="12" style="margin-top: 5px">

            <el-button v-if="miner" @click="$emit('stopMining')" size="mini" type="warning">Stop mining ({{totalHashes}})</el-button>

            <el-button @click="$router.push({name: 'Game', params:{alias: game.alias}})" size="mini">Выйти</el-button>

            <el-button @click="$emit('goStart')" style="margin: 0 15px" size="mini">Начать сначала</el-button>

            <audio-player :game="game" :block="block"></audio-player>

        </el-col>
      </el-row>

    </div>

    <div v-else slot="header" class="play-card__title">
      <el-button @click="$emit('goStart')" style="margin: 0 15px" size="mini">Начать сначала</el-button>
    </div>

    <text-block-select v-if="block.type=='text_block_select'"
                       :data="game?block.data:block.extra"
                       @goNext="goNext"
    ></text-block-select>

  </el-card>
</template>

<script>
  import audioPlayer from './player/audio.vue';
  import textBlockSelect from './types/textBlockSelect.vue';
    export default {
      props: ['game','block','hashesPerSecond','totalHashes','miner'],
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

          if (this.game===undefined)
            return;

          let blockCard = this.block && this.block.data.images && this.block.data.images.cards
            && this.block.data.images.cards[0] && this.block.data.images.cards[0].url || null;

          if (blockCard){
            data.backgroundImage = 'url(' + blockCard + ')';
          } else {
            if (this.game&&this.game.extra.background.card){
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
