<template>
  <el-dialog
    title="Демо тест"
    :visible="testPlay.visible"
    :before-close="handleClose">

    <play-card :block="testPlay.block"
               @goNext="goNext"
               @goStart="newGame"
    ></play-card>

  </el-dialog>
</template>

<script>
  import playCard from '../play/Card.vue';
  export default {
    components: {
      playCard
    },
    methods: {
      getStarter(){
        let set_start = false;

        for (let i=0; i < this.blocks.length; i++){
          let block = this.blocks[i];

          if (block.type === 'starter'){
            if (!block.extra.next_block){
              this.$message({
                message: 'Не задан блок после начала.',
                type: 'warning'
              });
              this.$store.commit('setTestPlayVisible', false);
              return;
            }
            this.setBlock(block.extra.next_block);
            set_start = true;
          }
        }

        if (!set_start){
          this.$message({
            message: 'Не задан начальный блок.',
            type: 'warning'
          });
          this.$store.commit('setTestPlayVisible', false);
        }
      },
      newGame(){
        this.getStarter();
      },
      goNext(e){
        if (!e){
          this.$message({
            message: 'Следующий блок не установлен!',
            type: 'warning'
          });
          return;
        }
        this.setBlock(e);
      },
      handleClose(){
        this.$store.commit('setTestPlayVisible', false);
      },
      setBlock(next_block){
        this.blocks.forEach(block => {

          if (block.hash === next_block){
            switch (block.type){
              case 'starter':
                this.$message({
                  message: 'Следующий блок не может быть начальным.',
                  type: 'warning'
                });
                return;
              case 'random':
                let next_blocks = [];
                console.log(block.extra.random);
                for (let i=0; i < block.extra.random.length; i++){
                  let data = block.extra.random[i];
                  if (!data.next_block)
                    continue;

                  for (let j=0; j < this.blocks.length; j++){
                    let this_block = this.blocks[j];
                    if (this_block.hash === data.next_block)
                      next_blocks.push(this_block);
                  }
                }

                let random = 0.5 + Math.random() * next_blocks.length - 1;
                random = Math.round(random);

                this.$store.commit('setTestPlayBlock', next_blocks[random]);
                return;
            }
            this.$store.commit('setTestPlayBlock', block);
          }
        })
      }
    },
    computed: {
      testPlay(){
        return this.$store.getters.getTestPlay;
      },
      blocks(){
        return this.$store.getters.getBlocks;
      }
    },
    watch:{
      'testPlay.visible' (e){
        if (e){
          this.getStarter();
        } else {
          this.$store.commit('setTestPlayBlock', {});
        }
      }
    }
  }
</script>
