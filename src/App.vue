<template>
  <div class="wrap__content">
    <layoutSibar></layoutSibar>
    <div class="content">
      <layoutHeader></layoutHeader>
      <router-view />
      <!-- <layoutContent></layoutContent> -->
    </div>
  </div>
  <!-- <mydialog description="Bạn có muốn xóa nhân viên này không"></mydialog> -->
  <!-- <myCheckbox></myCheckbox> -->
  <TestComponentVue></TestComponentVue>
</template>

<script>
import layoutSibar from "./layout/layoutSibar.vue";
import layoutHeader from "./layout/layoutHeader.vue";
import TestComponentVue from "./components/TestComponent.vue";
// import layoutContent from "./layout/layoutContent.vue";
// import myCheckbox from "./components/checkbox/myCheckbox.vue"
// import  myDropdown from "./components/dropdown/myDropdown.vue"
// import mydialog from "./components/dialog/warningDialog.vue"
export default {
  name: 'App',
  data: function () {
    return {
      showPopup: false,
      paggingRange:[10,20,30,50]
    }
  },
  components: {
    layoutSibar,
    layoutHeader,
    TestComponentVue,
    // layoutContent,
    // myCheckbox
    // myDropdown,
    // mydialog
  },
  methods: {
    mounted() {
      console.log(this);
      this.emitter.$on('toggleSidebar', (data) => {
        console.log(data);
        // this.isOpen = !this.isOpen;
      })
    }
  },
}
</script>
<style lang="css" scoped>
.wrap__content {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
.content {
  color: #fff;
  background-color: #c1c1c1;
  width: calc(100% - 200px);
  flex: 1;
}
</style>
