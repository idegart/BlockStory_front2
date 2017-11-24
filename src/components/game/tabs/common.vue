<template>
  <div>
    <vk-like @newLike="setLike" @delLike="setLike"></vk-like>
    <el-alert
      v-if="!game.extra.description"
      show-icon
      :title="$t('alert_user_noDescription')"
      type="info">
    </el-alert>

    <div v-if="game.extra.description">
      <text-display :text="game.extra.description"></text-display>
    </div>
  </div>
</template>

<script>
  import textDisplay from '../../common/textDisplay.vue';
  import vkLike from '../../../modules/VK-Widgets/vk-like.vue';
  export default {
    props: ['game'],
    components: {
      textDisplay,vkLike
    },
    methods: {
      setLike(e){
        let data = {
          hash: this.game.hash,
          likes: e.num
        };

        this.$http.post('game.update', data)
          .then(res => {
            console.log(res);
            this.game.counter.likes = data.likes;
          })
      }
    }
  }
</script>
