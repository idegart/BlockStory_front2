<template>
  <div>
    <el-alert
      v-if="!game.extra.coAuthors.length"
      title="Соавторов нет"
      type="info">
    </el-alert>
    <el-row :gutter="10"
            type="flex"
            style="flex-wrap: wrap"
            justify="space-around">
      <el-col v-for="(user, index) in game.extra.coAuthors"
              :key="index"
              :xs="24" :sm="12" :md="8" :lg="6" :xl="4">

        <user-card :user="user"></user-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import userCard from '../../profile/Card.vue';
    export default {
      props: ['game'],
      components: {
        userCard
      }
    }
</script>
