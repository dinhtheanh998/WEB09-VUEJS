<template lang="">
  <div v-if="showPopup" class="pop__up">
    <div class="popup__overlay" @click="handleShowPopup"></div>
    <form action="" class="form__employee" @submit="submitForm">
      <div class="employee__top flex">
        <h2 class="employee__title">{{ titlePopup }}</h2>
        <div class="flex align-center gap-x-32">
          <div class="flex align-center">
            <label
              for="isCustomer"
              class="checkbox__customer employee__checkbox custom-checkbox"
            >
              <input type="checkbox" id="isCustomer" hidden />
              <div class="custom-checkbox-wrap"></div>
            </label>
            <label for="isCustomer">Là khách hàng</label>
          </div>
          <div class="flex align-center">
            <label
              for="isSuplier"
              class="checkbox__customer employee__checkbox custom-checkbox"
            >
              <input type="checkbox" id="isSuplier" hidden />
              <div class="custom-checkbox-wrap"></div>
            </label>
            <label for="isSuplier">Là nhà cung cấp</label>
          </div>
        </div>
      </div>
      <div class="employee__details flex-col">
        <div class="flex gap-x-16">
          <div class="left__details">
            <inputLabelAndError
              label="Mã nhân viên"
              name="EmployeeCode"
              placeholderText="MNV01"
              tabIndex="1"
              classProps="flex-col w-40 wrap__textfield"
              @returnValue="returnValue"
              ref="empCode"
              :error="error.EmployeeCode"
              :valueInput="Employee.EmployeeCode"
              required
              :autoforcus="true"
            ></inputLabelAndError>
            <inputLabelAndError
              label="Tên nhân viên"
              name="EmployeeName"
              tabIndex="2"
              placeholderText="Nguyễn Văn A"
              @returnValue="returnValue"
              classProps="flex-col grow-1 wrap__textfield"
              :error="error.EmployeeName"
              :valueInput="Employee.EmployeeName"
              required
            ></inputLabelAndError>
            <div class="flex-col w-full wrap__textfield">
              <label for="" class="field__required">Đơn vị</label>
              <myDropdown
                id="dropdown__department"
                :arrays="listDepartment"
                moveToBot
                @returnDepartments="returnValue"
                :defaultValue="Employee.DepartmentName || 'Chọn đơn vị'"
              ></myDropdown>
              <span class="input__text-error">{{ error.Department }}</span>
            </div>
            <inputLabelAndError
              label="Chức danh"
              name="EmployeeCode"
              placeholderText="Trưởng phòng kinh doanh"
              tabIndex="4"
              classProps="flex-col w-full wrap__textfield"
              @returnValue="returnValue"
            ></inputLabelAndError>
          </div>
          <div class="right__details">
            <inputLabelAndError
              label="Ngày sinh"
              name="DateOfBirth"
              tabIndex="5"
              classProps="flex-col w-40 wrap__textfield"
              typeInput="date"
              @returnValue="returnValue"
              :error="error.DayOfBirth"
              :valueInput="
                Employee.DateOfBirth
                  ? String(Employee.DateOfBirth).slice(0, 10)
                  : ''
              "
            ></inputLabelAndError>
            <div class="flex-col wrap__gender wrap__textfield">
              <label for="">Giới tính</label>
              <div class="flex gap-x-16 gender">
                <div class="flex gap-x-8 align-center">
                  <label
                    for="men"
                    class="flex align-center gap-x-8 custom-radio"
                    tabindex="6"
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="men"
                      value="1"
                      data-label="Nam"
                      hidden
                      :checked="Employee.Gender == 1"
                      @click="choseGender"
                    />
                    <div></div>
                  </label>
                  <label for="men">Nam</label>
                </div>
                <div class="flex gap-x-8 align-center">
                  <label
                    for="women"
                    class="flex align-center gap-x-8 custom-radio"
                    tabindex="6"
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="women"
                      value="0"
                      data-label="Nữ"
                      :checked="Employee.Gender == 0"
                      hidden
                      @click="choseGender"
                    />
                    <div></div>
                  </label>
                  <label for="women">Nữ</label>
                </div>
                <div class="flex gap-x-8 align-center">
                  <label
                    for="other"
                    class="flex align-center gap-x-8 custom-radio"
                    tabindex="6"
                  >
                    <input
                      type="radio"
                      name="gender"
                      id="other"
                      value="2"
                      data-label="Khác"
                      hidden
                      :checked="Employee.Gender == 2"
                      @click="choseGender"
                    />
                    <div></div>
                  </label>
                  <label for="other">Khác</label>
                </div>
              </div>
            </div>
            <inputLabelAndError
              label="Số CMND"
              name="identityNumber"
              tabIndex="6"
              placeholderText="125816832"
              classProps="flex-col  grow-1 wrap__textfield"
              @returnValue="returnValue"
              :valueInput="Employee.IdentityNumber"
            ></inputLabelAndError>
            <inputLabelAndError
              label="Ngày cấp"
              name="IdentityDate"
              tabIndex="7"
              typeInput="date"
              classProps="flex-col grow-1 wrap__textfield"
              :valueInput="
                Employee.IdentityDate
                  ? String(Employee.IdentityDate).slice(0, 10)
                  : ''
              "
              @returnValue="returnValue"
            ></inputLabelAndError>
            <inputLabelAndError
              label="Nơi cấp"
              name="IdentityPlace"
              tabIndex="8"
              placeholderText="Bắc Ninh"
              classProps="flex-col w-full wrap__textfield"
              :valueInput="Employee.IdentityPlace"
              @returnValue="returnValue"
            ></inputLabelAndError>
          </div>
        </div>
        <inputLabelAndError
          label="Địa chỉ"
          name="Address"
          tabIndex="9"
          classProps="flex-col w-full wrap__textfield"
          :valueInput="Employee.Address"
          @returnValue="returnValue"
        ></inputLabelAndError>
        <div class="flex gap-x-8">
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="ĐT di động"
              name="TelephoneNumber"
              placeholderText="0987654321"
              tabIndex="10"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.TelephoneNumber"
              @returnValue="returnValue"
            ></inputLabelAndError>
            <inputLabelAndError
              label="ĐT cố định"
              name="PhoneNumber"
              placeholderText="0241234567"
              tabIndex="11"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.PhoneNumber"
              @returnValue="returnValue"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="Email"
              name="Email"
              placeholderText="company@gmail.com"
              tabIndex="12"
              classProps="flex-col w-50 wrap__textfield"
              @returnValue="returnValue"
              :error="error.Email"
              :valueInput="Employee.Email"
              
            ></inputLabelAndError>
          </div>
        </div>
        <div class="flex gap-x-8">
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="Tài khoản ngân hàng"
              name="BankAccountNumber"
              tabIndex="13"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankAccountNumber"
              @returnValue="returnValue"
            ></inputLabelAndError>
            <inputLabelAndError
              label="Tên ngân hàng"
              name="BankName"
              tabIndex="14"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankName"
              @returnValue="returnValue"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="Chi nhánh"
              name="BankBranchName"
              tabIndex="15"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankBranchName"
              @returnValue="returnValue"
            ></inputLabelAndError>
          </div>
        </div>
      </div>
      <div class="employee__button">
        <myButton
          btnText="Hủy"
          isSecondary
          @click.prevent="handleShowPopup"
        ></myButton>
        <div class="flex align-center gap-x-12">
          <myButton
            btnText="Cất"
            isSecondary
            @click.prevent="handleSaveData"
          ></myButton>
          <myButton btnText="Cất và thêm" isPrimary typeBtn="submit"></myButton>
        </div>
      </div>
      <div class="flex align-item gap-x-16 wrap__question__close">
        <div class="btn__question"></div>
        <div class="btn__close" @click.prevent="handleShowPopup"></div>
      </div>
    </form>
    <Teleport to="body">
      <warningDialogVue
        v-if="dialogData.dialogShow"
        :description="dialogData.description"
        :type="dialogData.type"
        zIndex="true"
        :btnTextPrimary="dialogData.btnText"
        :handleDeleteTrue="
          () => {
            dialogData.dialogShow = false;
          }
        "
      />
    </Teleport>
  </div>
</template>
<script>
// import axios from "axios";
import myButton from "../Button/myButtonPrimary.vue";
import inputLabelAndError from "../Input/inputLabelAndError.vue";
import myDropdown from "../dropdown/myDropdown.vue";
import warningDialogVue from "../dialog/warningDialog.vue";
import _ from "lodash";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { SET_MODIFIED_FORM, SET_ONE_EMPLOYEE, STATUS_POPUP } from "@/store/Mutatios.Type";
import { MESSAGE_REQUIRED_EMPLOYEE_CODE, MESSAGE_REQUIRED_EMPLOYEE_NAME, MESSAGE_VALIDATE_EMAIL } from "@/config/Constraint";
export default {
  components: {
    myButton,
    inputLabelAndError,
    myDropdown,
    warningDialogVue,
  },

  data: function () {
    return {
      error: {
        EmployeeName: "",
        EmployeeCode: "",
        DateofBirth: "",
        DepartmentId: "",
        DepartmentName: "",
        Email: "",
      },
      dialogData: {
        dialogShow: false,
        type: "warning",
        description: "Bạn chưa thay đổi thông tin nào",
        btnText: "Xác nhận",
        btnCancelText: "Hủy",
      },
    };
  },

  methods: {
    submitForm(e) {
      let isValid = true;
      this.error = {
        EmployeeName: "",
        EmployeeCode: "",
        DateofBirth: "",
        DepartmentId: "",
        DepartmentName: "",
        Email: "",
      };
      e.preventDefault();
      // validate form
      if (!this.$store.state.Employee?.EmployeeName) {
        this.error.EmployeeName = "Vui lòng nhập tên nhân viên";
        isValid = false;
      }
      if (!this.$store.state.Employee?.EmployeeCode) {
        this.error.EmployeeCode = "Vui lòng nhập mã nhân viên";
        isValid = false;
      } else if (this.$store.state.Employee?.EmployeeCode.length < 6) {
        this.error.EmployeeCode = "Mã nhân viên phải có ít nhất 6 ký tự";
        isValid = false;
      } else if (this.$store.state.Employee?.EmployeeCode.length > 20) {
        this.error.EmployeeCode = "Mã nhân viên không được quá 20 ký tự";
        isValid = false;
      } else if (
        !this.validateEmployeeCode(this.$store.state.Employee?.EmployeeCode)
      ) {
        this.error.EmployeeCode =
          "Mã nhân viên bắt đầu bằng chữ và kết thúc là số";
        isValid = false;
      }
      if (
        this.$store.state.Employee?.Email &&
        !this.validateEmail(this.$store.state.Employee?.Email)
      ) {
        this.error.Email = "Vui lòng nhập đúng định dạng của email";
        isValid = false;
      }
      if (
        this.$store.state.Employee?.DateofBirth &&
        this.validateDayOfBirth(this.$store.state.Employee?.DateofBirth)
      ) {
        this.error.DateofBirth = "Ngày sinh phải nhỏ hơn ngày hiện tại";
        isValid = false;
      }
      if (isValid) {
        this.handleAddData();
        // this.$store.dispatch("addEmployee", this.$store.state.Employee);
        console.log(_.isEmpty(this.resError));
      }

      // call api
      this.validateEmail(this.$store.state.Employee?.Email);
      // axios.post("https://amis.manhnv.net/api/v1/Employees", this.$store.sate.Employee).then((res) => {
      //   if(res.status === 201) {
      //     this.$props.handlePopup();
      //     this.reloadData();
      //   }
      //   console.log(res);
      // }).catch((err) => {
      //   console.log(err);
      // });
      // close popup
    },

    validateEmployeeCode(value) {
      let regex = /^\D.*[0-9]$/;
      return regex.test(value);
    },

    validateEmail(email) {
      let regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    },

    validateDayOfBirth(value) {
      let result = new Date(value) - new Date();
      return result <= 0;
    },

    returnValue({ target, value }) {
      /**
       * Kiểm tra xem là form chỉnh sửa hay là form thêm mới
       * Author : DTANH(01/11/2022)
       */
      if (this.$store.state.editForm) {
        if (target == "department") {
          this.$store.commit(SET_ONE_EMPLOYEE, {
            ...this.$store.state.Employee,
            DepartmentId: value.deparmentID,
            DepartmentName: value.departmentName,
          });
        } else {
          this.$store.commit(SET_ONE_EMPLOYEE, {
            ...this.$store.state.Employee,
            [target]: value,
          });
          // this.$store.state.Employee[target] = value;
        }
      } else {
        if (target == "department") {
          this.$store.commit(SET_ONE_EMPLOYEE, {
            ...this.$store.state.Employee,
            DepartmentId: value.deparmentID,
            DepartmentName: value.departmentName,
          });
        } else {
          this.$store.commit(SET_ONE_EMPLOYEE, {
            ...this.$store.state.Employee,
            [target]: value,
          });
        }
      }

      if (!this.$store.state.Employee?.EmployeeCode) {
        this.error.EmployeeCode = MESSAGE_REQUIRED_EMPLOYEE_CODE;
      } else {
        this.error.EmployeeCode = "";
      }

      if (
        !this.$store.state.Employee?.EmployeeName &&
        this.checkPropertyExist(this.$store.state.Employee, "EmployeeName")
      ) {
        this.error.EmployeeName = MESSAGE_REQUIRED_EMPLOYEE_NAME;
      } else {
        this.error.EmployeeName = "";
      }
      if (
        this.$store.state.Employee?.Email &&
        !this.validateEmail(this.$store.state.Employee?.Email) &&
        this.checkPropertyExist(this.$store.state.Employee, "Email")
      ) {
        this.error.Email = MESSAGE_VALIDATE_EMAIL;
      } else {
        this.error.Email = "";
      }
    },

    /**
     * chọn giới tính
     * @param {event} e
     */
    choseGender(e) {
      this.$store.commit(SET_ONE_EMPLOYEE, {
        ...this.$store.state.Employee,
        Gender: e.target.value,
        GenderName: e.target.dataset.label,
      });
      // this.$store.state.Employee.Gender = e.target.value;
      // this.$store.state.Employee.GenderName = e.target.dataset.label;
      this.$store.commit(SET_MODIFIED_FORM, false);
    },

    /**
     * Kiểm tra có phải object rỗng hay không
     * @param {object} obj
     * @returns {boolean}
     * Author : DTANH(31/10/2022)
     */
    checkObjectIsEmpty(obj) {
      return _.isEmpty(obj);
    },

    /**
     * Thay đổi trạng thái của popup (show popup hay hide popup)
     * Author : DTANH(31/10/2022)
     */
    handleShowPopup() {
      this.$store.commit(STATUS_POPUP);
    },
    /**
     * Xử lý khi ấn nút cất
     */
    handleSaveData() {
      if (this.modifiedForm) {
        this.dialogData.dialogShow = true;
        this.dialogData.description = "Bạn chưa thực hiện thay đổi nào";
      } else {
        if (this.editForm) {
          this.$store.dispatch("editEmployee", {
            id: this.$store.state.Employee.EmployeeId,
            data: this.$store.state.Employee,
          });
          this.$store.commit(SET_MODIFIED_FORM, true);
        } else {
          this.$store.dispatch("addEmployee", this.$store.state.Employee);
          this.$store.commit(SET_MODIFIED_FORM, true);
        }
      }
    },
    /**
     * lấy tên department theo id
     */
    async handleAddData() {
      await this.$store.dispatch("addEmployee", this.$store.state.Employee);
    },

    /**
     * kiểm tra properties có tồn tại trong object hay không
     * @param {object} obj
     * @param {string} property
     * @returns {boolean}
     * Author : DTANH(31/10/2022)
     */
    checkPropertyExist(obj, property) {
      return hasOwnProperty.call(obj, property);
    },
    ...mapActions(["getAllDepartment", "editEmployee", "addEmployee"]),
  },

  computed: {
    ...mapState([
      "listDepartment",
      "showPopup",
      "Employee",
      "titlePopup",
      "modifiedForm",
      "formEmp",
      "resError",
      "editForm",
    ]),
    ...mapMutations([STATUS_POPUP]),
    ...mapGetters(["getDepartmentNameById"]),
  },

  mounted() {
    this.$refs.empCode.$el.querySelector("input[type=text]").focus();
    this.getAllDepartment();
  },

  watch: {
    resError: function () {
      if (!_.isEmpty(this.resError)) {
        this.dialogData.dialogShow = true;
        this.dialogData.description = this.resError.errorMsg;
      }
    },
  },
};
</script>
<style lang="css" scoped>
@import url("../../css/component/popup.css");
</style>
