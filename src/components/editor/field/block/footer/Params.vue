<template>
  <div class="block-params">

    <el-input v-if="editParamVisible" placeholder="Введите ответ" size="mini">
      <i @click="saveParam" slot="suffix" class="el-input__icon el-icon-edit"></i>
    </el-input>


    <div class="block-params__title">
      <div>
        <!--<span>IN</span>-->
        <params-in :block="block"
                   v-if="block.params"
                   @setConnection="setConnection"></params-in>
      </div>
      <div>
        <!--<span>OUT</span>-->
        <params-out :block="block"
                    v-if="block.params"
                    @deleteConnection="deleteConnection"></params-out>
      </div>
    </div>
  </div>
</template>

<script>
  import toConnect from '../../../functions/setConnections';

  import paramsIn from './paramsIn.vue';
  import paramsOut from './paramsOut.vue';
    export default {
      props: ['block'],
      components: {
        paramsOut,paramsIn
      },
      data: () => ({
        editParamVisible: false
      }),
      methods: {
        updateConnection(connections){

          let params = toConnect(connections);

          console.log(connections);

          let data = {
            block_hash: connections.start.block.hash,
            ...params
          };

          this.$http.post('block.update', data)
            .then(res => {
              console.log(res);
            });

          this.$emit('renderConnections');
        },
        setConnection(){
          let connections = this.$store.getters.getConnection;

          this.updateConnection(connections);

          this.$store.commit('clearDragging')
        },
        deleteConnection(payload){

          let connections = {
            start: {
              block: payload.block,
              param: payload.param
            }
          };

          this.updateConnection(connections);
        },
        saveParam(){
          console.log('test');
        }
      },
    }
</script>

<style scoped>
  .block-params__title{
    display: flex;
    font-size: 12px;
  }
  .block-params__title > div{
    width: 50%;
    padding: 3px;
    text-align: center !important;
  }
  .block-params__title > div:last-child{
    text-align: right;
  }
</style>
