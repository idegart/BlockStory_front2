<template>
  <el-row type="flex"
          justify="center"
          :gutter="60"
          style="flex-wrap: wrap;background-color: #5A5E66;padding: 15px;color: white">

    <el-col :xs="24" :sm="16" :md="14" :lg="12" :xl="10">
      <h2>Как я могу помочь проекту?</h2>
      <p>Без авторов не будет новых стори, без читателей — аудитории, а без талантливых людей — развития. Как раз поэтому Вы, именно Вы нужны нам сейчас, как никогда раньше.</p>
      <p><b>Проекту необходимы:</b></p>
      <ul>
        <li>Авторы</li>
        <li>Дизайнеры</li>
        <li>Верстальщики</li>
        <li>Маркетологи</li>
        <li>Модераторы</li>
        <li>Редакторы</li>
        <li>Контент-мейкеры</li>
        <li>Креативщики</li>
        <li>Тестировщики</li>
      </ul>


      <h3>Также можете помочь нам материально:</h3>
      <div style="text-align: center;width: 100%;border-radius: 10px;padding: 10px;background-color: #51545A;font-family: Geneva, Arial, Helvetica, sans-serif;">
        <el-form ref="form" :model="form"
                 label-width="120px" action="https://money.yandex.ru/quickpay/confirm.xml" target="_blank">
          <input type="hidden" name="receiver" value="410011828509663">
          <input type="hidden" name="quickpay-form" value="donate">
          <input type="hidden" name="paymentType" :value="form.payBy?'AC':'PC'">
          <input type="hidden" name="label" value="Поддержать проект 'BlockStory'">
          <input type="hidden" name="targets" value="Поддержать проект 'BlockStory'">

            <el-input type="textarea"
                      v-model="form.desc"
                      placeholder="Тут Вы можете оставить свой комментарий"
                      name="comment"></el-input>
          <br/>
          <br/>

            <el-input-number v-model="form.sum"
                             :controls="false"
                             name="sum"
                             :min="10" :max="15000">
            </el-input-number>

          <br/>
          <br/>

            <el-switch
              v-model="form.payBy"
              active-text="Банковская карта"
              inactive-text="Я.Деньги">
            </el-switch>

          <br/>
          <br/>

            <el-button @click="onSubmit" type="warning" round>Помочь проекту</el-button>

        </el-form>
      </div>

    </el-col>

  </el-row>
</template>

<script>
    export default {
      data: () => ({
        form: {
          title: 'Поддержать проект "BlockStory"',
          desc: '',
          sum: 100,
          payBy: false
        }
      }),
      methods: {
        onSubmit(){
          this.$refs.form.$el.submit();

          this.$notify.info({
            title: 'Благодарствие',
            message: 'Спасибо за то, что решили помочь проекту! Нам это очень важно',
            duration: 0
          });
        }
      }
    }
</script>
