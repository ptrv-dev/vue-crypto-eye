<template>
  <app-header />
  <app-body>
    <app-wallet-item />
    <app-wallet-item />
    <app-wallet-item />
    <app-wallet-item />
    <app-wallet-item />
  </app-body>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppBody from '@/components/AppBody.vue';
import AppWalletItem from '@/components/AppWalletItem.vue';

export default {
  components: {
    AppHeader,
    AppBody,
    AppWalletItem,
  },
};
</script>

<style lang="scss">
@import '@/scss/global.scss';
</style>
