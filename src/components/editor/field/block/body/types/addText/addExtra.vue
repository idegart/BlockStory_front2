<template>
  <div>

    <el-button @click="imageVisible=!imageVisible" type="info" plain size="mini">Images</el-button>

    <add-images v-if="imageVisible" :block="block"></add-images>

    <br/>
    <br/>

    <el-button @click="audioVisible=!audioVisible" :block="block" type="info" plain size="mini">Audios</el-button>

    <add-audios v-if="audioVisible" :block="block"></add-audios>

  </div>
</template>

<script>
  import addImages from './addImages.vue';
  import addAudios from './addAudios.vue';
    export default {
      props: ['block'],
      components: {
        addImages, addAudios
      },
      data: () => ({
        imageVisible: false,
        audioVisible: false
      })
    }
</script>
