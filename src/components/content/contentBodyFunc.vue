<template lang="">
  <div class="body__search__reload">
    <!-- <button
      class="delete__multiply"
      v-show="listDeleteIdEmployee.length > 0"
      @click="onClickDeleteMulti"
    >
      <i class="icofont-delete-alt"></i>
    </button> -->
    <div>
      <div
        class="select_count flex align-center gap-x-16"
        v-if="listDeleteIdEmployee.length"
      >
        <span class="select_count--text"
          >{{Text.selected}}
          <span class="count--text--number">{{
            listDeleteIdEmployee.length
          }}</span>
        </span>
        <span class="clear__select" @click="clickCheckAll">{{Text.removeSelected}}</span>
        <div>
          <MyButtonIcon :btnText="Text.delete" isSecondary @click="onClickDeleteMulti" color="color.DELETE"
            ><i class="icofont-close-circled"></i
          ></MyButtonIcon>
        </div>
      </div>
    </div>
    <div class="flex align-center gap-x-16">
      <div class="wrap-input">
        <div class="wrap__input--icon">
          <input
            type="text"
            class="input__search"
            :placeholder="placeHolder.searchCodeAndName"
            @input="searchDebounce"
          />
          <div class="search__icon"></div>
        </div>
        <!-- <inputIcon placeholder="Tìm theo mã tên nhân viên"></inputIcon> -->
      </div>
      <div class="excel_export" @click="exportExcel" :title="Tooltip.exportExcel">
        
      </div>
      <div
        class="reload__icon"
        :title="Text.refeshData"
        @click="reloadData"
      ></div>
    </div>
  </div>
</template>
<script>
import MyButtonIcon from "../Button/MyButtonIcon.vue";
import _ from "lodash";
// import inputIcon from "../Input/inputWithIcon.vue";
import { mapActions, mapState } from "vuex";
import { SEARCH_KEYWORD, SET_CHECK_ALL, SET_LIST_DELETE_EMP } from "@/store/Mutatios.Type";
import  {TEXT,TOOLTIP , PLACEHOLDER} from "../../resource/ResourceVN"
import { COLOR , DESCRIPTION} from "@/config/Common";
export default {
  data() {
    return {
      rowSelected: [],
      showDialogDel: {
        isShow: false,
        data: [],
      },
      Text: TEXT,
      Tooltip: TOOLTIP,
      color: COLOR,
      description: DESCRIPTION,
      placeHolder: PLACEHOLDER
    };
  },
  components: {
    // inputIcon,
    MyButtonIcon,
  },
  computed: {
    ...mapState(["listDeleteIdEmployee", "listEmployee","isCheckAll","dialogData"]),
  },
  methods: {
    ...mapActions(["reloadData"]),
    /**
     * bỏ check toàn bộ bản ghi trong trang
     * Author : DTANH (25/10/2022)
     */
    clickCheckAll() {      
      this.listEmployee.forEach((item) => {
        item.isChecked = false;
        this.$store.commit(SET_CHECK_ALL, false);
        this.$store.commit(SET_LIST_DELETE_EMP, []);
      });
    },

    /**
     * @description: Hàm xử lý khi click vào nút xóa nhiều nhân viên
     * Author : DTANH (25/10/2022)
     */
    onClickDeleteMulti() { 
      this.$store.commit("setDialog", {
        titleDialog: `Xóa ${this.listDeleteIdEmployee.length} nhân viên`,
        dialogShow: true,
        description: this.description.DELETE(this.Text.deleteBatchConfirm),
        btnText: this.Text.delete,
        btnTextSecondary: null,
        handleChoseYes: this.handleDeleteTrue,
        btnSecondaryChoseNo : this.Text.cancelSecond,
        color: this.color.DELETE,
      });
        this.showDialogDel.data= this.listDeleteIdEmployee      
    },

    /** chọn hủy trong dialog
     * Author:DTANh (26/10/2022)
     */
    handleDeleteFalse() {
      this.showDialogDel.isShow = false;
    },

    /**
     * Chọn xác nhận xóa nhiều bản ghi trong dialog
     * Author : DTANH (25/10/2022)
     */
    handleDeleteTrue() {      
      this.$store.dispatch("deleteMultiEmployee", this.showDialogDel.data);
      this.showDialogDel.data = [];
      this.$store.commit("setDialog", {
        dialogShow: false,
        color: this.color.PRIMARY,
      });
    },

    /**
     * Xử lý tìm kiếm theo từ khóa nếu có giá trị trong ô input hoặc không có giá trị
     * Author:DTANh (30/10/2022)
     */
    handleSearchEmployee(e) {
      if (e.target.value.length > 0) {
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

    /**
     * xuất khẩu dữ liệu ra file excel
     * Author : DTANH (20/11/2022)
     */
    exportExcel() {
      this.$store.dispatch("exportExcel");
    },
    ...mapActions(["searchEmployee", "filterEmployee","exportExcel"]),
  },
};
</script>
<style lang="css" scoped>
@import url("../../css/component/content-nav-function.css");
.select_count {
  color: var(--text-color);
  font-size: 14px;
}
.count--text--number {
  font-weight: 700;
}
.clear__select {
  color: var(--error-color);
  cursor: pointer;
}
.excel_export {
  width: 24px;
  height: 24px;
  background-image: url("../../assets/images/Sprites.64af8f61.svg");
  background-position: -705px -199px;
  cursor: pointer;
}
.excel_export:hover {
  background-position: -705px -255px;
}
</style>
