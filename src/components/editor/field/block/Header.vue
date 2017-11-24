<template>
  <div class="block-header" :style="getStyle">
    <table>
      <tr>
        <td class="block-header__icon">
          <block-icon :block="block"></block-icon>
        </td>
        <td class="block-header__title" @click.prevent.stop>
          <block-title :block="block"></block-title>
        </td>
        <td class="block-header__settings">
          <block-settings :block="block" @renderConnections="renderConnections"></block-settings>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import blockIcon from './header/icon.vue';
  import blockTitle from './header/title.vue';
  import blockSettings from './header/settings.vue';

  import blockTypes from '../../../../data/blockTypes';

  export default {
    props: ['block'],
    components:{
      blockIcon,blockTitle,blockSettings
    },
    data: () => ({
      blockTypes
    }),
    methods: {
      renderConnections(){
        this.$emit('renderConnections');
      },
      convertHex(hex, opacity){
        hex = hex.replace('#','');
        let r = parseInt(hex.substring(0,2), 16),
            g = parseInt(hex.substring(2,4), 16),
            b = parseInt(hex.substring(4,6), 16);

        return 'rgba('+r+','+g+','+b+','+opacity/100+')';
      }
    },
    computed: {
      getStyle() {
        let color = this.getColor;

        return {
          background: 'linear-gradient(to right, '
                      +this.convertHex(color,100)+' 0%, '
                      +this.convertHex(color,50)+' 70%, '
                      +this.convertHex(color,10)+' 100%)'
        };
      },
      getColor(){
        let types = this.blockTypes;

        for (let i=0; i < types.length; i++){
          let type = types[i];

          for (let j=0; j < type.children.length; j++){
            if (this.block.type === type.children[j].value)
              return type.children[j].color;
          }

        }
      }
    }

    }
</script>

<style scoped>
  .block-header{
    padding: 3px;
    cursor: auto;
  }
  .block-header > div{
    display: inline-block;
  }
  .block-header__title{
    width: 100%;
    cursor: text;
  }
</style>
