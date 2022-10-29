<template lang="">
  <div class="body__search__reload">
    <button
      class="delete__multiply"
      v-show="rowSelected.length > 0"
      @click="onClickDeleteMulti"
    >
      <i class="icofont-delete-alt"></i>
    </button>
    <div class="wrap-input">
      <div class="wrap__input--icon">
        <input
          type="text"
          class="input__search"
          placeholder="Tìm theo mã, tên nhân viên"
          @input="handleSearchEmployee"
        />
        <div class="search__icon"></div>
      </div>
      <!-- <inputIcon placeholder="Tìm theo mã tên nhân viên"></inputIcon> -->
    </div>
    <div class="reload__icon" title="Làm mới dữ liệu"></div>
  </div>
  <teleport to="body">
    <warningDialogVue
      v-if="showDialogDel.isShow"
      :description="
        'Bạn có chắc chắn muốn xóa ' + rowSelected.length + ' nhân viên không?'
      "
      :handleDeleteFalse="handleDeleteFalse"
      :handleDeleteTrue="handleDeleteTrue"
    ></warningDialogVue>
  </teleport>
</template>
<script>
import warningDialogVue from "../dialog/warningDialog.vue";
// import inputIcon from "../Input/inputWithIcon.vue";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      rowSelected: [],
      showDialogDel: {
        isShow: false,
        data: [],
      },
    };
  },
  components: {
    // inputIcon,
    warningDialogVue,
  },
  methods: {
    onClickDeleteMulti() {
      this.showDialogDel.isShow = true;
      this.showDialogDel.data = this.rowSelected;
    },
    /** chọn hủy trong dialog
     * Author:DTANh (26/10/2022)
     */
    handleDeleteFalse() {
      this.showDialogDel.isShow = false;
    },
    handleDeleteTrue() {
      this.showDialogDel.data.forEach((item) => {
        axios
          .delete(`https://amis.manhnv.net/api/v1/Employees/${item}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      this.showDialogDel.isShow = false;
    },
    handleSearchEmployee(e) {
      if (e.target.value.length > 0) { 
        this.$store.dispatch("searchEmployee", e.target.value);
      } else {
        this.$store.dispatch("filterEmployee",{ pageSize :this.$store.state.pageSize, pageNumber: this.$store.state.pageNumber });
      }
    },
    ...mapActions(["searchEmployee","filterEmployee"]),
  },
  created() {
    this.eventBus.on("rowSelectDelete", (data) => {
      this.rowSelected = data;
    });
  },
};
</script>
<style lang="css" scoped>
@import url("../../css/component/content-nav-function.css");
</style>
