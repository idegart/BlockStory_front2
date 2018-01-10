<template>
  <div style="text-align: center;padding: 15px">

    <el-button size="mini" @click="openTextEditor">Текст</el-button>

    <br/>
    <br/>

    <el-tooltip class="item" effect="light" placement="right">
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

    <el-tooltip class="item" effect="light" placement="right">
      <div slot="content">
        Укажите параметр, в который будет записан пользовательский ввод. <br/>
      </div>
      <el-select v-model="block.extra.answer.param"
                 @change="setParam"
                 size="mini"
                 clearable
                 placeholder="Select param">
        <el-option
          v-for="(param, index) in params"
          :key="index"
          :label="param.title"
          :value="param.hash">
        </el-option>
      </el-select>
    </el-tooltip>

    <div style="margin: 15px"></div>

    <add-extra :block="block"></add-extra>

  </div>
</template>

<script>
  import addExtra from './addText/addExtra.vue';
  export default {
    props: ['block'],
    components: {
      addExtra
    },
    methods: {
      setParam(){
        let data = {
          block_hash: this.block.hash,
          param_hash: this.block.extra.answer.param
        };

        this.$http.post('block.update', data)
          .then(res => {
            console.log(res);
          });
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
      }
    },
    computed: {
      params(){
        return this.$store.getters.getParams;
      }
    }
  }
</script>
