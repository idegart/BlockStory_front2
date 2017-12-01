<template>
  <div style="text-align: center;padding: 15px">
    <el-tooltip class="item" effect="light" placement="top">
      <div slot="content">
        Укажите параметр, в который будет записан пользовательский ввод.
      </div>
      <el-select v-model="block.extra.next_chapter"
                 @change="setParam"
                 size="mini"
                 clearable
                 placeholder="Select chapter">
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
      props: ['block'],
      methods: {
        setParam(next_chapter){
          let data = {
            block_hash: this.block.hash,
            next_chapter
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });
        }
      },
      computed: {
        chapters(){
          return this.$store.getters.getChapters;
        }
      }
    }
</script>
