<template>
  <div class="wallet">
    <div class="wallet__info">
      <div class="wallet__info-item">
        <span class="wallet__suptitle">Wallet address:</span>
        <p>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</p>
      </div>
      <div class="wallet__info-item">
        <span class="wallet__suptitle">Balance:</span>
        <p>1.14892 ETH</p>
      </div>
      <div class="wallet__info-item">
        <span class="wallet__suptitle">Last transaction time:</span>
        <p>11.12.2022 / 13:48</p>
      </div>
      <div class="wallet__info-item">
        <span class="wallet__suptitle">Last transaction value:</span>
        <p>0.45132 ETH</p>
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
          <tr class="wallet-transactions_in">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_out">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_out">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_in">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_in">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_in">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_in">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_in">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_in">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
          <tr class="wallet-transactions_out">
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0x0A09a1AEAE4EC7A33E81E7AF93A52F9a7AeFa260</td>
            <td>0.31842</td>
            <td>11.12.2022 / 13:48</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

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
