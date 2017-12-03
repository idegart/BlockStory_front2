<template>
  <div>
    <el-tag v-if="genre">{{ getGenre(genre) }}</el-tag>
  </div>
</template>

<script>
  import genres from '../../data/genres';
    export default {
      props: ['genre'],
      data: () => ({
        genres
      }),
      methods: {
        getGenre(genre){
          for (let i=0; i < this.genres.length; i++){

            if (this.genres[i].value === genre)
              return this.genres[i].label

          }
        }
      }
    }
</script>
