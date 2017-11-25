<template>
  <div class="block-body">

    <div v-if="!(['starter','random'].indexOf(block.type)+1)"
         style="text-align: center;padding: 5px">
      <el-button @click="showBody=!showBody" round size="mini" style="padding: 3px 25px">
        <icon :name="showBody ? 'chevron-up' : 'chevron-down'" :scale="0.9"></icon>
      </el-button>
    </div>

    <block-data v-if="showBody" :block="block"></block-data>
  </div>
</template>

<script>
  import blockData from './body/Data.vue';
    export default {
      props: ['block'],
      components: {
        blockData
      },
      data: () => ({
        showBody: false
      }),
    }
</script>
