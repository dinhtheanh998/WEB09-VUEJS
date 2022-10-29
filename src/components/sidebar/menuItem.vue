<template lang="">
  <div class="sidebar__menu__item" data-title="Tổng quan">
    <div class="sidebar__menu__item__icon"></div>
    <div class="sidebar__menu__item__text">{{title}}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tổng quan"
    }
  }
};
</script>
<style lang="css" scoped>
@import url(../../css/component/sidebar.css);
</style>
