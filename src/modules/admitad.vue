<template>
  <div class="admitad">
    <span class="ad-title">Реклама:</span>
    <div class="ad_block" :id="injectTo">Поддержать проект</div>
  </div>

</template>

<script>
    export default {
      props: ['company','subID'],
      data: () => ({
        adBlock: false
      }),
      computed: {
        injectTo(){
          return "admitad_shuffle" + this.subID + Math.round(Math.random()*100000000)
        }
      },
      mounted(){
        let subid_block = 'subid/' + this.subID + '/',
            s = document.createElement('script');

        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://ad.admitad.com/shuffle/'+ this.company +'/'+subid_block+'?inject_to='+this.injectTo;

        let x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      }
    }
</script>
<style scoped>
  .ad-title{
    background-color: #F7BA2A;
  }
  .ad_block{
    text-align: center;
    padding: 10px;
  }
</style>
