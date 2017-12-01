<template>
  <div class="main">
    <vk-messages></vk-messages>
    <main-header></main-header>
    <!--<main-games></main-games>-->
    <!--<main-users></main-users>-->
    <!--<main-contacts></main-contacts>-->
  </div>
</template>

<script>
  import vkMessages from '../modules/VK-Widgets/vk-messages.vue';

  import mainHeader from './main/header.vue';
  import mainGames from './main/games.vue';
  import mainUsers from './main/users.vue';
  import mainContacts from './main/contacts.vue';
    export default {
      components: {
        vkMessages,
        mainHeader,mainGames,mainUsers,mainContacts
      },
      metaInfo: {
        titleTemplate: '%s'
      },
    }
</script>

<style scoped>
</style>
