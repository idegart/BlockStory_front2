<template>
  <ul>
    <li v-for="(answer, index) in answers"
        v-if="answer.text && answer.next_block"
        @click="$emit('goNext', answer.next_block)">
      {{answer.text}}
    </li>
  </ul>
</template>

<script>
    export default {
      props:['answers']
    }
</script>

<style scoped>
  ul{
    list-style-type: none;
    text-align: center;
    margin: 0;
    padding: 0;
    background-color: #DFE4ED;
  }
  li{
    display: block;
    color: #000000;
    padding: 8px 16px;
    border-bottom: 1px solid #000000;
  }
  li:last-child{
    border-bottom: none;
  }
  li:hover{
    background-color: #5A5E66;
    color: #ffffff;
    cursor: pointer;
  }
</style>
