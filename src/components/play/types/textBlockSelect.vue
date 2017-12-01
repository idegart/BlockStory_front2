<template>
  <div>
    <div v-if="timeout">
      <el-tag v-if="timeout>10" type="primary">
        <i class="el-icon-time"></i> Осталось времени - {{ timeout }} сек.
      </el-tag>
      <el-tag v-else-if="timeout > 5" type="warning">
        <i class="el-icon-time"></i> Осталось времени - {{ timeout }} сек.
      </el-tag>
      <el-tag v-else type="danger">
        <i class="el-icon-time"></i> Осталось времени - {{ timeout }} сек.
      </el-tag>
    </div>


    <text-display :text="data.text"></text-display>

    <answers :answers="data.answers" @goNext="goNext"></answers>
  </div>
</template>

<script>
  import textDisplay from '../../common/textDisplay.vue';
  import answers from './answers.vue';

    export default {
      props: ['data'],
      components: {
        textDisplay,answers
      },
      data: ()=>({
        timer: null,
        timeout: 0
      }),
      methods: {
        goNext(e){
          this.$emit('goNext',e);
        },
        setTimer(){
          if (!this.data.timer.timeout || !this.data.timer.next_block){
            this.timer = null;
            this.timeout = 0;
            return;
          }

          this.timeout = this.data.timer.timeout;
          this.timer = setInterval(() => {
            if (this.timeout < 2){
              this.$emit('goNext',this.data.timer.next_block);
              clearInterval(this.timer);
              return;
            }
            this.timeout--;
          }, 1000)


        }
      },
      mounted(){
        this.setTimer()
      },
      watch:{
        data(){
          clearInterval(this.timer);
          this.setTimer()
        }
      }
    }
</script>
