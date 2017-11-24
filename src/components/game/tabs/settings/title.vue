<template>
  <el-form-item label="Название">
    <el-input v-model="game.title">
      <el-button slot="append"
                 @click="changeTitle"
                 :disabled="false"
                 icon="el-icon-edit"></el-button>
    </el-input>
  </el-form-item>
</template>

<script>
    export default {
      props: ['game'],
      methods: {
        changeTitle(){
          let data = {
            hash: this.game.hash,
            title: this.game.title
          };

          this.$http.post('game.update', data)
            .then(res => {
              console.log(res);
            })
        }
      }
    }
</script>
