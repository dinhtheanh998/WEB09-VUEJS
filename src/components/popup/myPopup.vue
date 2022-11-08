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
                :isValidate="error?.DepartmentId"
                @click="clickDepartment"
              ></myDropdown>
              <span
                class="input__text-error"
                :class="{ show: error.DepartmentId }"
                >{{ error.DepartmentId }}</span
              >
            </div>
            <inputLabelAndError
              label="Chức danh"
              name="Position"
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
              name="IdentityNumber"
              tabIndex="6"
              placeholderText="125816832"
              classProps="flex-col  grow-1 wrap__textfield"
              @returnValue="returnValue"
              :valueInput="Employee.IdentityNumber"
              :error="error.IdentityNumber"
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
              :error="error.TelephoneNumber"
            ></inputLabelAndError>
            <inputLabelAndError
              label="ĐT cố định"
              name="PhoneNumber"
              placeholderText="0241234567"
              tabIndex="11"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.PhoneNumber"
              @returnValue="returnValue"
              :error="error.PhoneNumber"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="Email"
              name="Email"
              placeholderText="company@example.com"
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
              :error="error.BankAccountNumber"
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
    </Teleport>
  </div>
</template>
<script>
// import axios from "axios";
import myButton from "../Button/MyButtonPrimary.vue";
import inputLabelAndError from "../Input/InputLabelAndError.vue";
import myDropdown from "../dropdown/MyDropdown.vue";
import warningDialogVue from "../dialog/WarningDialog.vue";
import _ from "lodash";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import {
  SET_MODIFIED_FORM,
  SET_ONE_EMPLOYEE,
  STATUS_POPUP,
} from "@/store/Mutatios.Type";
import {
  MESSAGE_REQUIRED_EMPLOYEE_CODE,
  MESSAGE_REQUIRED_EMPLOYEE_NAME,
  MESSAGE_REQUIRED_PHONE_LENGTH,
  MESSAGE_VALIDATE_CMND,
  MESSAGE_VALIDATE_EMAIL,
  MESSAGE_VALIDATE_PHONE_NUMBER,
  REGEX_NUMBER,
} from "@/config/Constraint";
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
        Department: "",
        Email: "",
        IdentityNumber: "",
        TelephoneNumber: "",
        PhoneNumber: "",
        BankAccountNumber: "",
      },
      dialogData: {
        dialogShow: false,
        type: "",
        description: "",
        btnText: "Có",
        btnTextSecondary: "Hủy",
        btnSecondaryChoseNo: "Không",
        handleChoseYes: "",
      },
    };
  },

  methods: {
    clickDepartment() {
      if (
        !this.checkPropertyExist(this.Employee, "DepartmentId") ||
        !this.Employee.DepartmentId
      ) {
        // this.$store.commit(SET_ONE_EMPLOYEE, {
        //   ...this.$store.state.Employee,
        //   DepartmentId: '',
        // })
        this.error.DepartmentId = "Vui lòng chọn phòng ban";
      } else {
        this.error.DepartmentId = "";
      }
    },

    submitForm(e) {
      let isValid = true;
      e.preventDefault();

      this.error = {
        EmployeeName: "",
        EmployeeCode: "",
        DateofBirth: "",
        DepartmentId: "",
        DepartmentName: "",
        Email: "",
      };
      console.log("Kiểm tra EmplpyeeName",this.checkPropertyExist(this.$store.state.Employee, "EmployeeName"))
      if (!this.checkPropertyExist(this.$store.state.Employee, "EmployeeName")) {
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          EmployeeName: "",
        })
      }
      if(!this.checkPropertyExist(this.$store.state.Employee, "EmployeeCode") ) {
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          EmployeeCode: "",
        })
      }


      isValid = this.validateForm();
      if (isValid) {
        this.handleAddData();
        // this.$store.dispatch("addEmployee", this.$store.state.Employee);
        // console.log(_.isEmpty(this.resError));
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

    /**
     * Định dạng email
     * @param {email} email 
     */
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
      }
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
      this.validateForm();
    },

    /**
     * validate form
     * Author : DTANH(01/11/2022)
     */
    validateForm() {
      let result = true;
      if (!this.$store.state.Employee?.EmployeeCode) {
        this.error.EmployeeCode = MESSAGE_REQUIRED_EMPLOYEE_CODE;
        result = false;
      } else {
        this.error.EmployeeCode = "";
      }

      if (
        !this.$store.state.Employee?.EmployeeName &&
        this.checkPropertyExist(this.$store.state.Employee, "EmployeeName")
      ) {
        this.error.EmployeeName = MESSAGE_REQUIRED_EMPLOYEE_NAME;
        result = false;
      } else {
        this.error.EmployeeName = "";
      }
      if (
        this.$store.state.Employee?.Email &&
        !this.validateEmail(this.$store.state.Employee?.Email) &&
        this.checkPropertyExist(this.$store.state.Employee, "Email")
      ) {
        this.error.Email = MESSAGE_VALIDATE_EMAIL;
        result = false;
      } else {
        this.error.Email = "";
      }
      if (
        this.$store.state.Employee?.IdentityNumber &&
        !this.checkValueWithRegexNumber(
          this.$store.state.Employee?.IdentityNumber
        )
      ) {
        this.error.IdentityNumber = MESSAGE_VALIDATE_CMND;
        result = false;
      } else {
        this.error.IdentityNumber = "";
      }
      if (
        this.$store.state.Employee?.TelephoneNumber &&
        !this.checkValueWithRegexNumber(
          this.$store.state.Employee?.TelephoneNumber
        )
      ) {
        this.error.TelephoneNumber = MESSAGE_VALIDATE_PHONE_NUMBER;
        result = false;
      } else if (
        !this.checkLength(this.$store.state.Employee?.TelephoneNumber, 10)
      ) {
        this.error.TelephoneNumber = MESSAGE_REQUIRED_PHONE_LENGTH;
        result = false;
      } else {
        this.error.TelephoneNumber = "";
      }
      if (
        this.$store.state.Employee?.PhoneNumber &&
        !this.checkValueWithRegexNumber(this.$store.state.Employee?.PhoneNumber)
      ) {
        this.error.PhoneNumber = MESSAGE_VALIDATE_PHONE_NUMBER;
        result = false;
      } else if (
        !this.checkLength(this.$store.state.Employee?.PhoneNumber, 11)
      ) {
        this.error.PhoneNumber = "Điên thoại cố định tối đa 11 số";
        result = false;
      } else {
        this.error.PhoneNumber = "";
      }
      if (
        this.$store.state.Employee?.BankAccountNumber &&
        !this.checkValueWithRegexNumber(
          this.$store.state.Employee?.BankAccountNumber
        )
      ) {
        this.error.BankAccountNumber = "Số tài khoản phải là số";
        result = false;
      } else {
        this.error.BankAccountNumber = "";
      }
      if (
        !this.$store.state.Employee?.DepartmentId &&
        this.checkPropertyExist(this.$store.state.Employee, "DepartmentId")
      ) {
        this.error.DepartmentId = "Hãy chọn ít nhất 1 đơn vị";
        result = false;
      } else {
        this.error.DepartmentId = "";
      }
      return result;
    },
    /**
     * Xem dữ liệu có đúng định dạng hay không
     * Author : DTANH(03/11/2022)
     */
    checkValueWithRegexNumber(value) {
      let regex = REGEX_NUMBER;
      return regex.test(value);
    },

    /**
     * validate độ dài của chuỗi nhập vào
     * Author : DTANH(03/11/2022)
     */
    checkLength(value, length) {
      let regex = new RegExp(`^.{0,${length}}$`, "i");
      return regex.test(value);
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
      // debugger;
      // this.validateForm();
      // this.Employee.EmployeeName
      if (!this.validateForm()) return;
      if (
        !_.isEqual(this.$store.state.Employee, this.$store.state.cloneEmployee)
      ) {
        this.dialogData.dialogShow = true;
        this.dialogData.type = "info";
        this.dialogData.description =
          "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?";
        this.dialogData.handleChoseYes = this.handleChoseYes;
      } else {
        this.handleShowPopup();
        // if (this.editForm) {
        //   this.$store.dispatch("editEmployee", {
        //     id: this.$store.state.Employee.EmployeeId,
        //     data: this.$store.state.Employee,
        //   });
        //   this.$store.commit(SET_MODIFIED_FORM, true);
        // } else {
        //   this.$store.dispatch("addEmployee", this.$store.state.Employee);
        //   this.$store.commit(STATUS_POPUP);
        //   this.$store.commit(SET_MODIFIED_FORM, true);
        // }
      }
    },

    /**
     * Xử lý khi ấn nút Có trong popup báo dữ liệu thay đổi
     */
    handleChoseYes() {
      if (this.editForm) {
        this.$store.dispatch("editEmployee", {
          id: this.$store.state.Employee.EmployeeId,
          data: this.$store.state.Employee,
        });
        this.$store.commit(SET_MODIFIED_FORM, true);
      } else {
        this.$store.dispatch("addEmployee", this.$store.state.Employee);
        this.$store.commit(STATUS_POPUP);
        this.$store.commit(SET_MODIFIED_FORM, true);
      }
    },
    /**
     * Đóng popup
     */
    handleClosePopup() {
      this.dialogData.dialogShow = false;
    },
    /**
     * Thêm nhân viên
     * author : DTANH(31/10/2022)
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
      "cloneEmployee",
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
        this.dialogData.type = "warning";
        this.dialogData.description = this.resError.errorMsg;
        this.dialogData.btnText = "Đồng ý";
        this.dialogData.btnTextSecondary = null;
        this.dialogData.btnSecondaryChoseNo = null;
        this.dialogData.handleChoseYes = this.handleClosePopup
      }
    },
  },
};
</script>
<style lang="css" scoped>
@import url("../../css/component/popup.css");
</style>
