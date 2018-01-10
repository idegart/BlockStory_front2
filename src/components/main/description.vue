<template>
  <el-row type="flex"
          justify="center"
          :gutter="60"
          style="flex-wrap: wrap;background-color: #5A5E66;padding: 15px;color: white">

    <el-col :xs="24" :sm="11" :md="8" :lg="6" :xl="4" class="hidden-sm-and-down">
      <img src="/static/images/main/logo.jpg" style="max-width: 100%"/>
    </el-col>

    <el-col :xs="24" :sm="11" :md="10" :lg="8" :xl="6">
      <h1>Что такое BlockStory?</h1>
      <p style="font-family: Geneva, Arial, Helvetica, sans-serif;">
        <b>BlockStory</b> – новая площадка для творчества и проведения досуга. Любой желающий может рассказать свою историю или прочитать уже кем – то написанную.
      </p>
    </el-col>

  </el-row>
</template>

<script>
    export default {}
</script>
