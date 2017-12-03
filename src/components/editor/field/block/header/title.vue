<template>
  <div style="width: 100%">
    <div @click="startEdit" v-if="!editText">
      {{ block.title }}
    </div>

    <el-input
      v-show="editText"
      ref="editTextArea"
      size="mini"
      :placeholder="$t('inputTitle')"
      @keyup.enter.native="updateTitle"
      style="width: 100%"
      v-model="block.title">
      <el-button @click="updateTitle"
                 slot="append" icon="el-icon-success"
                 size="mini"></el-button>
    </el-input>

  </div>
</template>

<script>
    export default {
      props: ['block'],
      data: () => ({
        editText: false
      }),
      methods: {
        updateTitle(){
          this.editText = false;

          let data = {
            block_hash: this.block.hash,
            title: this.block.title
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            })
        },
        startEdit(e){
          this.editText = true;
        }
      }
    }
</script>
