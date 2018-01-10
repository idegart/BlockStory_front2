<template>
  <div class="toolbar-item">
    <span>{{ $t('currentChapter')}}</span>

    <el-tooltip class="item" effect="dark" placement="top">

      <div slot="content">
        {{ $t('currentChapter')}}
        <br/>
        {{ $t('currentChapterDescription')}}


      </div>

      <el-select v-model="chapter"
                 :placeholder="$t('selectChapter')">
        <el-option
          v-for="(chapter, index) in chapters"
          :key="index"
          :label="chapter.title"
          :value="chapter.hash">
        </el-option>
      </el-select>

    </el-tooltip>

    <el-button @click="addChapter" type="text">+{{$t('addChapter')}}</el-button>

    <el-button type="danger"
               :disabled="chapters.length<2"
               @click="deleteChapter"
               size="mini">{{$t('delChapter')}}
    </el-button>

  </div>
</template>

<script>
    export default {
      methods: {
        deleteChapter(){
          let data = {
            hash: this.$store.getters.getEditor.gameHash,
            del_chapter: this.$store.getters.getEditor.chapterHash
          };
          this.$http.post('game.update', data)
            .then(res => {
              let chapterHash = this.$store.getters.getEditor.chapterHash;
              for (let i=0; i < this.chapters.length; i++){
                if (this.chapters[i].hash !== chapterHash){
                  this.$router.push({
                    name: 'Editor',
                    params: {
                      game: this.$store.getters.getEditor.gameHash,
                      chapter: this.chapters[i].hash
                    }
                  });
                  return;
                }
              }
            });
        },
        addChapter(){
          this.$prompt(this.$t('enterTitleChapter'), this.$t('addChapter'), {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputValidator: this.validateTitle,
          }).then( e => {

            let data = {
              hash: this.$store.getters.getEditor.gameHash,
              new_chapter: e.value
            };

            this.$http.post('game.update', data)
              .then(res => {
                console.log(res);
                this.$store.commit('addChapter', res.body.chapter);
                this.$router.push({
                  name: 'Editor',
                  params: {
                    game: this.$store.getters.getEditor.gameHash,
                    chapter: res.body.chapter.hash
                  }
                })
              });
          }).catch(() => {});
        },
        validateTitle(title){
          let re = /^([A-zА-я0-9Ёё\s]{4,32})$/i;

          if (!re.test(title))
            return this.$t('error_addChapterLength');

          for (let i=0;i<this.chapters.length;i++){
            if (this.chapters[i].title === title)
              return this.$t('error_addChapterDuplicate');
          }

          return true;
        }
      },
      computed: {
        chapters(){
          return this.$store.getters.getChapters;
        },
        chapter:{
          get: function () {
            return this.$store.getters.getEditor.chapterHash;
          },
          set: function (chapter) {
            this.$router.push({
              name: 'Editor',
              params: {
                game: this.$store.getters.getEditor.gameHash,
                chapter
              }
            })
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
