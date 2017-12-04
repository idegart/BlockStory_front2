<template>
  <el-row type="flex"
          justify="center"
          :gutter="60"
          style="flex-wrap: wrap;background-color: #5A5E66;padding: 15px;color: white">

    <el-col :xs="24" :sm="11" :md="8" :lg="6" :xl="4" class="hidden-sm-and-down">
      <img src="/static/images/main/writer.jpg" style="max-width: 100%;border-radius: 10px;margin-top: 30px"/>
    </el-col>

    <el-col :xs="24" :sm="11" :md="10" :lg="8" :xl="6">
      <h1>Что тут для писателей?</h1>
      <p>
        <b>BlockStory</b> предоставляет простой и удобный функционал для реализации ваших идей.<br/>
        Вы можете писать интерактивные истории, а удобный редактор поможет вам не запутаться во всех разветвлениях. Вы можете писать линейные истории или рисовать комиксы.<br/>
        Функционал предоставляет возможность создать своей работе индивидуальность за счет добавления изображений и аудио.<br/>
        Мы приветствуем творческий подход в использовании доступных вам инструментов.
      </p>
    </el-col>

  </el-row>
</template>

<script>
  import 'element-ui/lib/theme-chalk/display.css';
  export default {}
</script>
