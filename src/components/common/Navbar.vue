<template>
  <el-menu
    :default-active="activeLink"
    mode="horizontal"
    :router="true"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">

    <el-menu-item index="/">{{ $t('BlockStory')}}</el-menu-item>

    <div v-if="windowSize.width > 600">
      <el-menu-item index="/games">{{ $t('Games')}}</el-menu-item>
      <el-menu-item index="/sandbox" v-if="user.hash">{{ $t('Sandbox')}}</el-menu-item>

      <el-submenu v-if="user.hash" index="2" style="float: right">
        <template slot="title">{{ $t('Profile')}}</template>
        <el-menu-item :index="'/profile/' + user.nickname">{{ $t('myProfile')}}</el-menu-item>
        <el-menu-item index="/exit">{{ $t('toExit')}}</el-menu-item>
      </el-submenu>

      <el-menu-item v-if="!user.hash" index="/enter" style="float: right">{{ $t('toEnter')}}</el-menu-item>
    </div>


    <el-dropdown v-if="windowSize.width < 601"
                 @command="handleCommand"
                 style="float: right;padding: 8px">
      <el-button>
        <icon name="bars"></icon>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="/games">{{ $t('Games')}}</el-dropdown-item>
        <el-dropdown-item v-if="user.hash" command="/sandbox">{{ $t('Sandbox')}}</el-dropdown-item>
        <el-dropdown-item v-if="user.hash" :command="'/profile/' + user.nickname"divided>{{ $t('myProfile')}}</el-dropdown-item>
        <el-dropdown-item v-if="user.hash" command="/exit">{{ $t('toExit')}}</el-dropdown-item>
        <el-dropdown-item v-if="!user.hash" command="/enter">{{ $t('toEnter')}}</el-dropdown-item>
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
