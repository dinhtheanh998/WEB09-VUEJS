<template lang="">
  <button
    class="btn btn--icon"
    :class="{ 'btn--primary': isPrimary, 'btn--secondary': isSecondary }"
  >
    <div class="btn--wrapicon">
      <slot></slot>
    </div>
    <span class="btn--icon--text"> {{ btnText }} </span>
  </button>
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
  },
};
</script>
<style lang="css" scoped>
.btn--icon {
  padding-left: 12px;
  display: flex;
  gap: 0 4px;
  font-size: 14px;
}
.btn--icon--text {
  font-weight: normal;
}
.btn--wrapicon {
    font-size: 20px;   
    border-radius: 4px;
}
</style>
