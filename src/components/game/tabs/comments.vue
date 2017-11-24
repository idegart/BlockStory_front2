<template>
  <div>
    <el-alert
      v-if="!game.allows.comments"
      title="Комментарии отключены"
      type="info">
    </el-alert>

    <vk-comments v-if="game.allows.comments" @newComment="setComment" @delComment="setComment"></vk-comments>
  </div>
</template>

<script>
  import vkComments from '../../../modules/VK-Widgets/vk-comments.vue';
  export default {
    props: ['game'],
    components: {
      vkComments
    },
    methods: {
      setComment(e){
        let data = {
          hash: this.game.hash,
          comments: e.num
        };

        this.$http.post('game.update', data)
          .then(res => {
            this.game.counter.comments = data.comments;
          })
      }
    }
  }
</script>
