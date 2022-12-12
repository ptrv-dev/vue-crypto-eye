<template>
  <app-header @add-wallet="handleAddWallet" />
  <app-body v-if="watchList.length">
    <app-wallet-item
      v-for="wallet in watchList"
      :key="wallet.address"
      :wallet="wallet"
    />
  </app-body>
  <div v-else class="container">
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
      if (!walletAddress) return false;
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
        const newWallet = await this.createWalletObject(walletAddress);

        this.watchList.push(newWallet);

        const localWatchList =
          JSON.parse(window.localStorage.getItem('watchList')) || [];

        window.localStorage.setItem(
          'watchList',
          JSON.stringify([...localWatchList, walletAddress])
        );
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
        this.isLoading = true;

        const newWallet = await this.createWalletObject(walletAddress);

        this.watchList[index] = newWallet;

        this.isLoading = false;
      }, 60 * 1000);

      this.observers.set(walletAddress, interval);
    },
    async createWalletObject(walletAddress) {
      const balance = await getBalance(walletAddress);
      const transactions = await getTransactions(walletAddress);

      const newWallet = {
        address: walletAddress,
        balance: Number(balance),
        transactions,
      };

      return newWallet;
    },
  },
  watch: {
    watchList: {
      deep: true,
      handler(watchList) {
        watchList.forEach((wallet) => {
          if (this.observers.has(wallet.address)) return;
          this.subscribeToUpdates(wallet.address);
        });
      },
    },
  },
  mounted() {
    const localWatchList = JSON.parse(window.localStorage.getItem('watchList'));
    if (localWatchList) {
      localWatchList.forEach((address, index) => {
        setTimeout(async () => {
          const newWallet = await this.createWalletObject(address);
          this.watchList.push(newWallet);
        }, index * 1100);
      });
    }
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
