<template lang="">
  <div class="sidebar" :class="{ 'sidebar--shink': isOpen }">
    <topSidebar></topSidebar>
    <menuItems></menuItems>
  </div>
</template>
<script>
import topSidebar from "../components/sidebar/TopSidebar.vue";
import menuItems from "../components/sidebar/MenuItems.vue";
export default {
  data: function () {
    return {
      isOpen: false,
    };
  },
  components: {
    topSidebar,
    menuItems,
  },
  methods: {},
  mounted() {
    this.eventBus.on("shinkSidebar", (isOpen) => this.isOpen = isOpen);
    this.eventBus.on("growSidebar", (isOpen) => this.isOpen = isOpen);
  },
};
</script>
<style lang="css" scoped>
.sidebar {
  width: 200px;
  height: 100vh;
  background-color: #001833;
  transition: all 0.2s ease-in-out;
}
.sidebar.sidebar--shink {
  width: 72px;
}

.sidebar.sidebar--shink .wrap__sidebar__toggle {
  display: flex;
}

.sidebar.sidebar--shink .sidebar__menu,
.sidebar.sidebar--shink .sidebar__menu__item,
.sidebar.sidebar--shink .sidebar__header {
  padding-left: 12px;
  padding-right: 12px;
  justify-content: center;
}
.sidebar.sidebar--shink .sidebar__menu__item__text,
.sidebar.sidebar--shink .wrap__sidebar__header {
  display: none;
}
</style>
