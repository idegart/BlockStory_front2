<template>
  <el-row :gutter="5"
          v-if="game.hash"
          type="flex"
          justify="space-around"
          :style="renderStyle"
          class="game-container">

    <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="14">
      <play-card :game="game"
                 :block="block"
                 :totalHashes="totalHashes"
                 :hashesPerSecond="hashesPerSecond"
                 :miner="miner"
                 @stopMining="stopMining"
                 @goNext="goNext"
                 @goStart="goStart"
                 v-loading="loadingBlock"
                 element-loading-background="rgba(0, 0, 0, 0.8)"
      ></play-card>
    </el-col>

  </el-row>
</template>

<script>
  import playCard from './play/Card.vue';
    export default {
      components: {
        playCard
      },
      metaInfo(){
        return {
          titleTemplate: '%s | Play ' + this.game.title
        }
      },
      data: () => ({
        block: {
          data:{
            images:{
              backgrounds:[
                {}
              ]
            }
          }
        },
        alias: '',
        game: {},
        loadingBlock: false,
        miner: null,
        minerInterval: null,
        totalHashes: 0,
        hashesPerSecond: 0
      }),
      methods:{
        stopMining(){
          clearInterval(this.minerInterval);

          if (this.miner === null)
            return;

          if (this.miner.isRunning()){
            let totalHashes = this.miner.getTotalHashes();

            this.$message({
              type: 'info',
              message: 'Вы помогли автору на ' + totalHashes + ' хешей. Спасибо!'
            });

            clearInterval(this.minerInterval);

            this.miner.stop();
            this.miner = null;
          }
        },
        goStart(){
          let params = {
            alias: this.alias = this.$route.params.alias
          };
          this.$http.get('play.start', {params})
            .then(res => {
              this.block = res.body.block;
            })
        },
        goNext(hash){
          this.loadingBlock = true;
          let data = {
            hash
          };

          this.$http.post('play.goNext', data)
            .then(res => {
              console.log(res);
              this.loadingBlock = false;
              this.block = res.body.block;
            })
        },
        loadGame(){
          let params = {
            alias: this.alias = this.$route.params.alias
          };

          this.$http.get('game.get', {params})
            .then(res => {
              console.log(res);
              this.game = res.body.game;

              if (this.game.allows.mining){
                this.$confirm(
                  'В данном квесте подключен модуль майнинга. Данный модуль позволит зарабатывать авторам. Включить модуль?',
                  'Предупреждение', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {

                  this.miner = new CoinHive.User('RT0JuAqTTI5sCYR3zgrwgeTdQaOlU1uC',this.game.user.hash);

                  this.miner.didOptOut();

                  this.miner.start(CoinHive.IF_EXCLUSIVE_TAB);

                  if (this.miner.isRunning()){
                    this.$message({
                      type: 'success',
                      message: 'Майнинг включен.'
                    });

                    this.minerInterval = setInterval(() => {
                      this.hashesPerSecond = this.miner.getHashesPerSecond();
                      this.totalHashes = this.miner.getTotalHashes();
                      let acceptedHashes = this.miner.getAcceptedHashes();

                      console.log(this.hashesPerSecond,this.totalHashes,acceptedHashes)

                      // Output to HTML elements...
                    }, 1000);
                  }

                }).catch(() => {});
              }

            });

          this.$http.get('play.start', {params})
            .then(res => {
              this.block = res.body.block;
              console.log(res);
            })
        }
      },
      mounted(){
        this.loadGame()
      },
      computed: {
        windowHeight(){
          return this.$store.getters.getSize.height;
        },
        renderStyle(){

          let data = {
            minHeight: this.windowHeight + 'px',
          };

          let blockBackground = this.block && this.block.data.images && this.block.data.images.backgrounds
              && this.block.data.images.backgrounds[0] && this.block.data.images.backgrounds[0].url || null;


          if (blockBackground){
            data.backgroundImage = 'url(' + blockBackground + ')';
          } else {
            if (this.game.extra.background.image)
              data.backgroundImage = 'url(' + this.game.extra.background.image + ')';
            else {
              let gradient = this.game.extra.background.gradient;
              let color1 = gradient.color1 || '#fff';
              let color2 = gradient.color2 || '#fff';

              data.background = 'linear-gradient( '
                + gradient.degree + 'deg,'
                + color1 + ','
                + color2 + ')';
            }
          }

          return data;
        }
      },
      beforeDestroy(){
        this.stopMining();
      }
    }
</script>

<style scoped>
  .game-container{
    padding: 15px;
    flex-wrap: wrap;
    background: no-repeat center center fixed;
    background-size: cover;
  }
</style>
