<template>
  <div style="text-align: center;padding: 15px">
    <el-tooltip class="item" effect="light" placement="top">
      <div slot="content">
        Укажите параметр, в который будет записан пользовательский ввод.
      </div>
      <el-select v-model="block.extra.param.hash"
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

    <br/>
    <br/>

    <el-tooltip v-if="block.extra.param.hash" class="item" effect="light" placement="top">
      <div slot="content">
        Укажите новое значение для переменной
      </div>
      <el-input placeholder="Введите новое значение" v-model="block.extra.param.value" size="mini"></el-input>
    </el-tooltip>

  </div>
</template>

<script>
    export default {
      props: ['block'],
      methods: {
        setParam(){
          console.log(this.block.extra.param.hash)
        }
      },
      computed: {
        params(){
          return this.$store.getters.getParams;
        }
      }
    }
</script>
