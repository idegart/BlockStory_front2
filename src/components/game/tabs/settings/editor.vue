<template>
  <el-form-item label="Редактор">
    <el-button @click="openEditor" type="info" plain>Открыть редактор</el-button>
  </el-form-item>
</template>

<script>
    export default {
      props:['game'],
      methods: {
        openEditor(){
          let params = {
            hash: this.game.hash
          };

          this.$http.get('editor.get', {params})
            .then(res => {

              let error = res.body.error.status;

              if (error !== 1){

              }

              let data = res.body.data;
              this.$router.push({name: 'Editor', params: {game: data.game, chapter: data.chapter}});

              console.log(res);
            })
        }
      }
    }
</script>
