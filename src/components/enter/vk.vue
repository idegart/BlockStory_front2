<template>
  <div>
    <vk-auth @onEnter="onEnter" style="margin: auto"></vk-auth>
  </div>
</template>

<script>
  import vkAuth from '../../modules/VK-Widgets/vk-auth.vue'
    export default {
      components: {
        vkAuth
      },
      methods: {
        onEnter(options){
          this.$store.commit('setLoading', true);

          let params = {
            options
          };

          this.$http.get('auth.enterVK', {params})
            .then(res => {
              this.$store.commit('setLoading', false);
              let error = res.body.error.status;

              if (error !== 1){
                if (error === 101){
                  this.$message({
                    message: this.$t('error_VK_badHash'),
                    type: 'warning'
                  });
                  return;
                }
                if (error === 102){
                  this.$notify({
                    title: this.$t('error_common_warning'),
                    message: this.$t('error_userBanned')
                  });
                  return;
                }
                this.$message({
                  message: this.$t('error_common'),
                  type: 'warning'
                });
                return;
              }

              this.$store.commit('setSession', res.body.token.session);
              this.$store.commit('setUser', res.body.user);
              this.$router.push({name: 'Profile', params: {nickname: res.body.user.nickname}})
            });
        }
      }
    }
</script>
