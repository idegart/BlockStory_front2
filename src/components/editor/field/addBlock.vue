<template>
  <el-row :gutter="10" type="flex" justify="space-around" style="flex-wrap: wrap">
    <el-col :xs="24" :sm="20" :md="11" :lg="8" :xl="6">
      <el-cascader
        v-model="selectedBlock"
        :placeholder="$t('selectBlock')"
        :options="typeBlocks"
        filterable
        clearable
        :show-all-levels="false"
        expand-trigger="hover"
      ></el-cascader>
      <el-button @click="addBlock"
                 :disabled="!checkBlocks"
                 type="success"
                 plain
                 style="margin-top: 10px">
        {{ $t('toAdd')}}
      </el-button>
    </el-col>

    <el-col :xs="24" :sm="20" :md="11" :lg="8" :xl="6">
      {{ getDescriptionOfSelected }}
    </el-col>

  </el-row>
</template>

<script>
  import {setBlock} from '../functions/renderBlock';
  import typeBlocks from '../../../data/blockTypes';
    export default {
      props: ['click', 'game', 'chapter'],
      data: () => ({
        typeBlocks,
        selectedBlock: [],
        selected_type_block: null
      }),
      methods: {
        addBlock(){
          let data = {
            type: this.selected_type_block,
            gameHash: this.editor.gameHash,
            chapterHash: this.editor.chapterHash,
            position: this.click
          };

          this.$http.post('block.add', data)
            .then(res => {
              let block = res.body.block;

              setBlock(block);
              console.log(block);

              this.$store.commit('addBlock', block);
              this.$emit('close');
            })
        }
      },
      computed:{
        checkBlocks(){
          if (!this.selected_type_block)
            return false;

          if (this.blocks.length > 50)
            return false;

          if (this.selected_type_block === 'starter'){
            for (let i=0; i < this.blocks.length; i++){
              if (this.blocks[i].type === 'starter')
                return false;
            }
          }

          return true;
        },
        getDescriptionOfSelected(){
          let blocks = this.typeBlocks;
          let selectedBlock = this.selectedBlock;
          for (let i=0; i < blocks.length; i++){
            if (blocks[i].value === selectedBlock[0]){
              for (let j=0; j < blocks[i].children.length; j++){
                if (blocks[i].children[j].value === selectedBlock[1]){
                  this.selected_type_block = blocks[i].children[j].value;
                  return blocks[i].children[j].description
                }
              }
            }
          }
          this.selected_type_block = '';
          return this.$t('BlockStory')
        },
        editor(){
          return this.$store.getters.getEditor;
        },
        blocks(){
          return this.$store.getters.getBlocks;
        }
      }
    }
</script>
