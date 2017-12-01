<template>
  <div style="float: right">
    <el-button v-if="!accessAudio" @click="getAudioAccess">
      <icon name="music" :scale="0.8"></icon>
    </el-button>

    <div v-if="accessAudio">
      <el-button-group>
        <el-button @click="setAudioVolume('plus')" icon="el-icon-plus"></el-button>
        <el-button @click="denyAudio" icon="el-icon-close"></el-button>
        <el-button @click="setAudioVolume('minus')" icon="el-icon-minus"></el-button>
      </el-button-group>
    </div>

  </div>
</template>

<script>

    export default {
      props: ['game','block'],
      data: () => ({
        accessAudio: false,
        mainAudio: null,
        extraAudio: null,
        mainAudioCounter: 0,
        volume: 0.5
      }),
      methods: {
        getAudioAccess(){
          this.accessAudio = true;
          this.mainAudio = new Audio();
          this.extraAudio = new Audio();

          this.mainAudio.addEventListener('ended', () => {
            this.mainAudioCounter = ++this.mainAudioCounter < this.game.extra.background.audios.length ? this.mainAudioCounter : 0;
            this.mainAudio.src = this.game.extra.background.audios[this.mainAudioCounter].url;
            this.mainAudio.play();
          });

          this.mainAudio.loop = false;
          this.mainAudio.src = this.game.extra.background.audios[0].url;
          this.mainAudio.play();

          this.mainAudio.volume = this.volume;
          this.extraAudio.volume = this.volume;

          this.setBlockAudio();
        },
        setAudioVolume(type){
          this.volume = type === 'plus'
            ? this.volume > 0.9 ? 1 : this.volume + 0.1
            : this.volume < 0.2 ? 0.1 :this.volume - 0.1;

          localStorage.setItem('volume', this.volume);

          this.mainAudio.volume = this.volume;
          this.extraAudio.volume = this.volume;
        },
        setBlockAudio(){
          if (!this.accessAudio)
            return;

          if (this.block.data.audios.background.length){
            if (!this.mainAudio.paused)
              this.mainAudio.pause();

            this.extraAudio.src = this.block.data.audios.background[0].url;
            this.extraAudio.play();
            return;
          } else {
            this.extraAudio.pause();
            this.extraAudio.currentTime = 0;
          }

          if (this.mainAudio.paused)
            this.mainAudio.play();
        },
        denyAudio(){
          if (this.mainAudio !== null)
            this.mainAudio.pause();
          if (this.extraAudio !== null)
            this.extraAudio.pause();

          this.accessAudio = false;
          this.mainAudio = null;
          this.extraAudio = null;
          this.mainAudioCounter = 0;
        }
      },
      created(){
        if (!localStorage.getItem('volume')){
          localStorage.setItem('volume', 0.5);
          this.volume = 0.5;
          return;
        }

        this.volume = parseFloat(localStorage.getItem('volume'));
        console.log(this.volume);
      },
      watch:{
        block(){
          this.setBlockAudio();
          console.log('changed');
        }
      },
      beforeDestroy(){
        this.denyAudio();
      }
    }
</script>
