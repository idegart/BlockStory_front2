<template>
  <div id="vk_comments"></div>
</template>

<script>
  export default {
    props: ['url'],
    mounted(){
      VK.Widgets.CommentsBrowse("vk_comments");

      VK.Observer.subscribe("widgets.comments.new_comment", function f(num, last_comment, date, sign) {
      });

      VK.Observer.subscribe("widgets.comments.delete_comment", function f(num, last_comment, date, sign) {
      });
    },
    beforeDestroy(){
      VK.Observer.unsubscribe("widgets.comments.new_comment");
      VK.Observer.unsubscribe("widgets.comments.delete_comment");
    }
  }
</script>
