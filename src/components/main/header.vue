<template>
  <div class="wrap-banner"
       :style="'min-height:'+windowHeight+'px'">

    <div class="main-title">

      <h2>
        BlockStory
      </h2>

    </div>

    <vue-particles
      color="#ffffff"
      :particleOpacity="0.7"
      linesColor="#ffffff"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="5"
      :linesWidth="2"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      style="overflow: hidden">
    </vue-particles>

  </div>
</template>

<script>
  import VueParticles from "../../../node_modules/vue-particles/src/vue-particles/vue-particles.vue";
  export default {
    components: {
      VueParticles
    },
    computed: {
      windowHeight(){
        return this.$store.getters.getSize.height - 60 - 60;
      },
    }
  }
</script>

<style scoped>
  #particles-js {
    background: url('../../assets/images/main.jpg') no-repeat;
    background-size: cover;
    background-position: center center;
    opacity: 0.85;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .wrap-banner {
    position: relative;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    justify-content: center;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  .main-title {
    max-width: 80%;
    color: #fff;
    z-index: 999;
  }
  .main-title h2 {
    font-size: 2em;
    font-family: 'Teko', sans-serif;
    text-shadow: 8px 8px #000000;
    text-transform: uppercase;
    margin: 0
  }

  .main-title span{
    display: block;
    margin-top: 20px;
  }

  .vue-typer {
    font-family: Copperplate, 'Copperplate Gothic Light', fantasy;
    color: #ffffff !important;
  }

  .typed{
    color: #ffffff !important;
  }
</style>
