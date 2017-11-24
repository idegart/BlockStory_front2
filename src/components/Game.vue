<template>
  <el-row :gutter="5"
          v-if="game.hash"
          type="flex"
          justify="space-around"
          :style="renderStyle"
          class="game-container">
    <el-col :xs="23" :sm="8" :md="6" :lg="5" :xl="4" style="margin-bottom: 15px">
      <game-card :game="game"></game-card>
    </el-col>

    <el-col :xs="23" :sm="14" :md="16" :lg="15" :xl="14">
      <game-tabs :game="game"></game-tabs>
    </el-col>

  </el-row>
</template>

<script>
  import gameCard from './game/Card.vue';
  import gameTabs from './game/Tabs.vue';
    export default {
      components: {
        gameCard, gameTabs
      },
      data: () => ({
        game: {}
      }),
      methods: {
        loadGame(){
          this.$store.commit('setLoading', true);
          let alias = this.$route.params.alias;
          let params = {
            alias
          };

          this.$http.get('game.get', {params})
            .then(res => {
              this.$store.commit('setLoading', false);
              console.log(res);
              let error = res.body.error.status;
              if (error !== 1){
                this.$router.push({name: 'Error', params: {status: 404}});
                return;
              }
              this.game = res.body.game;
            })
        }
      },
      computed: {
        windowHeight(){
          return this.$store.getters.getSize.height - 60 - 60;
        },
        renderStyle(){

          let data = {
            minHeight: this.windowHeight + 'px',
          };

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


          return data;
        }
      },
      mounted(){
        this.loadGame()
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
