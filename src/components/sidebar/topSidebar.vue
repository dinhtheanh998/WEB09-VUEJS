<template lang="">
  <div class="sidebar__header">
    <div class="wrap__sidebar__header">
      <div class="sidebar__header__menu"></div>
      <div class="sidebar__header__logo">
        <img src="../../assets/images/logo-web.svg" alt="logo" />
      </div>
    </div>
    <div class="wrap__sidebar__toggle" :class="{shink: isShink}" @click="handleGrowSideBar">
      <div class="sidebar__toggle__icon"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShink: false,
    };
  },
  methods: {
    handleGrowSideBar() {
      this.isShink = !this.isShink;
      this.eventBus.emit("growSidebar", this.isShink);
    }
  },
  mounted() {
    this.eventBus.on("shinkSidebar", (isShink) => this.isShink = isShink);
  },
};
</script>
<style lang="css" scoped>
@import url(../../css/component/sidebar.css);
</style>
