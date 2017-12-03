<template>
  <div class="toolbar-item">

    <span>{{ $t('starterChapter')}}</span>

    <el-tooltip class="item" effect="dark" placement="top">

      <div slot="content">
        {{ $t('starterChapter')}}
        <br/>
        {{ $t('starterChapterDescription')}}

      </div>

      <el-select v-model="chapterStarter"
                 clearable
                 :placeholder="$t('selectChapter')">
        <el-option
          v-for="(chapter, index) in chapters"
          :key="index"
          :label="chapter.title"
          :value="chapter.hash">
        </el-option>
      </el-select>

    </el-tooltip>

  </div>
</template>

<script>
    export default {
      data: () => ({
        value: null
      }),
      computed: {
        chapters(){
          return this.$store.getters.getChapters;
        },
        chapterStarter:{
          get: function () {
            return this.$store.getters.getChapterStarter;
          },
          set: function (element) {
            let data = {
              hash: this.$store.getters.getEditor.gameHash,
              chapter_starter: element
            };

            this.$http.post('game.update',data)
              .then(res => {
                console.log(res);
                this.$store.commit('setChapterStarter', element);
              });
          }
        }
      }
    }
</script>

<style scoped>
  .toolbar-item{
    margin: 10px;
    padding: 10px;
    border-top: 1px solid black;
    text-align: center;
  }
</style>
