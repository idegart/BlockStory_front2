<template>
  <el-row :gutter="5"
          v-if="user.hash"
          type="flex"
          justify="space-around"
          :style="renderStyle"
          class="profile-container">
    <el-col :xs="23" :sm="8" :md="6" :lg="5" :xl="4" style="margin-bottom: 15px">
      <profile-card v-if="user.hash" :user="user"></profile-card>
    </el-col>

    <el-col :xs="23" :sm="14" :md="16" :lg="15" :xl="14">
      <profile-tabs v-if="user.hash" :user="user"></profile-tabs>
    </el-col>

  </el-row>
</template>

<script>
  import profileCard from './profile/Card.vue';
  import profileTabs from './profile/Tabs.vue';
    export default {
      components: {
        profileCard, profileTabs
      },
      metaInfo(){
        return {
          titleTemplate: '%s | ' + this.user.nickname
        }
      },
      data: () => ({
        user: {
          extra: {},
          nickname: ''
        }
      }),
      methods: {
        loadUser(){
          this.$store.commit('setLoading', true);
          let nickname = this.$route.params.nickname;
          let params = {
            nickname
          }

          this.$http.get('user.get', {params})
            .then(res => {
              this.$store.commit('setLoading', false);
              let error = res.body.error.status;

              if (error !== 1){
                if (error === 101){
                  this.$message({
                    message: this.$t('error_userNotFounded'),
                    type: 'warning'
                  });
                  this.$router.push({name: 'notFounded'})
                }
              }

              this.user = res.body.user;

              console.log(res.body.user);
            })
        }
      },
      computed: {
        windowHeight(){
          return this.$store.getters.getSize.height - 60 - 60;
        },
        renderStyle(){
          let data = {
            minHeight: this.windowHeight + 'px',
          };

          if (this.user.extra.background.image)
            data.backgroundImage = 'url(' + this.user.extra.background.image + ')';
          else {
            let gradient = this.user.extra.background.gradient;
            let color1 = gradient.color1 || '#fff';
            let color2 = gradient.color2 || '#fff';

            data.background = 'linear-gradient( '
              + gradient.degree + 'deg,'
              + color1 + ','
              + color2 + ')';
          }


          return data;
        }
      },
      mounted(){
        this.loadUser();
      },
      watch:{
        '$route'(){
          this.loadUser();
        }
      }
    }
</script>

<style scoped>
  .profile-container{
    padding: 15px;
    flex-wrap: wrap;
    background: no-repeat center center fixed;
    background-size: cover;
  }
</style>
