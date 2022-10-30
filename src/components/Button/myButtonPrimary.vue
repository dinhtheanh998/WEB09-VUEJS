<template lang="">
    <button :type="typeBtn" class="btn" :class="{ 'btn--primary': isPrimary , 'btn--secondary': isSecondary }">{{ btnText }}</button>
</template>
<script>
export default {
  props: {
    btnText: {
      type: String,
      default: "Button",
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    isSecondary: {
      type: Boolean,
      default: false,
    },
    typeBtn: {
      type: String,
      default: "button",
    }
  },
};
</script>
<style lang="css" scoped>
.btn {
  height: 36px;
  min-width: 64px;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 13px;
  text-align: center;
  font-weight: 700;
  color: #fff;
  border: none;
  line-height: 18px;
  cursor: pointer;
  outline: none;
}
.btn.btn--primary {
  background: var(--button-color);
}
.btn.btn--secondary{
  background: #fff;
  border: 1px solid #e6e6e6;
  color: var(--text-color);
}
.btn:focus {
  box-shadow: 0 0 0 1px var(--primary-color);
}
</style>
