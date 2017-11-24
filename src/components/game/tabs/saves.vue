<template>
  <div>

    <el-alert
      v-if="!authUser.hash"
      title="Данный раздел доступен только авторизированным пользователям"
      type="info">
    </el-alert>

    <el-alert
      v-if="!game.allows.saves&&authUser.hash"
      title="Сохранения отключены"
      type="info">
    </el-alert>

    <el-table
      v-if="authUser.hash&&game.allows.saves"
      :data="saves"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Дата">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Название">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Запустить">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
    export default {
      props:['game'],
      data: () => ({
        saves: []
      }),
      computed:{
        authUser(){
          return this.$store.getters.getUser;
        }
      }
    }
</script>
