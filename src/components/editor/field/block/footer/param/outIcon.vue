<template>
  <div>
    <icon :name="getIcon"></icon>
  </div>
</template>

<script>
    export default {
      props: ['type', 'connected'],
      computed: {
        getIcon(){
          switch (this.type){
            case '1':
            case 1:
              return this.connected ? 'circle' : 'circle-o'

          }
        }
      }
    }
</script>
