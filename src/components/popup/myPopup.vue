<template lang="">
  <div v-if="showPopup" class="pop__up" @keydown="handleKeyPressPopup">
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
            <label for="isCustomer">{{Text.isCustomer}}</label>
          </div>
          <div class="flex align-center">
            <label
              for="isSuplier"
              class="checkbox__customer employee__checkbox custom-checkbox"
            >
              <input type="checkbox" id="isSuplier" hidden />
              <div class="custom-checkbox-wrap"></div>
            </label>
            <label for="isSuplier">{{Text.isSuplier}}</label>
          </div>
        </div>
      </div>
      <div class="employee__details flex-col">
        <div class="flex gap-x-16">
          <div class="left__details">
            <inputLabelAndError
              :label="FieldName.employeeCode"
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
              :label="FieldName.employeeName"
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
                :tabIndex="3"
                :errorMesage="error.DepartmentID"
                v-click-away="onClickAway"
              ></myDropdown>
              <span
                class="input__text-error"
                :class="{ show: error.DepartmentID }"
              ></span>
            </div>
            <inputLabelAndError
              :label="FieldName.position"
              name="JobPositionName"
              placeholderText="Trưởng phòng kinh doanh"
              tabIndex="4"
              classProps="flex-col w-full wrap__textfield"
              @returnValue="returnValue"
            ></inputLabelAndError>
          </div>
          <div class="right__details">
            <inputLabelAndError
              :label="FieldName.dateOfBirth"
              name="DateofBirth"
              tabIndex="5"
              classProps="flex-col w-40 wrap__textfield"
              typeInput="date"
              @returnValue="returnValue"
              :error="error.DateofBirth"
              :valueInput="
                Employee.DateofBirth
                  ? String(Employee.DateofBirth).slice(0, 10)
                  : ''
              "
            ></inputLabelAndError>
            <div class="flex-col wrap__gender wrap__textfield">
              <label for="">Giới tính</label>
              <div class="flex gap-x-20 gender" @keydown="changeGenderByKeyDown">
                <div class="flex gap-x-12 align-center" @keydown.enter="chosseGenderByKeydown(GENDER.MALE,'Nam')">
                  <label
                    for="men"
                    class="flex align-center gap-x-12 custom-radio"
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
                <div class="flex gap-x-12 align-center" @keydown.enter="chosseGenderByKeydown(GENDER.FEMALE,'Nữ')">
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
                <div class="flex gap-x-12 align-center" @keydown.enter="chosseGenderByKeydown(GENDER.OTHER,'Khác')">
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
              :label="FieldName.identityNumber"
              name="IdentityNumber"
              tabIndex="6"
              placeholderText="125816832"
              classProps="flex-col  grow-1 wrap__textfield"
              @returnValue="returnValue"
              :valueInput="Employee.IdentityNumber"
              :error="error.IdentityNumber"
              title="Số Chứng minh nhân dân"
            ></inputLabelAndError>
            <inputLabelAndError
              :label="FieldName.indentityDate"
              name="IdentityDate"
              tabIndex="7"
              typeInput="date"
              classProps="flex-col w-40 wrap__textfield"
              :valueInput="
                Employee.IdentityDate
                  ? String(Employee.IdentityDate).slice(0, 10)
                  : ''
              "
              @returnValue="returnValue"
            ></inputLabelAndError>
            <inputLabelAndError
            :label="FieldName.indentityPlace"
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
          :label="FieldName.address"
          name="Adress"
          tabIndex="9"
          classProps="flex-col w-full wrap__textfield"
          :valueInput="Employee.Adress"
          @returnValue="returnValue"
        ></inputLabelAndError>
        <div class="flex gap-x-8">
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              :label="FieldName.telePhoneNumber"
              name="TelephoneNumber"
              placeholderText="0987654321"
              tabIndex="10"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.TelephoneNumber"
              @returnValue="returnValue"
              :error="error.TelephoneNumber"
              title="Điện thoại di động"
            ></inputLabelAndError>
            <inputLabelAndError
            :label="FieldName.phoneNumber"
              name="PhoneNumber"
              placeholderText="0241234567"
              tabIndex="11"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.PhoneNumber"
              @returnValue="returnValue"
              :error="error.PhoneNumber"
              title="Điện thoại cố định"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
            :label="FieldName.email"
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
              name="BankNumber"
              tabIndex="13"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankNumber"
              @returnValue="returnValue"
              :error="error.BankNumber"
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
              name="BankBranch"
              tabIndex="15"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankBranch"
              @returnValue="returnValue"
            ></inputLabelAndError>
          </div>
        </div>
      </div>
      <div class="employee__button">
        <myButton
          :btnText="Text.cancel"
          isSecondary
          @click.prevent="handleShowPopup"
          @blur="handleLoopFocus"
          :tabIndex="18"
        ></myButton>
        <div class="flex align-center gap-x-12">
          <myButton
          :btnText="Text.save"
            isSecondary
            @click.prevent="handleSaveData"
            :tabIndex="17"
            title="Ctrl+F8"
          ></myButton>
          <myButton
          :btnText="Text.saveAndContinue"
            isPrimary
            typeBtn="submit"
            :tabIndex="16"
          ></myButton>
        </div>
      </div>
      <div class="flex align-item gap-x-16 wrap__question__close">
        <div class="btn__question" :title="Tooltip.info"></div>
        <div
          class="btn__close"
          @click.prevent="handleShowPopup"
          :title="Tooltip.close"
        ></div>
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
  MESSAGE_VALIDATE,
  NAME_DISPLAY,
  NAME_PROPERTIES,
  REGEX_NUMBER,
} from "@/config/Common";
import { KEY_CODES, GENDER } from "../../Enums/Enums";
import { TEXT,FIELD_NAME,TOOLTIP } from "../../resource/ResourceVN"
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
        EmployeeName: null,
        EmployeeCode: null,
        DateofBirth: null,
        DepartmentID: null,
        DepartmentName: null,
        Department: null,
        Email: null,
        IdentityNumber: null,
        TelephoneNumber: null,
        PhoneNumber: null,
        BankNumber: null,
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
      GENDER: {},
      Text: TEXT,
      FieldName: FIELD_NAME,
      Tooltip: TOOLTIP
    };
  },

  methods: {

    changeGenderByKeyDown(e) {
      
      if (e.keyCode == KEY_CODES.ARROW_LEFT) {
        console.log(this.$store.state.Employee?.Gender)
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          Gender: +this.$store.state.Employee?.Gender - 1,
          GenderName: "Nam",
      });
      }
      if (e.keyCode == KEY_CODES.ARROW_RIGHT) {
        console.log(this.$store.state.Employee?.Gender)
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          Gender: +this.$store.state.Employee?.Gender + 1,
          GenderName: "Nam",
      });
      }
    },

    chosseGenderByKeydown(value,name) {
      this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          Gender: Number(value),
          GenderName: name,
      });
    },

    /**
     * Xử lý khi nhấn các phím tắt trên bàn phím
     * Author : DTANH (22/11/2022)
     */
    handleKeyPressPopup(e) {
      if (e.keyCode === KEY_CODES.ESC) {
        this.handleShowPopup();
      }
      if (e.keyCode === KEY_CODES.CTRL_F8) {
        this.handleSaveData();
      }
      if (e.keyCode === KEY_CODES.CTRL_F9) {
        this.handleShowPopup();
      }
    },
    /**
     * xử lý khi tab đến nút Hủy
     * Author : DTANH (22/11/2022)
     */
    handleLoopFocus() {
      this.$refs.empCode.focus();
    },
    /**
     * nếu chỉ click vào dropdown và chưa chọn đơn vị nào
     * @param {bool} isValidate
     */
    /**
     * Submit form     *
     */
    submitForm(e) {
      try {
        let isValid = true;
        e.preventDefault();
        this.validateBeforeSave();
        this.error = {
          EmployeeName: null,
          EmployeeCode: null,
          DateofBirth: null,
          DepartmentID: null,
          DepartmentName: null,
          Department: null,
          Email: null,
          IdentityNumber: null,
          TelephoneNumber: null,
          PhoneNumber: null,
          BankAccountNumber: null,
        };

        if (
          !this.checkPropertyExist(
            this.$store.state.Employee,
            NAME_PROPERTIES.EMPLOYEENAME
          )
        ) {
          this.$store.commit(SET_ONE_EMPLOYEE, {
            ...this.$store.state.Employee,
            EmployeeName: null,
          });
        }
        if (
          !this.checkPropertyExist(this.$store.state.Employee, NAME_PROPERTIES.EMPLOYEECODE)
        ) {
          this.$store.commit(SET_ONE_EMPLOYEE, {
            ...this.$store.state.Employee,
            EmployeeCode: null,
          });
        }

        isValid = this.validateForm();
        if (isValid) {
          this.handleAddData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Validate mã nhân viên kết thúc bằng số
     */
    validateEmployeeCode(value) {
      try {
        let regex = /^\D.*[0-9]$/;
        return regex.test(value);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Định dạng email
     * @param {email} email
     */
    validateEmail(email) {
      try {
        let regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
      } catch (err) {
        console.log(err);
      }
    },

    validateDayOfBirth(value) {
      try {
        let result = new Date(value) - new Date();
        console.log(
          "date",
          result <= 0 && Math.abs(result / 1000 / 60 / 60 / 24 / 365) < 200
        );
        return (
          result <= 0 && Math.abs(result / 1000 / 60 / 60 / 24 / 365) < 200
        );
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * Nhận emit từ dropdown gửi lên
     * Author : DTANH (25/10/2022)
     * @param {*} param0
     */
    returnValue({ target, value }) {
      try {
        if (value == "") value = null;
        /**
         * Kiểm tra xem là form chỉnh sửa hay là form thêm mới
         * Author : DTANH(01/11/2022)
         */
        // if (this.$store.state.editForm) {
        //   if (target == "department") {
        //     this.$store.commit(SET_ONE_EMPLOYEE, {
        //       ...this.$store.state.Employee,
        //       DepartmentID: value.deparmentID,
        //       DepartmentName: value.departmentName,
        //     });
        //   } else {
        //     this.$store.commit(SET_ONE_EMPLOYEE, {
        //       ...this.$store.state.Employee,
        //       [target]: value,
        //     });
        //   }
        // }
        if (target == "department") {
          this.$store.commit(SET_ONE_EMPLOYEE, {
            ...this.$store.state.Employee,
            DepartmentID: value.deparmentID,
            DepartmentName: value.departmentName,
          });
        } else {
          this.$store.commit(SET_ONE_EMPLOYEE, {
            ...this.$store.state.Employee,
            [target]: value,
          });
        }
        this.validateForm();
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * validate form
     * Author : DTANH(01/11/2022)
     */
    validateForm() {
      let result = true;
      if (!this.$store.state.Employee?.EmployeeCode) {
        this.error.EmployeeCode =
          MESSAGE_VALIDATE.MESSAGE_REQUIRED_EMPLOYEE_CODE;
        result = false;
      } else {
        this.error.EmployeeCode = null;
      }
      if (
        !this.$store.state.Employee?.EmployeeName &&
        this.checkPropertyExist(this.$store.state.Employee, NAME_PROPERTIES.EMPLOYEENAME)
      ) {
        this.error.EmployeeName = MESSAGE_VALIDATE.MESSAGE_REQUIRED_EMPLOYEE_NAME;
        result = false;
      } else {
        this.error.EmployeeName = null;
      }
      if (
        this.$store.state.Employee?.Email &&
        !this.validateEmail(this.$store.state.Employee?.Email) &&
        this.checkPropertyExist(this.$store.state.Employee, NAME_PROPERTIES.EMAIL)
      ) {
        this.error.Email = MESSAGE_VALIDATE.MESSAGE_VALIDATE_EMAIL;
        result = false;
      } else {
        this.error.Email = null;
      }
      if (
        this.$store.state.Employee?.IdentityNumber &&
        !this.checkValueWithRegexNumber(
          this.$store.state.Employee?.IdentityNumber
        )
      ) {
        this.error.IdentityNumber = MESSAGE_VALIDATE.MESSAGE_VALIDATE_CMND;
        result = false;
      } else {
        this.error.IdentityNumber = null;
      }
      if (
        this.$store.state.Employee?.TelephoneNumber &&
        !this.checkValueWithRegexNumber(
          this.$store.state.Employee?.TelephoneNumber
        )
      ) {
        this.error.TelephoneNumber =
          MESSAGE_VALIDATE.MESSAGE_VALIDATE_PHONE_NUMBER;
        result = false;
      } else if (
        !this.checkLength(this.$store.state.Employee?.TelephoneNumber, 10)
      ) {
        this.error.TelephoneNumber =
          MESSAGE_VALIDATE.MESSAGE_REQUIRED_PHONE_LENGTH(10);
        result = false;
      } else {
        this.error.TelephoneNumber = null;
      }
      if (
        this.$store.state.Employee?.PhoneNumber &&
        !this.checkValueWithRegexNumber(this.$store.state.Employee?.PhoneNumber)
      ) {
        this.error.PhoneNumber = MESSAGE_VALIDATE.MESSAGE_VALIDATE_PHONE_NUMBER;
        result = false;
      } else if (
        !this.checkLength(this.$store.state.Employee?.PhoneNumber, 11)
      ) {
        this.error.PhoneNumber =
          MESSAGE_VALIDATE.MESSAGE_REQUIRED_PHONE_LENGTH(11);
        result = false;
      } else {
        this.error.PhoneNumber = null;
      }
      if (
        this.$store.state.Employee?.BankNumber &&
        !this.checkValueWithRegexNumber(this.$store.state.Employee?.BankNumber)
      ) {
        this.error.BankNumber =
          MESSAGE_VALIDATE.MESSAGE_ONLYNUMBER(NAME_DISPLAY.BANKNUMBER);
        result = false;
      } else {
        this.error.BankNumber = null;
      }
      if (
        !this.$store.state.Employee?.DepartmentID &&
        this.checkPropertyExist(this.$store.state.Employee, NAME_PROPERTIES.DEPARTMENTID)
      ) {
        this.error.DepartmentID = MESSAGE_VALIDATE.MESSAGE_REQUIRED_DEPARTMENT;
        result = false;
      } else {
        this.error.DepartmentID = null;
      }

      if (
        this.$store.state.Employee?.DateofBirth &&
        !this.validateDayOfBirth(this.$store.state.Employee?.DateofBirth)
      ) {
        this.error.DateofBirth = MESSAGE_VALIDATE.MESSAGE_VALIDATE_DATEOFBIRTH;
        console.log(this.error.DateofBirth);
        result = false;
      } else {
        this.error.DateofBirth = null;
      }

      return result;
    },
    /**
     * Xem dữ liệu có đúng định dạng hay không
     * Author : DTANH(03/11/2022)
     */
    checkValueWithRegexNumber(value) {
      try {
        let regex = REGEX_NUMBER;
        return regex.test(value);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * validate độ dài của chuỗi nhập vào
     * Author : DTANH(03/11/2022)
     */
    checkLength(value, length) {
      try {
        let regex = new RegExp(`^.{0,${length}}$`, "i");
        return regex.test(value);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * chọn giới tính
     * @param {event} e
     * Author : DTANH (25/10/2022)
     */
    choseGender(e) {
      try {
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          Gender: Number(e.target.value),
          GenderName: e.target.dataset.label,
        });
        // this.$store.state.Employee.Gender = e.target.value;
        // this.$store.state.Employee.GenderName = e.target.dataset.label;
        this.$store.commit(SET_MODIFIED_FORM, false);
      } catch (err) {
        console.log(err);
      }
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
     * Author : DTANH (25/10/2022)
     */
    async handleSaveData() {
      this.validateBeforeSave();
      // debugger;
      // this.validateForm();
      // this.Employee.EmployeeName
      if (!this.$store.state.editForm) {
        if (!this.validateForm()) return;
        await this.$store.dispatch("addEmployee", { data: this.$store.state.Employee , closePopup: true});
        
      } else {
        if (!this.validateForm()) return;
        if (
          !_.isEqual(
            this.$store.state.Employee,
            this.$store.state.cloneEmployee
          )
        ) {
          this.dialogData.dialogShow = true;
          this.dialogData.type = "info";
          this.dialogData.description =
            "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?";
          this.dialogData.handleChoseYes = this.handleChoseYes;
          this.dialogData.btnText = "Có";
          this.dialogData.btnTextSecondary = "Hủy";
          this.dialogData.btnSecondaryChoseNo = "Không";
        } else {
          this.handleShowPopup();
        }
      }
    },

    /**
     * validate khi click cất và cất hoặc thêm mà không có dữ liệu
     * Author : DTANH (25/10/2022)
     */
    validateBeforeSave() {
      let result = true;
      if (
        !this.checkPropertyExist(this.$store.state.Employee, NAME_PROPERTIES.EMPLOYEENAME)
      ) {
        this.error.EmployeeName = "Tên nhân viên không được để trống";
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          EmployeeName: null,
        });
        result = false;
      } else {
        this.error.EmployeeName = null;
      }
      if (
        !this.checkPropertyExist(this.$store.state.Employee, NAME_PROPERTIES.DEPARTMENTID)
      ) {
        this.error.DepartmentID = MESSAGE_VALIDATE.MESSAGE_REQUIRED_DEPARTMENT;
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          DepartmentID: null,
        });
        result = false;
      } else {
        this.error.DepartmentID = null;
      }
      return result;
    },

    /**
     * Xử lý khi ấn nút Có trong popup báo dữ liệu thay đổi
     * Author : DTANH (25/10/2022)
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
     * this.dataShow
     */
    handleClosePopup() {
      this.dialogData.dialogShow = false;
    },
    /**
     * Thêm nhân viên
     * author : DTANH(31/10/2022)
     */
    async handleAddData() {
      await this.$store.dispatch("addEmployee", { data : this.$store.state.Employee});
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
      "newEmployeeCode",
    ]),
    ...mapMutations([STATUS_POPUP]),
    ...mapGetters(["getDepartmentNameById", "getNewEmployeeCode"]),
  },

  watch: {
    /**
     * Hiển dialog khi có lỗi
     */
    resError: function () {
      console.log("111")
      if (!_.isEmpty(this.resError)) {
        this.dialogData.dialogShow = true;
        this.dialogData.type = "warning";
        this.dialogData.description = this.resError.errorMsg;
        this.dialogData.btnText = "Đồng ý";
        this.dialogData.btnTextSecondary = null;
        this.dialogData.btnSecondaryChoseNo = null;
        this.dialogData.handleChoseYes = this.handleClosePopup;
      }
    },
  },

  created() {
    this.GENDER = GENDER;
  },
};
</script>
<style lang="css" scoped>
@import url("../../css/component/popup.css");
</style>
