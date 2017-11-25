<template>
  <div>
    <el-table
      :data="params"
      style="width: 100%;max-width: 700px;margin: auto">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="title"
        label="Название">
      </el-table-column>
      <el-table-column
        property="type"
        label="Тип"
        width="120">
      </el-table-column>
      <el-table-column
        property="default"
        label="По умолчанию">
      </el-table-column>
      <el-table-column
        label="Действия">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>

    <add-param></add-param>
  </div>
</template>

<script>
  import addParam from './addParam.vue';
    export default {
      components: {
        addParam
      },
      methods: {
        handleDelete(index, scope){
          console.log(index, scope);
        }
      },
      computed: {
        params(){
          return this.$store.getters.getParams;
        }
      }
    }
</script>
