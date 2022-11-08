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
  <!-- <TestComponentVue></TestComponentVue>
  <div style="margin:32px 0"></div>
  <PaggingVue :totalPage="6" :numberPageDisplay="2"></PaggingVue>  
  <button @click="showToast">Show toast</button> -->
  <ToastTiFiVue></ToastTiFiVue>
</template>

<script>
import layoutSibar from "./layout/LayoutSibar.vue";
import layoutHeader from "./layout/LayoutHeader.vue";
// import TestComponentVue from "./components/TestComponent.vue";
// import PaggingVue from "./components/pagging/Pagging.vue";
import ToastTiFiVue from "./components/toastifi/ToastTiFi.vue";
import { mapState } from 'vuex';
import { SET_TOAST } from "./store/Mutatios.Type";
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
    // TestComponentVue,
    // PaggingVue,
    ToastTiFiVue,
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
    },
    showToast() {
      this.$store.commit(SET_TOAST, {
        show: true,
        type: 'success',
        message: 'Thêm thành công'
      })
      setTimeout(() => {
        this.$store.commit(SET_TOAST, {
          show: false,
          type: 'success',
          message: ''
        })
      }, 2000)
    }
  },
  computed: {
        ...mapState(["pageNumber","totalPage","toastState"])
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
