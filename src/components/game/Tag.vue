<template>
  <div v-if="user.hash==game.user.hash || user.type=='admin' || user.type=='moderator'">
    <el-tag v-if="game.status=='new'" type="info">Новая</el-tag>
    <el-tag v-if="game.status=='sandbox'" type="warning">Песочница</el-tag>
    <el-tag v-if="game.status=='published'" type="success">Опубликовано</el-tag>
    <el-tag v-if="game.status=='banned'" type="danger">Заблокировано</el-tag>
  </div>
</template>

<script>
  export default {
    props: ['game'],
    computed:{
      user(){
        return this.$store.getters.getUser;
      }
    }
  }
</script>
