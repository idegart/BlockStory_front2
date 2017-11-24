<template>
  <div id="vk_comments"></div>
</template>

<script>
  export default {
    props: ['url', 'attach'],
    mounted(){
      let self = this;
      VK.Widgets.Comments("vk_comments",
        {
          attach: this.attach,
          autoPublish: 0
        }, this.url || this.$route.path);

      VK.Observer.subscribe("widgets.comments.new_comment", function f(num, last_comment, date, sign) {
        let data = {
          num, last_comment, date, sign
        };
        self.$emit('newComment', data);
      });

      VK.Observer.subscribe("widgets.comments.delete_comment", function f(num, last_comment, date, sign) {
        let data = {
          num, last_comment, date, sign
        };
        self.$emit('delComment', data);
      });
    },
    beforeDestroy(){
      VK.Observer.unsubscribe("widgets.comments.new_comment");
      VK.Observer.unsubscribe("widgets.comments.delete_comment");
    }
  }
</script>
