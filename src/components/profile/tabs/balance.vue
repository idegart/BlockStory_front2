<template>
  <el-form ref="form" :model="form" label-width="120px">

    <el-form-item label="За все время">
      <el-col :span="10">
        <el-input v-model="form.total" disabled>
          <template slot="append">хешей</template>
        </el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="Снято">
      <el-col :span="10">
        <el-input v-model="form.withdrawn" disabled>
          <template slot="append">хешей</template>
        </el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="Баланс">
      <el-col :span="10">
        <el-input v-model="form.balance" disabled>
          <template slot="append">хешей</template>
        </el-input>
      </el-col>
      <el-col :span="10">
        ~ {{(form.balance/36000000000*5.9*0.7*0.9/0.5*60).toFixed(6)}} рублей
      </el-col>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="toUpdate" v-loading="loading">Обновить</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
    export default {
      data: () => ({
        form: {
          total: 0,
          withdrawn: 0,
          balance: 0
        },
        loading: false
      }),
      methods: {
        toUpdate(){
          this.loading = true;
          this.$http.get('user.getHiveBalance')
            .then(res => {
              this.loading = false;
              if (res.body.error.status!==1){
                this.$message({
                  type: 'error',
                  message: res.body.error.message
                });
                return;
              }
              this.form = res.body.data.balance;
            })
        }
      }

    }
</script>
