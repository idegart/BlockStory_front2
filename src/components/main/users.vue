<template>
  <el-row type="flex"
          justify="center"
          :gutter="60"
          style="flex-wrap: wrap;background-color: #5A5E66;padding: 15px;color: white">

    <el-col :xs="24" :sm="11" :md="10" :lg="8" :xl="6">
      <h1>Что тут для читателей?</h1>
      <p style="font-family: Geneva, Arial, Helvetica, sans-serif;">
        <b>BlockStory</b> позволяет найти историю на любой вкус: романтика, фэнтези, детектив и еще много других жанров.
        Вы можете найти историю, которая погрузит вас в себя на целый вечер.<br/>
        Приятным дополнением выступает возможность индивидуализации личного профиля по своему вкусу.
      </p>
    </el-col>

    <el-col :xs="24" :sm="11" :md="8" :lg="6" :xl="4" class="hidden-sm-and-down">
      <img src="/static/images/main/readers.jpg" style="max-width: 100%;border-radius: 10px;margin-top: 30px"/>
    </el-col>

  </el-row>
</template>

<script>
  export default {}
</script>
