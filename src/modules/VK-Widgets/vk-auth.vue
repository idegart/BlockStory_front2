<template>
  <div id="vk_auth"></div>
</template>

<script>
    export default {
      mounted(){
        let self = this;
        VK.Widgets.Auth("vk_auth", {
          onAuth: (options) => {
            self.$emit('onEnter', options);
          }
        });
      }
    }
</script>
