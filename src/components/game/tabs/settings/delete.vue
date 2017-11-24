<template>
  <el-form-item label="Удалить">

    <el-alert
      v-if="game.user.hash !== authUser.hash"
      title="Это действие доступно только создателю"
      show-icon
      :closable="false"
      style="line-height: 18px;margin-top: 10px"
      type="error">
    </el-alert>

    <drag-verify v-if="game.user.hash === authUser.hash"
                 @passcallback="toDelete"
                 :width="300"
                 :height="30"
                 progressBarBg="#EB9E05"
                 completedBg="#FA5555"
                 textSize="14px"
                 text="Сдвиньте вправо чтобы удалить"
                 style="margin-top: 5px"
    ></drag-verify>

  </el-form-item>
</template>

<script>
  import dragVerify from 'vue-drag-verify';
    export default {
      props: ['game'],
      components: {
        dragVerify
      },
      methods: {
        toDelete(){
          this.$confirm('Это действие не обратимо. Продолжить?', 'Внимание', {
            confirmButtonText: 'Да, продолжить',
            cancelButtonText: 'Нет, отменить',
            type: 'warning'
          }).then(() => {
            let data = {
              hash: this.game.hash
            };

            this.$http.post('game.delete', data)
              .then(res => {
                console.log(res);
                this.$router.push({name: 'Main'});
                this.$message({
                  type: 'success',
                  message: 'Delete completed'
                });
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Delete canceled'
            });
          });
        }
      },
      computed: {
        authUser(){
          return this.$store.getters.getUser;
        }
      }
    }
</script>
