<template>
  <div class="ql-snow">
    <div v-html="text" class="ql-editor"></div>
  </div>
</template>

<script>
  require('quill/dist/quill.snow.css');
  require('quill/dist/quill.core.css');

    export default {
      props: ['text']
    }
</script>
