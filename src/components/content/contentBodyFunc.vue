<template lang="">
  <div class="body__search__reload">
    <button
      class="delete__multiply"
      v-show="listDeleteIdEmployee.length > 0"
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
          @input="searchDebounce"
        />
        <div class="search__icon"></div>
      </div>
      <!-- <inputIcon placeholder="Tìm theo mã tên nhân viên"></inputIcon> -->
    </div>
    <div class="reload__icon" title="Làm mới dữ liệu" @click="reloadData"></div>
  </div>
  <teleport to="body">
    <warningDialogVue
      v-if="showDialogDel.isShow"
      :description="
        'Bạn có chắc chắn muốn xóa ' + listDeleteIdEmployee.length + ' nhân viên không?'
      "
      :handleDeleteFalse="handleDeleteFalse"
      :handleDeleteTrue="handleDeleteTrue"
      btnTextSecondary="Hủy"
      type="warning"
    ></warningDialogVue>
  </teleport>
</template>
<script>
import warningDialogVue from "../dialog/WarningDialog.vue";
import _ from "lodash";
// import inputIcon from "../Input/inputWithIcon.vue";
import axios from "axios";
import { mapActions, mapState } from "vuex";
import { SEARCH_KEYWORD } from "@/store/Mutatios.Type";
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
  computed: {
    ...mapState(["listDeleteIdEmployee"])
  },
  methods: {
    ...mapActions(["reloadData"]),
    
    /**
     * @description: Hàm xử lý khi click vào nút xóa nhiều nhân viên
     */
    onClickDeleteMulti() {
      this.showDialogDel.isShow = true;
      this.showDialogDel.data = this.listDeleteIdEmployee;
    },

    /** chọn hủy trong dialog
     * Author:DTANh (26/10/2022)
     */
    handleDeleteFalse() {
      this.showDialogDel.isShow = false;
    },

    /** 
     * Chọn xác nhận xóa nhiều bản ghi trong dialog
    */
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

    /** 
     * Xử lý tìm kiếm theo từ khóa nếu có giá trị trong ô input hoặc không có giá trị
     * Author:DTANh (30/10/2022)     
    */
    handleSearchEmployee(e) {
      if (e.target.value.length > 0) {
        console.log(e.target.value);
        this.$store.dispatch("filterEmployee", {
          pageSize: this.$store.state.pageSize,
          pageNumber: this.$store.state.pageNumber,
        });
      } else {
        this.$store.dispatch("filterEmployee", {
          pageSize: this.$store.state.pageSize,
          pageNumber: this.$store.state.pageNumber,
        });
      }
    },

    /**
     * Debounce cho hàm tìm kiếm
     * Author:DTANh (30/10/2022)
     */
    debounce(fn, delay) {
      let timer = null;
      return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    },

    /**
     * Gọi hàm debounce
     * Author:DTANh (30/10/2022)
    */
    searchDebounce: _.debounce(function (e) {
      console.log(e.target.value);
      this.$store.commit(SEARCH_KEYWORD, e.target.value);      
      this.handleSearchEmployee(e);
    }, 500),
    ...mapActions(["searchEmployee", "filterEmployee"]),
  },
};
</script>
<style lang="css" scoped>
@import url("../../css/component/content-nav-function.css");
</style>
