<template>
  <el-dialog
    :fullscreen="fullscreen"
    :title="titleText"
    :visible="visible"
    :width="width"
    :before-close="handleClose">

    <div v-if="params&&params.fields">
      <el-input v-if="'title' in params.fields" v-model="data.title" placeholder="Заголовок" style="margin-bottom: 20px;">
        <el-button @click="handleSave" slot="append" icon="el-icon-success">Сохранить</el-button>
      </el-input>

      <el-button v-if="!('title' in params.fields)" @click="handleSave" type="success" style="margin-bottom: 20px;" plain>Сохранить</el-button>

      <el-input
        v-if="'uncut' in params.fields"
        type="textarea"
        style="margin-bottom: 20px;"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="Please input"
        v-model="data.uncut">
      </el-input>

      <quill-editor v-if="'text' in params.fields" v-model="data.text"></quill-editor>
    </div>

  </el-dialog>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'
    export default {
      props: ['params', 'titleText', 'visible', 'width', 'fullscreen'],
      components: {
        quillEditor
      },
      data: () => ({
        data: {
          text: '',
          uncut: '',
          title: ''
        }
      }),
      methods: {
        handleClose(){
          this.$emit('close', {data: this.data})
        },
        handleSave(){
          this.$emit('save', {data: this.data})
        },
        refactorParams(){
          this.data.text = this.params.fields.text;
          this.data.uncut = this.params.fields.uncut;
          this.data.title = this.params.fields.title;
        }
      },
      watch: {
        visible(e){
          if (e)
            this.refactorParams()
        }
      }
    }
</script>
