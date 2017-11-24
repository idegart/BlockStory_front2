<template>
  <el-form-item label="VK">
    <a v-if="user.settings.vk" target="_blank" :href="'https://vk.com/id' + user.settings.vk">https://vk.com/id{{user.settings.vk}}</a>

    <vk-auth v-if="!user.settings.vk" @onEnter="onEnter"></vk-auth>

  </el-form-item>
</template>

<script>
  import vkAuth from '../../../../modules/VK-Widgets/vk-auth.vue';
    export default {
      props: ['user', 'systemUser'],
      components: {
        vkAuth
      },
      methods: {
        onEnter(e){
          let data = {
            hash: this.systemUser.hash,
            vk_id: e.uid
          };
          this.$http.post('user.update', data)
            .then(res => {
              let error = res.body.error.status;
              console.log(res);
              if (error !== 1){
                if (error===109){
                  this.$message({
                    message: this.$t('set_error_vkExist'),
                    type: 'warning'
                  });
                  return;
                }
                this.$message({
                  message: this.$t('error_common'),
                  type: 'warning'
                });
                return;
              }
              this.$message({
                message: this.$t('updated'),
                type: 'success'
              });
              this.user.settings.vk = e.uid;
            })
        }
      }
    }
</script>
