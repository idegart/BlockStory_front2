<template>
  <el-form-item label="Тэги">
    <el-select
      v-model="value"
      :remote-method="searchTag"
      disabled
      remote
      :loading="loading"
      multiple
      filterable
      allow-create
      :multiple-limit="5"
      clearable
      style="width: 100%"
      placeholder="Choose tags for your game">
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
    export default {
      data: () => ({
        options: [],
        value: null,
        loading: false
      }),
      methods: {
        searchTag(e){
          this.loading = true;
          console.log(e);
        }
      }
    }
</script>
