<template>
  <el-form-item label="Градиент">

    <el-tooltip class="item" effect="dark" content="Right Center prompts info" placement="right">
      <el-color-picker @change="updateBackColor" v-model="game.extra.background.gradient.color1"></el-color-picker>
    </el-tooltip>

    <br/>

    <el-tooltip class="item" effect="dark" content="Right Center prompts info" placement="right">
      <el-color-picker @change="updateBackColor" v-model="game.extra.background.gradient.color2"></el-color-picker>
    </el-tooltip>

    <br/>

    <el-input-number @change="updateBackColor" v-model="game.extra.background.gradient.degree" :min="0" :max="255" :step="5"></el-input-number>

  </el-form-item>
</template>

<script>
    export default {
      props: ['game'],
      methods: {
        updateBackColor(e,n){
          let data = {
            hash: this.game.hash,
            color_back1: this.game.extra.background.gradient.color1,
            color_back2: this.game.extra.background.gradient.color2,
            degree: n ? e : this.game.extra.background.gradient.degree
          };

          this.$http.post('game.update', data)
            .then(res => {
              console.log(res);
            });
        }
      }
    }
</script>
