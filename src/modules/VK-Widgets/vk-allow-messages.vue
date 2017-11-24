<template>
  <div id="vk_allow_messages_from_community"></div>
</template>

<script>
    export default {
      mounted(){
        let self = this;
        VK.Widgets.AllowMessagesFromCommunity("vk_allow_messages_from_community", {}, 155066933);

        VK.Observer.subscribe("widgets.allowMessagesFromCommunity.allowed", function f(userId) {
          self.$emit('allowMessage');
        });

        VK.Observer.subscribe("widgets.allowMessagesFromCommunity.denied", function f(userId) {
          self.$emit('denyMessage');
        });
      },
      beforeDestroy(){
        VK.Observer.unsubscribe("widgets.allowMessagesFromCommunity.allowed");
        VK.Observer.unsubscribe("widgets.allowMessagesFromCommunity.denied");
      }
    }
</script>
