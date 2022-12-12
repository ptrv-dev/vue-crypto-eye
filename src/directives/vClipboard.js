export default {
  mounted(el, bind) {
    el.addEventListener('click', () => {
      navigator.clipboard.writeText(bind.value);
    });
  },
};
