<template lang="">
    <div class="sidebar__menu">
      <router-link class="link" to="/">
        <menuItem title="Tổng quan"/>
      </router-link>
      <router-link class="link" to="/other">
        <menuItem title="Tài sản"/>
      </router-link>
      
      <!-- <menuItem title="Tổng quan"/>
      <menuItem title="Tổng quan"/> -->
    </div>
</template>
<script>
import menuItem from "./MenuItem.vue"
export default {
  components: {
    menuItem
  }
}
</script>
<style lang="css" scoped>
@import url(../../css/component/sidebar.css);
</style>