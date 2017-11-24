<template>
  <div id="vk_community_messages"></div>
</template>

<script>
    export default {
      mounted(){
        VK.Widgets.CommunityMessages("vk_community_messages", 155066933);
      },
      beforeDestroy(){
        VK.Widgets.CommunityMessages.destroy();
      }
    }
</script>
