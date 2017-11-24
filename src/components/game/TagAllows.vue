<template>
  <div>

    <el-tooltip class="item" effect="dark" content="Игра доступна по прямой ссылке" placement="top">
      <icon v-if="allows.link" name="link" style="color: #878D99"></icon>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Комментарии включены" placement="top">
      <icon v-if="allows.comments" name="comments" style="color: #3a8ee6"></icon>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Сохранения включены" placement="top">
      <icon v-if="allows.saves" name="life-ring" style="color: #67C23A"></icon>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Статистика доступна пользователям" placement="top">
      <icon v-if="allows.statistics" name="line-chart" style="color: #EB9E05"></icon>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="Подключен модуль майнинга" placement="top">
      <icon v-if="allows.mining" name="cogs" style="color: #FA5555"></icon>
    </el-tooltip>

  </div>
</template>

<script>
    export default {
      props: ['allows']
    }
</script>
