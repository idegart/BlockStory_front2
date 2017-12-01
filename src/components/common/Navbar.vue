<template>
  <el-menu
    :default-active="activeLink"
    mode="horizontal"
    :router="true"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">

    <el-menu-item index="/">{{ $t('nav_main')}}</el-menu-item>

    <div v-if="windowSize.width > 600">
      <el-menu-item index="/games">{{ $t('nav_quests')}}</el-menu-item>
      <el-menu-item index="/sandbox" v-if="user.hash">{{ $t('nav_sandbox')}}</el-menu-item>

      <el-submenu v-if="user.hash" index="2" style="float: right">
        <template slot="title">{{ $t('nav_profile')}}</template>
        <el-menu-item :index="'/profile/' + user.nickname">{{ $t('nav_profile_my')}}</el-menu-item>
        <el-menu-item index="/exit">{{ $t('nav_exit')}}</el-menu-item>
      </el-submenu>

      <el-menu-item v-if="!user.hash" index="/enter" style="float: right">{{ $t('nav_enter')}}</el-menu-item>
    </div>


    <el-dropdown v-if="windowSize.width < 601"
                 @command="handleCommand"
                 style="float: right;padding: 8px">
      <el-button>
        <icon name="bars"></icon>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="/games">Квесты</el-dropdown-item>
        <el-dropdown-item v-if="user.hash" command="/sandbox">Песочница</el-dropdown-item>
        <el-dropdown-item v-if="user.hash" :command="'/profile/' + user.nickname"divided>Профиль</el-dropdown-item>
        <el-dropdown-item v-if="user.hash" command="/exit">Выход</el-dropdown-item>
        <el-dropdown-item v-if="!user.hash" command="/enter">Войти</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>



  </el-menu>
</template>

<script>
    export default {
      data: () => ({
        activeLink: null
      }),
      methods: {
        handleSelect(){},
        handleCommand(link){
          this.$router.push(link);
        }
      },
      computed: {
        user(){
          return this.$store.getters.getUser;
        },
        windowSize(){
          return this.$store.getters.getSize;
        }
      }
    }
</script>
