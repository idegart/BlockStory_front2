<template>
  <span>Exit</span>
</template>

<script>
    export default {
      mounted(){
        this.$http.get('auth.exitUser')
          .then(res => {
            console.log(res);
          });
        this.$store.commit('exitUser');
        this.$router.push({name: 'Main'})
      }
    }
</script>
