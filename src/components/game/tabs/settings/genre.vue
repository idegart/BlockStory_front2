<template>
  <el-form-item label="Жанр">
    <el-select v-model="game.genre"
               @change="setGenre"
               clearable
               filterable
               placeholder="Выбрать жанр">
      <el-option
        v-for="genre in genres"
        :key="genre.value"
        :label="genre.label"
        :value="genre.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  import genres from '../../../../data/genres.js';

    export default {
      props: ['game'],
      data: () => ({
        genres
      }),
      methods: {
        setGenre(genre){
          let data = {
            hash: this.game.hash,
            genre
          };

          this.$http.post('game.update', data)
            .then(res => {
              console.log(res);
              this.game.genre = genre;
            });
        }
      }
    }
</script>
