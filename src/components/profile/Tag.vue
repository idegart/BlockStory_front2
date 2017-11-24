<template>
  <div>
    <el-tag v-if="type=='editor'" type="success">{{$t('type_user_editor')}}</el-tag>
    <el-tag v-if="type=='member'" type="info">{{$t('type_user_member')}}</el-tag>
    <el-tag v-if="type=='moderator'" type="warning">{{$t('type_user_moderator')}}</el-tag>
    <el-tag v-if="type=='banned'" type="danger">{{$t('type_user_ban')}}</el-tag>
    <el-tag v-if="type=='admin'" type="danger">{{$t('type_user_admin')}}</el-tag>
  </div>
</template>

<script>
    export default {
      props: ['type']
    }
</script>
