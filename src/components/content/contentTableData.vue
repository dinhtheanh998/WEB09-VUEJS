<template lang="">
  <div class="body__table__data" :id="id">
    <!-- <button v-if="selectedRow.length>0" @click="deleteMultiRecord">Xóa</button> -->
    <div class="wrap-table">
      <table>
        <tr class="table__header">
          <th class="headcol">
            <label
              class="checkbox custom__checkbox"
              :class="{ checked: isCheckAll2 }"
              for-html="checkbox__header"
            >
              <input
                type="checkbox"
                id="checkbox__header"
                hidden
                v-model="isCheckAll2"
                @click="clickCheckAll"
                
              />
              <div v-if="isCheckAll2" class="wrap__icon-custom">
                <i class="icofont-check-alt"></i>
              </div>
            </label>
          </th>
          <th data-name="EmployeeCode" @click="setQueryFilter">
            {{ FieldName.employeeCode }}
          </th>
          <th data-name="EmployeeName" @click="setQueryFilter">
            {{ FieldName.employeeName }}
          </th>
          <th data-name="">{{ FieldName.gender }}</th>
          <th data-name="" class="text-center">{{ FieldName.dateOfBirth }}</th>
          <th
            data-name="IndentityNumber"
            :title="Tooltip.indentityNumber"
            @click="setQueryFilter"
          >
            {{ FieldName.identityNumber }}
          </th>
          <th data-name="">{{ FieldName.position }}</th>
          <th data-name="">{{ FieldName.departmentCode }}</th>
          <th data-name="">{{ FieldName.departmentName }}</th>
          <th data-name="BankNumber" @click="setQueryFilter">
            {{ FieldName.bankNumber }}
          </th>
          <th data-name="BankName" @click="setQueryFilter">
            {{ FieldName.bankName }}
          </th>
          <th
            data-name="BankBranch"
            :title="Tooltip.bankBranch"
            @click="setQueryFilter"
          >
            {{ FieldName.branchName }}
          </th>
          <th data-name="">{{ FieldName.address }}</th>
          <th data-name="" :title="Tooltip.telePhoneNumber">
            {{ FieldName.phoneNumber }}
          </th>
          <th data-name="" class="lastcol text-center">Chức năng</th>
        </tr>
        <tbody>
          <div class="loading" v-if="loading">
            <div class="loading__icon"></div>
          </div>
          <div
            v-else-if="!listEmployee || listEmployee.length == 0"
            class="loading"
          >
            <div class="text-center">Không có dữ liệu</div>
          </div>
          <tr
            v-else
            v-for="item in listEmployee?.length > 0 && listEmployee"
            class="table__body"
            :key="item.EmployeeCode"
            :class="{ checked: item.isChecked }"
            v-on:dblclick="handleDoubleClickRow(item)"
          >
            <td class="headcol">
              <label
                class="checkbox custom__checkbox"
                :class="{ checked: item.isChecked }"
                :for-html="item.EmployeeId"
              >
                <input
                  type="checkbox"
                  :id="item.EmployeeId"
                  hidden
                  v-model="item.isChecked"
                  @change="rowChecked(item.EmployeeId)"
                />

                <div v-if="item.isChecked" class="wrap__icon-custom">
                  <i class="icofont-check-alt"></i>
                </div>
              </label>
            </td>
            <td>{{ item.EmployeeCode }}</td>
            <td>{{ item.EmployeeName }}</td>
            <td>
              {{ handleGender(item.Gender) || "" }}
            </td>
            <td class="text-center">
              {{
                item.DateofBirth &&
                new Date(item.DateofBirth).toLocaleDateString("en-GB")
              }}
            </td>
            <td>{{ item.IdentityNumber }}</td>
            <td>{{ item.JobPositionName }}</td>
            <td>{{ item.DepartmentCode }}</td>
            <td>{{ item.DepartmentName }}</td>
            <td>{{ item.BankNumber }}</td>
            <td>{{ item.BankName }}</td>
            <td>{{ item.BankBranch }}</td>
            <td>{{ item.Adress }}</td>
            <td>{{ item.TelephoneNumber }}</td>
            <td
              class="lastcol text-center"
              :style="{ zIndex: showContextMenu ? 3 : 0 }"
            >
              <div class="wrap__context">
                <button
                  class="context__btn-edit"
                  @click="
                    () => {
                      // getEmployeeByCode(item.EmployeeCode);
                      getEmployeeById(item.EmployeeId);
                      showPopup();
                    }
                  "
                >
                  Sửa
                </button>
                <div
                  class="context__icon"
                  @click="handleClickContextIcon($event, item)"
                ></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <contentPagging :totalRecord="totalRecord"></contentPagging>
  </div>
  <warningDialogVue
    v-if="showDialogDel.isShow"
    :description="
      'Bạn có chắc chắn muốn xóa nhân viên \<' +
      infoAndCoord.item.EmployeeCode +
      '\> không?'
    "
    :btnTextPrimary="showDialogDel.btnTextPrimary"
    :handleDeleteTrue="handleDeleteTrue"
    :handleDeleteFalse="handleDeleteFalse"
    :color="color.DELETE"
    titleDialog="Xóa nhân viên?"
    btnTextSecondary="Không"
  ></warningDialogVue>
  <teleport to="body">
    <ContextMenu
      v-if="showContextMenu"
      :coord="infoAndCoord.coord"
      :item="infoAndCoord.item"
      @clickDelete="handleEmitDelete"
      id="context__menu"
    ></ContextMenu>
  </teleport>
  <teleport to="body">
    <FilterConditionVue
      :typeFilter="1"
      v-if="filterInfo.status"
      :coord="filterInfo.coord"
      :name="filterInfo.name"
      :title="filterInfo.title"
    ></FilterConditionVue>
  </teleport>
</template>
<script>
import contentPagging from "./ContentPagging.vue";
import FilterConditionVue from "../dialog/FilterCondition.vue";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
  COLOR,
} from "../../config/Common";
// eslint-disable-next-line no-unused-vars
import RowDataTable from "./TableRowData.vue";
import warningDialogVue from "../dialog/WarningDialog.vue";
import ContextMenu from "../dialog/ContextMenu.vue";
// import axios from "axios";
import { mapActions, mapState } from "vuex";
import {
  SET_CHECK_ALL,
  SET_EDITFORM,
  SET_LIST_DELETE_EMP,
  SET_MODIFIED_FORM,
  SET_TITLE_POPUP,
  STATUS_POPUP,
} from "@/store/Mutatios.Type";
import { GENDER } from "../../Enums/Enums";
import { FIELD_NAME, TOOLTIP } from "../../resource/ResourceVN";
export default {
  data: function () {
    return {
      // số bản ghi trên trang
      recordPerPage: 0,

      // Tổng số bản ghi
      totalRecord: 0,

      //Số hàng đã checked
      selectedRow: [],

      //Hiển thị dialog
      showDialog: false,

      //Hiển thị dialog xóa
      showDialogDel: {
        isShow: false,
        id: null,
        btnTextPrimary: "",
      },
      //Hiển thị context menu
      showContextMenu: false,

      //Thông tin và tọa độ của context menu
      infoAndCoord: {
        item: null,
        coord: {},
      },

      // load lại dữ liệu
      refeshData: Function,

      FieldName: FIELD_NAME,

      Tooltip: TOOLTIP,

      color: COLOR,
    };
  },
  components: {
    contentPagging,
    warningDialogVue,
    ContextMenu,
    FilterConditionVue,
  },
  props: {
    forceRender: {
      type: Function,
    },
    id: {
      type: String,
    },
  },
  methods: {
    /**
     * Hiển thị filter nâng cao
     * @param {*} e
     */
    setQueryFilter(e) {
      this.$store.commit("setFilterInfo", {
        coord: e.target.getBoundingClientRect(),
        name: e.target.dataset.name,
        status: !this.$store.state.filterInfo.status,
        title: e.target.innerHTML,
      });
    },

    /**
     * Mở popup sửa khi double click vào dòng
     * Author : DTANH (25/10/2022)
     */
    handleDoubleClickRow(item) {
      this.getEmployeeById(item.EmployeeId);
      this.showPopup();
    },

    /**
     *  Xử lý hiển thị giới tính theo số ( 0 ,1, 2)
     * Author : DTANH (25/10/2022)
     */
    handleGender(gender) {
      try {
        let gen = "";
        switch (gender) {
          case GENDER.MALE:
            gen = "Nam";
            break;
          case GENDER.FEMALE:
            gen = "Nữ";
            break;
          case GENDER.OTHER:
            gen = "Khác";
            break;
        }
        return gen;
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Click header checkbox thì check toàn bộ các checkbox và thêm vào mảng
     * Author : DTANH (01/11/2022)
     */
    clickCheckAll() {
      try {
        if (this.isCheckAll2) {
          this.listEmployee.forEach((item) => {
            item.isChecked = false;
            this.$store.commit(SET_LIST_DELETE_EMP, this.listDeleteIdEmployee.filter(
              (item2) => item2 !== item.EmployeeId
            ));
          });
        } else {
          this.listEmployee.forEach((item) => {
            item.isChecked = true;
            if(!this.listDeleteIdEmployee.includes(item.EmployeeId)){
              this.$store.commit(SET_LIST_DELETE_EMP, [...this.listDeleteIdEmployee, item.EmployeeId]);
            }
            // this.$store.commit(SET_CHECK_ALL, true);
          });
          
        }
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Đưa các id của nhân viên được chọn vào mảng selectedRow
     * @param {string id employee} id
     * Author: DTANH (25/10/2022)
     */
    rowChecked(id) {
      if (this.listDeleteIdEmployee.includes(id)) {
        this.$store.commit(SET_LIST_DELETE_EMP, [
          ...this.listDeleteIdEmployee.filter((item) => item !== id),
        ]);
      } else {
        this.$store.commit(SET_LIST_DELETE_EMP, [
          ...this.listDeleteIdEmployee,
          id,
        ]);
      }
      this.$store.commit(
        SET_CHECK_ALL,
        this.listDeleteIdEmployee.length == this.listEmployee.length
      );
      this.isCheckAll =
        this.listDeleteIdEmployee.length == this.listEmployee.length;
    },

    /**
     * hiện dialog và lấy Id của nhân viên cần xóa
     * @param {string} id
     * Author: DTANH (25/10/2022)
     */
    handleEmitDelete(id) {
      this.showDialogDel.isShow = true;
      this.showDialogDel.id = id;
      this.showDialogDel.btnTextPrimary = "Có, xóa nhân viên";
    },

    /**
     * Đồng ý xóa nhân viên
     * Author: DTANH (25/10/2022)
     */
    handleDeleteTrue() {
      this.deleteOneRecord(this.showDialogDel.id); // console.log("Xóa bản ghi có id là:", );
      this.showDialogDel.isShow = false;
      this.showDialogDel.id = null;
    },

    /**
     * Hủy xóa nhân viên
     * Author: DTANH (25/10/2022)
     */
    handleDeleteFalse() {
      this.showDialogDel.isShow = false;
    },

    /** lấy thông tin nhân viên và tọa độ vừa click
     * @param {object} item
     * Author : DTANH (25/10/2022)
     */
    handleClickContextIcon(e, item) {
      this.showContextMenu = !this.showContextMenu;
      this.infoAndCoord = {
        item,
        coord: e.target.getBoundingClientRect(),
      };
    },

    /**
     * Xóa nhân viên
     * @param {string} id
     * Author: DTANH (25/10/2022)
     */
    deleteOneRecord(id) {
      this.$store.dispatch("deleteEmployee", id);
    },

    /**
     * Xóa nhiều bản ghi
     * Author: DTANH (25/10/2022)
     */
    deleteMultiRecord() {
      this.selectedRow.forEach((item) => {
        this.deleteOneRecord(item);
      });
    },
    /**
     * Ẩn context menu khi click ra ngoài
     * Author : DTANH (25/10/2022)
     */
    closeContextMenu(e) {
      if (e.target.closest(".context__icon")) return;
      this.showContextMenu = false;
    },

    /**
     * Hiển thị popup và thay đổi title của popup
     * Author : DTANH (01/11/2022)
     */
    showPopup() {
      this.$store.commit(SET_EDITFORM, true);
      this.$store.commit(SET_MODIFIED_FORM, true);
      this.$store.commit(SET_TITLE_POPUP, "Sửa nhân viên");
      this.$store.commit(STATUS_POPUP);
    },
    ...mapActions([
      "filterEmployee",
      "getEmployeeById",
      "deleteEmployee",
      "getAllDepartment",
    ]),
  },

  computed: {
    ...mapState([
      "listEmployee",
      "Employee",
      "listDeleteIdEmployee",
      "loading",
      "listDepartment",
      "isCheckAll",
      "filterInfo",
    ]),
    // ...mapGetters(["getListSelected"]),
    /**
     * lấy ra mảng các id từ mảng nhân viên
     */
    listID() {
      return this.listEmployee.map((item) => item.EmployeeId);
    },

    isCheckAll2: function () {
      let count = 0;
      this.listEmployee.forEach((item) => {
        if (item.isChecked) {
          count++;
        }
      });
      return count == this.listEmployee.length && count != 0;
    },
    
  },

  created() {
    this.eventBus.on("reloadData", (data) => {
      this.refeshData = data.returnValue;
      this.recordPerPage = data.recordPerPage;
    });
    this.eventBus.on("recordPerPage", (data) => {
      this.recordPerPage = data;
    });
    document.addEventListener("click", this.closeContextMenu);
    this.$store.dispatch("filterEmployee", {
      pageSize: DEFAULT_PAGE_SIZE,
      pageNumber: DEFAULT_PAGE_NUMBER,
    });
    this.$store.dispatch("getAllDepartment");
  },

  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keycode == 46) {
        this.handleEmitDelete(this.listEmployee[0].EmployeeId);
      }
    });
  },

  unmounted() {
    this.eventBus.off("reloadData");
    document.removeEventListener("click", this.closeContextMenu);
  },
};
</script>

<style lang="css" scoped>
@import url(../../css/component/table-data.css);
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loading__icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid var(--primary-color);
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
