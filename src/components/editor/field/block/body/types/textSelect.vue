<template>
  <div style="text-align: center;padding: 15px">

    <el-button size="mini" @click="openTextEditor">Текст</el-button>

    <br/>
    <br/>

    <el-tooltip class="item" effect="light" placement="top">
      <div slot="content">
        Укажите число секунд для таймера. <br/>
        Значения от 0 до 240. <br/>
        При значение 0 - таймер отключен.
      </div>

      <el-input-number v-model="block.extra.timer.timeout"
                       :min="0" :max="240"
                       :debounce="500"
                       :controls="false"
                       @change="setTime"
                       size="mini">
      </el-input-number>
    </el-tooltip>

    <br/>
    <br/>

    <div v-for="(answer, index) in block.extra.answers">

      <el-input v-model="answer.text"
                :ref="'inputAnswer_' + index"
                @change="changeAnswer(answer,index)"
                :max="20"
                :placeholder="'Answer #' + (index+1)"
                size="mini">

        <i class="el-icon-edit el-input__icon" slot="suffix">{{index + 1}}</i>

      </el-input>

      <div style="margin: 7px 0;"></div>

    </div>

  </div>
</template>

<script>
  import limitWords from '../../../../../../functions/limitWords';
    export default {
      props: ['block'],
      methods: {
        changeAnswer(answer, index){
          this.$refs['inputAnswer_' + index][0].$el.children[0].blur()

          let data = {
            block_hash: this.block.hash,
            answer: answer.text,
            answer_text_num: index
          };

          this.$http.post('block.update', data)
            .then(res => {
              this.block.params.out[index].title = answer.text ? limitWords(answer.text, 12) :'Answer #' + (index + 1);
              console.log(res);
            })


        },
        setTime(e){
          let data = {
            block_hash: this.block.hash,
            timer_timeout: e
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });
        },
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
