<template>
  <app-header
    @loading="
      (loading) => {
        isLoading = loading;
      }
    "
  />
  <app-body>
    <app-wallet-item />
    <app-wallet-item />
    <app-wallet-item />
    <app-wallet-item />
    <app-wallet-item />
  </app-body>
  <app-loading v-if="isLoading" />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppBody from '@/components/AppBody.vue';
import AppWalletItem from '@/components/AppWalletItem.vue';
import AppLoading from './components/AppLoading.vue';

export default {
  components: {
    AppHeader,
    AppBody,
    AppWalletItem,
    AppLoading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>

<style lang="scss">
@import '@/scss/global.scss';
</style>
