<template>
  <el-row type="flex" justify="center">
    <el-col :xs="20" :sm="12" :lg="10" :xl="7" style="margin-top: 15px">

        <el-tabs type="border-card">
          <el-tab-pane label="VK">
            <enter-vk></enter-vk>
          </el-tab-pane>
          <el-tab-pane label="Email">
            <enter-email></enter-email>
          </el-tab-pane>
        </el-tabs>

    </el-col>
  </el-row>
</template>


<script>
  import enterEmail from './enter/email.vue';
  import enterVk from './enter/vk.vue';
  export default {
    components: {
      enterEmail, enterVk
    },
    metaInfo: {
      titleTemplate: '%s | Enter'
    },
  }
</script>
