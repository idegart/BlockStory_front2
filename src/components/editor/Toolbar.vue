<template>
  <div class="toolbar">

    <params></params>

  </div>
</template>

<script>
  import params from './toolbar/params.vue';
    export default {
      components: {
        params
      }
    }
</script>

<style scoped>
  .toolbar{
    padding: 5px;
  }
</style>
