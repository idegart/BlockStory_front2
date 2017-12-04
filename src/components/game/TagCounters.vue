<template>
  <div>

    <el-tooltip class="item" effect="dark" content="Лайки" placement="top">
      <span>
        <icon name="thumbs-up" style="color: #878D99"></icon>
        {{ game.counter.likes }}
      </span>
    </el-tooltip>

    <el-tooltip class="item" effect="dark" content="Комментарии" placement="top">
      <span>
        <icon name="comments-o" style="color: #878D99"></icon>
        {{ game.counter.comments }}
      </span>
    </el-tooltip>

    <el-tooltip class="item" effect="dark" content="Просмотры" placement="top">
      <span>
        <icon name="eye" style="color: #878D99"></icon>
        {{ game.counter.views }}
      </span>
    </el-tooltip>

    <el-tooltip class="item" effect="dark" content="Сыграно раз" placement="top">
      <span>
        <icon name="play" style="color: #878D99"></icon>
        {{ game.counter.plays.all }}
      </span>
    </el-tooltip>

  </div>
</template>

<script>
    export default {
      props: ['game']
    }
</script>
