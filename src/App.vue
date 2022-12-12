<template>
  <app-header @add-wallet="handleAddWallet" />
  <app-body v-if="watchList.length">
    <app-wallet-item
      v-for="wallet in watchList"
      :key="wallet.address"
      :wallet="wallet"
    />
  </app-body>
  <div class="container">
    <h2 class="text-shadow text-uppercase">Your watch list is empty now...</h2>
  </div>
  <app-loading v-if="isLoading" />
</template>

<script>
import { getBalance, getTransactions } from './api';

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
      watchList: [],
      observers: new Map(),
    };
  },
  methods: {
    async handleAddWallet(walletAddress) {
      if (
        this.watchList.findIndex(
          (wallet) => wallet.address === walletAddress
        ) !== -1
      )
        return alert('Such wallet already in your watch list!');

      if (!walletAddress.match(/^0x[a-fA-F0-9]{40}$/))
        return alert('Invalid address format');

      this.isLoading = true;

      try {
        const balance = await getBalance(walletAddress);
        // await new Promise((resolve) => setTimeout(resolve, 1100));
        const transactions = await getTransactions(walletAddress);

        const newWallet = {
          address: walletAddress,
          balance: Number(balance),
          transactions,
        };

        this.watchList.push(newWallet);
        this.subscribeToUpdates(walletAddress);
      } catch (error) {
        if (String(error).toLowerCase().includes('invalid address format'))
          alert('Invalid address format');
        else if (String(error).toLowerCase().includes('max rate limit'))
          alert('Max rate limit, please wait a few seconds');
      } finally {
        this.isLoading = false;
      }
    },
    async subscribeToUpdates(walletAddress) {
      const index = this.watchList.findIndex(
        (wallet) => wallet.address === walletAddress
      );
      if (index === -1) return console.error('Subscribe to updates error!');

      const interval = setInterval(async () => {
        console.log('update');
        this.isLoading = true;
        const balance = await getBalance(walletAddress);
        // await new Promise((resolve) => setTimeout(resolve, 1100));
        const transactions = await getTransactions(walletAddress);

        this.watchList[index] = {
          address: walletAddress,
          balance,
          transactions,
        };

        this.isLoading = false;
      }, 60 * 1000);

      this.observers.set(walletAddress, interval);
    },
  },
  beforeUnmount() {
    this.observers.forEach((interval) => {
      clearInterval(interval);
    });
  },
};
</script>

<style lang="scss">
@import '@/scss/global.scss';
</style>
