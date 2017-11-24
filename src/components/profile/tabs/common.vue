<template>
  <div>
    <el-alert
      v-if="!user.extra.description"
      show-icon
      :title="$t('alert_user_noDescription')"
      type="info">
    </el-alert>

    <div v-if="user.extra.description">
      <text-display :text="user.extra.description"></text-display>
    </div>
  </div>
</template>

<script>
  import textDisplay from '../../common/textDisplay.vue';
    export default {
      props: ['user'],
      components: {
        textDisplay
      }
    }
</script>
