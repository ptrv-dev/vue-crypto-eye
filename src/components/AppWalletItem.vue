<template>
  <div class="wallet">
    <div class="wallet__info">
      <div class="wallet__info-item">
        <span class="wallet__suptitle">Wallet address:</span>
        <p>{{ wallet.address }}</p>
      </div>
      <div class="wallet__info-item">
        <span class="wallet__suptitle">Balance:</span>
        <p>{{ weiToEth(wallet.balance) }} ETH</p>
      </div>
      <div class="wallet__info-item">
        <span class="wallet__suptitle">Last transaction time:</span>
        <p>
          {{ dateBeautify(Number(wallet.transactions[0].timeStamp) * 1000) }}
        </p>
      </div>
      <div class="wallet__info-item">
        <span class="wallet__suptitle">Last transaction value:</span>
        <p>{{ weiToEth(wallet.transactions[0].value) }} ETH</p>
      </div>
    </div>

    <div class="wallet-transactions">
      <p class="wallet__suptitle">Last transactions</p>
      <table>
        <thead>
          <th>from</th>
          <th>to</th>
          <th>value (eth)</th>
          <th>time</th>
        </thead>
        <tbody>
          <tr
            :class="
              wallet.address.toLowerCase() === transaction.from.toLowerCase()
                ? 'wallet-transactions_out'
                : 'wallet-transactions_in'
            "
            v-for="(transaction, idx) in wallet.transactions"
            :key="idx"
          >
            <td>{{ transaction.from }}</td>
            <td>{{ transaction.to }}</td>
            <td>{{ weiToEth(transaction.value) }}</td>
            <td>{{ dateBeautify(Number(transaction.timeStamp) * 1000) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { weiToEth } from '@/utils/converter';
export default {
  props: {
    wallet: {
      type: Object,
      required: true,
    },
  },
  methods: {
    weiToEth,
    dateBeautify(unix) {
      const date = new Date(unix);
      return `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/vars';
.wallet {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  border: 1px solid $gray;
  &__suptitle {
    line-height: 1;
    color: $gray;
    text-transform: uppercase;
    font-size: 1rem;
  }
  &__info {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    &-item {
      display: inline-flex;
      flex-direction: column;
      p {
        font-size: 1.125rem;
      }
    }
  }
}
.wallet-transactions {
  table {
    width: 100%;
    thead {
      text-transform: uppercase;
    }
    th {
      padding: 0.5rem 0;
      font-weight: 400;
      text-align: left;
    }
  }
  &_out {
    background: rgba($red, 0.5);
  }
  &_in {
    background: rgba($green, 0.5);
  }
}
</style>
