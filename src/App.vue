<template>
  <div class="wrap__content">
    <layoutSibar></layoutSibar>
    <div class="content">
      <layoutHeader></layoutHeader>
      <router-view />
      <!-- <layoutContent></layoutContent> -->
    </div>
  </div>
  <!-- <mydialog description="Bạn có muốn xóa nhân viên này không" btnTextPrimary="Có, xóa nhân viên" btnTextSecondary="Không" :color="color.DELETE"></mydialog> -->
  <!-- <myCheckbox></myCheckbox> -->
  <!-- <TestComponentVue></TestComponentVue>
  <div style="margin:32px 0"></div>
  <PaggingVue :totalPage="6" :numberPageDisplay="2"></PaggingVue>  
  <button @click="showToast">Show toast</button> -->
  <!-- <ToastTiFiVue></ToastTiFiVue> -->
  <FilterConditionVue :typeFilter="4" ></FilterConditionVue>
  <ToastTiFiMISA></ToastTiFiMISA>
  <warningDialogVue
        v-if="dialogData.dialogShow"
        :description="dialogData.description"
        :type="dialogData.type"
        zIndex="true"
        :btnTextPrimary="dialogData.btnText"
        :btnSecondaryChoseNo="dialogData.btnSecondaryChoseNo"
        :btnTextSecondary="dialogData.btnTextSecondary"
        :handleSecondaryChoseNo="
          () => {
            dialogData.dialogShow = false;
            handleShowPopup();
          }
        "
        :handleDeleteFalse="
          () => {
            dialogData.dialogShow = false;
          }
        "
        :handleDeleteTrue="dialogData.handleChoseYes"
      />
</template>

<script>
import layoutSibar from "./layout/LayoutSibar.vue";
import layoutHeader from "./layout/LayoutHeader.vue";
// import TestComponentVue from "./components/TestComponent.vue";
// import PaggingVue from "./components/pagging/Pagging.vue";
// import ToastTiFiVue from "./components/toastifi/ToastTiFi.vue";
import ToastTiFiMISA from "./components/toastifi/ToastTiFiMISA.vue";
import FilterConditionVue from "./components/dialog/FilterCondition.vue";
import _ from "lodash";
import { mapState } from 'vuex';
import { SET_TOAST } from "./store/Mutatios.Type";
// import layoutContent from "./layout/layoutContent.vue";
// import myCheckbox from "./components/checkbox/myCheckbox.vue"
// import  myDropdown from "./components/dropdown/myDropdown.vue"
import warningDialogVue from "./components/dialog/WarningDialog.vue"
import { COLOR } from "./config/Common";
export default {
  name: 'App',
  data: function () {
    return {
      showPopup: false,
      paggingRange:[10,20,30,50],
      color: COLOR
    }
  },
  components: {
    layoutSibar,
    layoutHeader,
    // TestComponentVue,
    // PaggingVue,
    // ToastTiFiVue,
    FilterConditionVue,
    ToastTiFiMISA,
    warningDialogVue
    // layoutContent,
    // myCheckbox
    // myDropdown,
    // mydialog
  },
  methods: {
    mounted() {
      this.emitter.$on('toggleSidebar', () => {
        // this.isOpen = !this.isOpen;
      })
    },
    /**
     * Hiển thị toast
     * Author: DTANH(25/10/2022)
     */
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
        ...mapState(["pageNumber","totalPage","toastState","resError","dialogData"])
  },
  // watch: {
  //   /**
  //    * Hiển dialog khi có lỗi
  //    */
  //   resError: function () {
  //     console.log("111")
  //     if (!_.isEmpty(this.resError)) {
  //       this.dialogData.dialogShow = true;
  //       this.dialogData.type = "warning";
  //       this.dialogData.description = this.resError.errorMsg;
  //       this.dialogData.btnText = "Đồng ý";
  //       this.dialogData.btnTextSecondary = null;
  //       this.dialogData.btnSecondaryChoseNo = null;
  //       this.dialogData.handleChoseYes = this.handleClosePopup;
  //     }
  //   },
  // }
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
