<template>
  <div>
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="120px"
             size="mini"
             style="max-width: 400px;margin: 20px auto">

      <el-form-item label="Название" prop="title">
        <el-input v-model="form.title" placeholder="Название параметра"></el-input>
      </el-form-item>

      <el-form-item label="Тип">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">Строка</el-radio>
          <el-radio :label="1">Число</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="По умолчанию" prop="default_value">
        <el-input v-model="form.default_value" placeholder="Значение по умолчанию"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addParam">Добавить</el-button>
        <el-button @click="resetForm">Очистить</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
    export default {
      data() {
        let validTitle = (rule, value, callback) => {
          let re = /^([A-z0-9]{3,8})$/i;
          if (value === ''){
            callback(new Error('Необходимо ввести название'));
          } else if (!re.test(value)){
            callback(new Error('Название должно быть от 3 до 8 симвалов и содержать только кирилицу!'));
          }
          else{
            callback()
          }
        };
        let validDefault = (rule, value, callback) => {
          if (value === ''){
            callback();
          }

          if (value.length > 16){
            callback(new Error('Максимальная длина параметра не должна превышать 16 симвалов!'));
          }
          else{
            callback()
          }
        };
        return {
          form: {
            title: '',
            type: 0,
            default_value: ''
          },
          rules: {
            title: [
              { required: true, message: 'Введите название', trigger: 'blur' },
              { validator: validTitle, trigger: 'blur'}
            ],
            default_value: [
              { validator: validDefault, trigger: 'blur'}
            ]
          }
        }
      },
      methods: {
        addParam(){
          this.$refs.form.validate((valid) => {
            if (!valid)
              return;

            let data = {
              game_hash: this.editor.gameHash,
              title: this.form.title,
              type: this.form.type,
              default_value: this.form.default_value
            };

            this.$http.post('param',data)
              .then(res => {
                console.log(res);

                this.$store.commit('addParam', res.body.param);

                this.$refs.form.$el.reset();
                this.form = {
                  title: '',
                  type: 0,
                  default_value: ''
                }
              })
          });
        },
        resetForm(){
          this.$refs.form.$el.reset();
        }
      },
      computed: {
        editor(){
          return this.$store.getters.getEditor;
        },
        params(){
          return this.$store.getters.getParams;
        }
      }
    }
</script>
