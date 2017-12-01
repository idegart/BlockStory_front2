<template>
  <el-form-item label="Публикация">
    <el-button @click="setStatus('sandbox')" v-if="game.status==='new'" type="success" round>Опубликовать</el-button>
    <el-button @click="setStatus('new')" v-if="game.status==='sandbox'||game.status==='published'" type="warning" round>Скрыть</el-button>

    <el-alert
      v-if="game.status==='banned'"
      title="Игра заблокированна, обратитесь в тех.поддержку"
      :closable="false"
      type="error">
    </el-alert>

  </el-form-item>
</template>

<script>
    export default {
      props: ['game'],
      methods: {
        setStatus(status){
          let data = {
            hash: this.game.hash,
            status
          };

          this.$http.post('game.update', data)
            .then(res => {
              console.log(res);
              this.game.status = status;
            })
        }
      }
    }
</script>
