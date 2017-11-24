<template>
  <el-form-item label="Алиас">

    <el-popover
      ref="shureChangeAlias"
      placement="top"
      width="160"
      v-model="popoverVisible">
      <p>При смене алиаса произойдет сброс лайков и комментариев ВК. Вы уверены, что хотите продолжить?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="popoverVisible = false">Отменить</el-button>
        <el-button type="primary" size="mini" @click="changeAlias">Да</el-button>
      </div>
    </el-popover>

    <el-tooltip class="item" effect="dark" placement="top-start">
      <div slot="content">
        Алиас - это то, что видно в строке запроса браузера
        <br/>
        Например, www.BlockStory.ru/game/xxxxxx , где 'xxxxxx' - алиас квеста
      </div>
      <el-input v-model="game.alias">
        <el-button slot="append"
                   v-popover:shureChangeAlias
                   :disabled="checkAlias"
                   icon="el-icon-edit"></el-button>
      </el-input>
    </el-tooltip>
    <div v-if="checkAlias"
         class="el-form-item__error">
      Алиас должен содержать только латиницу длинной от 4 до 16 знаков
    </div>
  </el-form-item>

</template>

<script>
  export default {
    props: ['game'],
    data: () => ({
      popoverVisible: false,
      error: false
    }),
    methods: {
      changeAlias(){
        this.popoverVisible = false;
        let data = {
          hash: this.game.hash,
          alias: this.game.alias
        };

        this.$http.post('game.update', data)
          .then(res => {
            this.$router.push({name: 'Game', params: {alias: this.game.alias}})
          })
      }
    },
    computed:{
      checkAlias(){
        let alias = this.game.alias;

        let re = /^([A-z0-9]{4,16})$/i;
        return !re.test(alias)
      }
    }
  }
</script>
