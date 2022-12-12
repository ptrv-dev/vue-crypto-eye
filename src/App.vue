<template>
  <app-header @add-wallet="handleAddWallet" />
  <app-body>
    <app-wallet-item
      v-for="wallet in watchList"
      :key="wallet.address"
      :wallet="wallet"
    />
  </app-body>
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
        await new Promise((resolve) => setTimeout(resolve, 1100));
        const transactions = await getTransactions(walletAddress);

        const newWallet = {
          address: walletAddress,
          balance: Number(balance),
          transactions,
        };

        this.watchList.push(newWallet);
      } catch (error) {
        if (String(error).toLowerCase().includes('invalid address format'))
          alert('Invalid address format');
        else if (String(error).toLowerCase().includes('max rate limit'))
          alert('Max rate limit, please wait a few seconds');
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '@/scss/global.scss';
</style>
