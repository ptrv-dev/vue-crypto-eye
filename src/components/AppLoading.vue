<template>
  <div class="backdrop">
    <div class="loading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/scss/vars';
.backdrop {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background: rgba($dark, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading {
  svg {
    width: 4rem;
    height: 4rem;
    animation: rotate 1.5s infinite;
    path {
      stroke: $white;
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
