<template>
  <div class="main">
    <vk-messages></vk-messages>
    <main-header></main-header>
    <main-description></main-description>
    <main-users></main-users>
    <main-authors></main-authors>
    <main-donate></main-donate>
  </div>
</template>

<script>
  import vkMessages from '../modules/VK-Widgets/vk-messages.vue';

  import mainHeader from './main/header.vue';
  import mainDescription from './main/description.vue';
  import mainUsers from './main/users.vue';
  import mainAuthors from './main/authors.vue';
  import mainDonate from './main/donate.vue';
    export default {
      components: {
        vkMessages,
        mainHeader,mainDescription,mainUsers,mainAuthors,mainDonate
      },
      metaInfo: {
        titleTemplate: '%s'
      },
    }
</script>

<style scoped>
</style>
