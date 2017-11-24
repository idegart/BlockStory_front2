<template>
  <div id="vk_like"></div>
</template>

<script>
    export default {
      props:['url', 'title'],
      mounted(){
        let self = this;
        VK.Widgets.Like("vk_like",
          {
            type: "button",
            pageTitle: this.title,
          },
          this.url || this.$route.path
        );

        VK.Observer.subscribe("widgets.like.liked", function f(num, last_comment, date, sign) {
          let data = {
            num, last_comment, date, sign
          };
          self.$emit('newLike', data);
        });

        VK.Observer.subscribe("widgets.like.unliked", function f(num, last_comment, date, sign) {
          let data = {
            num, last_comment, date, sign
          };
          self.$emit('delLike', data);
        });

        VK.Observer.subscribe("widgets.like.shared", function f(num, last_comment, date, sign) {
          self.$emit('shared');
        });
      },
      beforeDestroy(){
        VK.Observer.unsubscribe("widgets.like.liked");
        VK.Observer.unsubscribe("widgets.like.unliked");
        VK.Observer.unsubscribe("widgets.like.shared");
      }
    }
</script>
