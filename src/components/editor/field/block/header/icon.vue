<template>
  <div>
    <icon :name="getIcon"></icon>
  </div>
</template>

<script>
  import blockTypes from '../../../../../data/blockTypes';
    export default {
      props: ['block'],
      data: () => ({
        blockTypes
      }),
      computed: {
        getIcon(){
          let types = this.blockTypes;

          for (let i=0; i < types.length; i++){
            let type = types[i];

            for (let j=0; j < type.children.length; j++){
              if (this.block.type === type.children[j].value)
                return type.children[j].icon;
            }

          }

        }
      }
    }
</script>
