<template lang="">
  <div class="left__content__header">
    <div class="header__toggle" @click="shinkSidebar" v-show="!isOpen"></div>
    <div class="dropdown__company">
      <span class="dropdown__company-name"
        >Công ty THHH sản xuất - Thương mại - Dịch vụ Quy Phúc</span
      >
      <div class="dropdown__company__icon">
        <i class="icofont-rounded-down"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    shinkSidebar() {
      this.isOpen = !this.isOpen;
      this.eventBus.emit("shinkSidebar", this.isOpen);
    },
  },
  mounted() {
    this.eventBus.on("growSidebar", (isOpen) => (this.isOpen = isOpen));
  },
};
</script>
<style lang="css" scoped>
@import url(../../css/component/header.css);
</style>
