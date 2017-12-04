<template>
  <div>
    <el-row :gutter="10"
            type="flex"
            style="flex-wrap: wrap;padding-top: 15px"
            justify="space-around">
      <el-col :xs="22" :sm="20" :md="18" :lg="16" :xl="14">

        <el-alert
          v-if="!games.length"
          title="Хатико ждал и ты подождёшь"
          type="info">
        </el-alert>

        <el-row :gutter="10"
                type="flex"
                style="flex-wrap: wrap"
                justify="space-around">
          <el-col v-for="(game, index) in games"
                  :key="index"
                  :xs="24" :sm="12" :md="8" :lg="6" :xl="4">

            <game-card :game="game"></game-card>

          </el-col>
        </el-row>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import gameCard from './game/Card.vue';
    export default {
      components: {
        gameCard
      },
      metaInfo: {
        titleTemplate: '%s | Games'
      },
      data: () => ({
        games: []
      }),
      mounted(){
        let params = {
          type: 'published'
        };

        this.$http.get('game.getCollection', {params})
          .then(res => {
            this.games = res.body.games;
            console.log(res);
          })
      }
    }
</script>
