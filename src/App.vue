<template>
  <div id="app"
       v-loading.fullscreen.lock="loading||authLoading"
       element-loading-text="Загрузка.."
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-container :style="'min-height:'+ windowSize.height +'px'">
      <el-header style="padding: 0" v-if="visible">
        <main-navbar></main-navbar>
      </el-header>

      <el-main style="padding: 0">
        <router-view v-if="!authLoading"/>
      </el-main>

      <el-footer style="padding: 0" v-if="visible">
        <main-footer></main-footer>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
  import mainNavbar from './components/common/Navbar.vue';
  import mainFooter from './components/common/Footer.vue';
  export default {
    name: 'app',
    components: {
      mainNavbar, mainFooter
    },
    metaInfo: {
      title: 'BlockStory'
    },
    data: () => ({
      authLoading: false
    }),
    methods: {
      eventEnter(e){
        e.preventDefault();
      },
      handleResize(){
        let payload = {
          height: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth
        };

        this.$store.commit('setSize', payload);
      }
    },
    created(){
      VK.init({
        apiId: process.env.NODE_ENV === 'development' ? 6225905 : 6200458
      });

      this.handleResize();

      let session = localStorage.getItem('session_token');
      if (!session)
        return;

      this.authLoading = true;

      this.$store.commit('setSession', session);

      this.$http.get('auth.getUser')
        .then(res => {
          this.authLoading = false;
          let error = res.body.error.status;
          if (error !== 1){
            this.$store.commit('exitUser');
            return;
          }
          this.$store.commit('setUser', res.body.session.user);
        })
    },
    computed: {
      loading(){
        return this.$store.getters.getLoading;
      },
      windowSize(){
        return this.$store.getters.getSize;
      },
      editorMode(){
        return this.$store.getters.getEditorMode;
      },
      visible(){
        return !(['Play','Editor'].indexOf(this.$route.name)+1)
      }
    },
    mounted(){
      document.documentElement.addEventListener('submit', this.eventEnter, true);
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy(){
      document.documentElement.removeEventListener('submit', this.eventEnter, true);
      window.removeEventListener('resize', this.handleResize);
    },
  }
</script>

<style>
  body,html{
    margin: 0;
    padding: 0;
  }
  .el-message-box{
    max-width: 90%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
</style>
