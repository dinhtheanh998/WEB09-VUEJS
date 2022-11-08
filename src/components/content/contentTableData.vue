<template lang="">
  <div class="body__table__data" :id="id">
    <!-- <button v-if="selectedRow.length>0" @click="deleteMultiRecord">Xóa</button> -->
    <div class="wrap-table">
      <table>
        <tr class="table__header">
          <th class="headcol">
            <label
              class="checkbox custom__checkbox"
              for-html="checkbox__header"
            >
              <input
                type="checkbox"
                id="checkbox__header"
                hidden
                v-model="isCheckAll"
                @click="clickCheckAll"
              />
              <div v-if="isCheckAll" class="wrap__icon-custom">
                <i class="icofont-check-alt"></i>
              </div>
            </label>
          </th>
          <th>Mã nhân viên</th>
          <th>Tên nhân viên</th>
          <th>Giới tính</th>
          <th class="text-center">Ngày sinh</th>
          <th title="Số chứng minh nhân dân">Số CMND</th>
          <th>Chức Danh</th>
          <th>Mã đơn vị</th>
          <th>Tên đơn vị</th>
          <th title="Tên nhóm khách hàng, nhà cung cấp">Nhóm KH, NCC</th>
          <th title="Tài khoản công nợ phải thu">Tk Công nợ phải thu</th>
          <th title="Tài khoản công nợ phải trả">Tk Công nợ phải trả</th>
          <th>Số tài khoản</th>
          <th>Tên ngân hàng</th>
          <th title="Chi nhánh tài khoản ngân hàng">Chi nhánh TK ngân hàng</th>
          <th>Địa chỉ</th>
          <th title="Điện thoại di động">ĐT Di động</th>
          <th class="text-right">Tiền Lương</th>
          <th class="lastcol text-center">Chức năng</th>
        </tr>
        <tbody>
          <div class="loading" v-if="loading">
            <div class="loading__icon"></div>
          </div>   
          <div v-else-if="!listEmployee" class="loading">
            <div class="text-center">Không có dữ liệu</div>
          </div>
          <tr
            v-else
            v-for="item in listEmployee?.length > 0 && listEmployee"
            class="table__body"
            :key="item.EmployeeCode"
            :class="{ checked: item.isChecked }"
            @dblclick="
              () => {
                getEmployeeById(item.EmployeeId);
                showPopup();
              }
            "
          >
            <td class="headcol">
              <label
                class="checkbox custom__checkbox" :class="{ 'checked': item.isChecked }"
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
              {{ item.GenderName || "" }}
            </td>
            <td class="text-center">
              {{
                item.DateOfBirth &&
                new Date(item.DateOfBirth).toLocaleDateString("vi-VN")
              }}
            </td>
            <td>{{ item.IdentityNumber }}</td>
            <td>{{ item.DepartmentName }}</td>
            <td>VP01</td>
            <td>Văn Phòng 01</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{{ item.BankAccountNumber }}</td>
            <td>{{ item.BankName }}</td>
            <td>{{ item.BankBranchName }}</td>
            <td>{{item.Adress}}</td>
            <td>{{ item.TelephoneNumber }}</td>
            <td class="text-right">{{Math.round(item.Salary)}}</td>
            <td
              class="lastcol text-center"
              :style="{ zIndex: showContextMenu ? 3 : 0 }"
            >
              <div class="wrap__context">
                <button
                  class="context__btn-edit"
                  @click="
                    () => {
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
    :handleDeleteTrue="handleDeleteTrue"
    :handleDeleteFalse="handleDeleteFalse"
    type="warning"
    btnTextSecondary="Hủy"
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
</template>
<script>
import contentPagging from "./ContentPagging.vue";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_NUMBER,
} from "../../config/Constraint";
// eslint-disable-next-line no-unused-vars
import RowDataTable from "./TableRowData.vue";
import warningDialogVue from "../dialog/WarningDialog.vue";
import ContextMenu from "../dialog/ContextMenu.vue";
// import axios from "axios";
import { mapActions, mapState } from "vuex";
import { SET_EDITFORM, SET_LIST_DELETE_EMP, SET_MODIFIED_FORM, SET_TITLE_POPUP, STATUS_POPUP } from "@/store/Mutatios.Type";

// import myCheckbox from "../checkbox/myCheckbox.vue";
export default {
  data: function () {
    return {
      recordPerPage: 0,
      //Danh sách nhân viên
      // listEmployees: [],
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
      },
      //Hiển thị context menu
      showContextMenu: false,
      // checked all
      isCheckAll: false,
      //Thông tin và tọa độ của context menu
      infoAndCoord: {
        item: null,
        coord: {},
      },
      refeshData: Function,
    };
  },
  components: {
    contentPagging,
    warningDialogVue,
    ContextMenu,
  },
  props: {
    forceRender: {
      type: Function,
    },
    id: {
      type:String,
    }
  },
  methods: {
    /**
     * Click header checkbox thì check toàn bộ các checkbox và thêm vào mảng 
     * Author : DTANH (01/11/2022)
     */
    clickCheckAll() {
      if (this.isCheckAll) {
        this.listEmployee.forEach((item) => {
          item.isChecked = false;
          this.$store.commit(SET_LIST_DELETE_EMP,[]);
        });
      }
    },

    /**
     * Đưa các id của nhân viên được chọn vào mảng selectedRow
     * @param {string id employee} id
     * Author: DTANH (25/10/2022)
     */
    rowChecked(id) {
      if (this.listDeleteIdEmployee.includes(id)) {
        this.$store.commit(SET_LIST_DELETE_EMP,[
          ...this.listDeleteIdEmployee.filter((item) => item !== id),
        ]);
      } else {
        this.$store.commit(SET_LIST_DELETE_EMP,[
          ...this.listDeleteIdEmployee,
          id,
        ]);
      }
      this.isCheckAll = this.listDeleteIdEmployee.length == this.listEmployee.length;
    },
    
    /**
     * hiện dialog và lấy Id của nhân viên cần xóa
     * @param {string} id
     * Author: DTANH (25/10/2022)
     */
    handleEmitDelete(id) {
      this.showDialogDel.isShow = true;
      this.showDialogDel.id = id;
    },

    /**
     * Đồng ý xóa nhân viên
     * Author: DTANH (25/10/2022)
     */
    handleDeleteTrue() {
      this.deleteOneRecord(this.showDialogDel.id); // console.log("Xóa bản ghi có id là:", );
      this.showDialogDel.isShow = false;
      this.showDialogDel.id = null;
      console.log(this.listEmployees);
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
    ...mapActions(["filterEmployee", "getEmployeeById","deleteEmployee","getAllDepartment"]),
  },

  computed: {
    ...mapState(["listEmployee", "Employee", "listDeleteIdEmployee", "loading","listDepartment"]),
  },

  watch: {
    /**
     * Theo dõi nếu isCheckALl đc check thì tất cả các checkbox trong table được check
     */
    isCheckAll: function () {
      if (this.isCheckAll) {        
        this.listEmployee.forEach((item) => (item.isChecked = true));
        let payload = this.listEmployee.map((item) => item.EmployeeId);
        this.$store.commit(SET_LIST_DELETE_EMP, payload);
      }
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
    document.querySelector(`#${this.id} .wrap-table`).addEventListener("scroll", function (e) {
      console.log(e)
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
  height:50px;
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
