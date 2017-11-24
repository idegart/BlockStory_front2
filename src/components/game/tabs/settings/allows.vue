<template>
  <div>
    <el-form-item label="Доступ по ссылке">
      <el-switch @change="updateSettings('link')" v-model="game.allows.link"></el-switch>
    </el-form-item>

    <el-form-item label="Комментарии">
      <el-switch @change="updateSettings('comments')" v-model="game.allows.comments"></el-switch>
    </el-form-item>

    <el-form-item label="Сохранения">
      <el-switch @change="updateSettings('saves')" v-model="game.allows.saves"></el-switch>
    </el-form-item>

    <el-form-item label="Статистика">
      <el-tooltip class="item" effect="dark" content="Статистика будет доступна всем пользователям" placement="right">
        <el-switch @change="updateSettings('statistics')" v-model="game.allows.statistics"></el-switch>
      </el-tooltip>
    </el-form-item>

    <el-form-item label="Майнинг">
        <el-switch @change="updateSettings('mining')" v-model="game.allows.mining"></el-switch>
    </el-form-item>
  </div>

</template>

<script>
  export default {
    props: ['game'],
    methods: {
      updateSettings(allow){
        let data = {
          hash: this.game.hash,
          allow
        };

        this.$http.post('game.update', data)
          .then(res => {
            console.log(res);
          })
      }
    }
  }
</script>
