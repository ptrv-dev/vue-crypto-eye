<template>
  <app-header />
  <app-body>
    <p>Hello here...</p>
  </app-body>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppBody from '@/components/AppBody.vue';

export default {
  components: {
    AppHeader,
    AppBody,
  },
};
</script>

<style lang="scss">
@import '@/scss/global.scss';
</style>
