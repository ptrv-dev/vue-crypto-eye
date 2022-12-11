<template>
  <section class="body">
    <div class="body__container container">
      <h2 class="text-shadow">Your watch list:</h2>
      <div class="body__list">
        <slot />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.body {
  h2 {
    text-transform: uppercase;
  }
  &__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
