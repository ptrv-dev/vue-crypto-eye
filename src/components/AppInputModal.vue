<template>
  <div v-if="isOpen" class="backdrop" @click="handleCancel">
    <div class="modal" @click.stop>
      <div v-if="title" class="modal__header">
        <h4>{{ title }}</h4>
      </div>
      <div class="modal__body">
        <label>
          {{ label }}
          <input
            v-focus
            v-model="inputValue"
            @keypress.enter="handleSubmit"
            type="text"
            :placeholder="placeholder"
          />
        </label>
      </div>
      <div class="modal__actions">
        <button class="btn btn_text" @click="handleCancel">Cancel</button>
        <button class="btn btn_primary" @click="handleSubmit">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  modalController: {},
  props: {
    title: {
      type: String,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpen: false,
      inputValue: '',
    };
  },
  methods: {
    open() {
      let resolve, reject;
      const modalPromise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });

      this.$options.modalController = { resolve, reject };
      this.isOpen = true;

      return modalPromise;
    },
    handleCancel() {
      this.$options.modalController.resolve(false);
      this.inputValue = '';
      this.isOpen = false;
    },
    handleSubmit() {
      this.$options.modalController.resolve(this.inputValue);
      this.inputValue = '';
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/vars';
.backdrop {
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: rgba($dark, 0.75);
}
.modal {
  border-radius: 1rem;
  overflow: hidden;
  background: $white;
  color: $dark;
  min-width: 30rem;
  h4 {
    text-transform: uppercase;
  }
  &__header {
    padding: 1rem 2rem 0.5rem 2rem;
    border-bottom: 1px solid $gray;
  }
  &__body {
    padding: 1rem 2rem;
    border-bottom: 1px solid $gray;
    label {
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      text-transform: uppercase;
      input {
        font-size: 1rem;
        color: $dark;
        padding: 0.25rem 0.5rem;
        border: 1px solid $dark;
      }
    }
  }
  &__actions {
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: flex-end;
  }
}
</style>
