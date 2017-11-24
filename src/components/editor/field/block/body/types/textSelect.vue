<template>
  <div style="text-align: center;padding: 15px">

    <el-button size="mini" @click="openTextEditor">Текст</el-button>

    <br/>
    <br/>

    <el-input-number v-model="block.extra.timer.timout"
                     :min="0" :max="240"
                     size="mini">
    </el-input-number>

  </div>
</template>

<script>
    export default {
      props: ['block'],
      methods: {
        openTextEditor(){
          this.$store.commit('setEditorTextEditor',{
            visible: true,
            title: 'Редактировать блок',
            params: {
              fields: {
                text: this.block.extra.text
              }
            },
            block: this.block
          })
        },
      }
    }
</script>
