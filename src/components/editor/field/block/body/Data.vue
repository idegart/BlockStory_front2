<template>
  <div style="border-top: 1px solid #ffffff;">
    <block-starter v-if="block.type=='starter'" :block="block"></block-starter>
    <text-select v-if="block.type=='text_block_select'" :block="block"></text-select>
  </div>
</template>

<script>
  import blockStarter from './types/starter.vue';
  import textSelect from './types/textSelect.vue';
    export default {
      props: ['block'],
      components: {
        blockStarter,textSelect
      }
    }
</script>
