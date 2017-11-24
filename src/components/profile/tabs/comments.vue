<template>
  <div>
    <vk-comments></vk-comments>
  </div>
</template>

<script>
  import vkComments from '../../../modules/VK-Widgets/vk-comments.vue';
  export default {
    props: ['user'],
    components: {
      vkComments
    }
  }
</script>
