<template>
  <div
    class="wallet-wrapper"
    :class="{
      'wallet-wrapper_editable': isEditable,
    }"
    @mouseleave="handleMouseOut"
    @mouseenter="handleMouseIn"
  >
    <div
      @click="handleRemoveButton"
      v-if="isRemoveButtonVisible"
      class="wallet-wrapper__remove"
    >
      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        Remove</span
      >
    </div>
    <div class="wallet">
      <div class="wallet__info">
        <div class="wallet__info-item">
          <span class="wallet__suptitle">Wallet address:</span>
          <p v-clipboard="wallet.address">{{ wallet.address }}</p>
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
              :class="{
                'wallet-transactions_out':
                  wallet.address.toLowerCase() ===
                  transaction.from.toLowerCase(),
                'wallet-transactions_in':
                  wallet.address.toLowerCase() !==
                  transaction.from.toLowerCase(),
              }"
              v-for="(transaction, idx) in wallet.transactions"
              :key="idx"
            >
              <td v-clipboard="transaction.from">{{ transaction.from }}</td>
              <td v-clipboard="transaction.to">{{ transaction.to }}</td>
              <td>{{ weiToEth(transaction.value) }}</td>
              <td>{{ dateBeautify(Number(transaction.timeStamp) * 1000) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isRemoveButtonVisible: false,
    };
  },
  methods: {
    weiToEth,
    dateBeautify(unix) {
      const date = new Date(unix);
      return `${date.toLocaleDateString()} / ${date.toLocaleTimeString()}`;
    },
    handleRemoveButton() {
      this.$emit('remove', this.wallet.address);
    },
    handleMouseIn() {
      if (this.isEditable) this.isRemoveButtonVisible = true;
    },
    handleMouseOut() {
      this.isRemoveButtonVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/vars';
.wallet-wrapper {
  display: flex;
  gap: 0.5rem;
  &__remove {
    position: relative;
    width: 3rem;
    text-transform: uppercase;
    border: 1px dashed $red;
    color: $red;
    cursor: pointer;
    span {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      svg {
        width: 1.5rem;
      }
    }
  }
}
.wallet {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem;
  border: 1px solid $gray;
  flex: 1;
  transition: all 0.3s;
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
