<template>
  <div style="border-top: 1px solid #ffffff;">
    <block-starter v-if="block.type=='starter'" :block="block"></block-starter>
    <text-select v-if="block.type=='text_block_select'" :block="block"></text-select>
    <text-input v-if="block.type=='text_block_input'" :block="block"></text-input>
    <set-param v-if="block.type=='set_param'" :block="block"></set-param>
    <next-chapter v-if="block.type=='next_chapter'" :block="block"></next-chapter>
  </div>
</template>

<script>
  import blockStarter from './types/starter.vue';
  import textSelect from './types/textSelect.vue';
  import textInput from './types/textInput.vue';
  import setParam from './types/setParam.vue';
  import nextChapter from './types/nextChapter.vue';
    export default {
      props: ['block'],
      components: {
        blockStarter,textSelect,textInput,setParam,nextChapter
      }
    }
</script>
