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
            <label for="isCustomer">{{ Text.isCustomer }}</label>
          </div>
          <div class="flex align-center">
            <label
              for="isSuplier"
              class="checkbox__customer employee__checkbox custom-checkbox"
            >
              <input type="checkbox" id="isSuplier" hidden />
              <div class="custom-checkbox-wrap"></div>
            </label>
            <label for="isSuplier">{{ Text.isSuplier }}</label>
          </div>
        </div>
      </div>
      <div class="employee__details flex-col">
        <div class="flex gap-x-16">
          <div class="left__details">
            <inputLabelAndError
              :label="FieldName.employeeCode"
              name="EmployeeCode"
              :placeholderText="placeHolder.employeeCode"
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
              :placeholderText="placeHolder.employeeName"
              @returnValue="returnValue"
              classProps="flex-col grow-1 wrap__textfield"
              :error="error.EmployeeName"
              :valueInput="Employee.EmployeeName"
              ref="EmployeeName"
              required
            ></inputLabelAndError>
            <div class="flex-col w-full wrap__textfield">
              <label for="" class="field__required">????n v???</label>
              <myDropdown
                id="dropdown__department"
                :arrays="listDepartment"
                moveToBot
                @returnDepartments="returnValue"
                :defaultValue="Employee.DepartmentName || 'Ch???n ????n v???'"
                :tabIndex="3"
                :errorMesage="error.DepartmentID"
                ref="DepartmentID"
              ></myDropdown>
              <span
                class="input__text-error"
                :class="{ show: error.DepartmentID }"
              ></span>
            </div>
            <inputLabelAndError
              :label="FieldName.position"
              name="JobPositionName"
              :placeholderText="placeHolder.jobPositionName"
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
              <label for="">Gi???i t??nh</label>
              <div
                class="flex gap-x-20 gender"
                @keydown="changeGenderByKeyDown"
              >
                <div
                  class="flex gap-x-12 align-center"
                  @keydown.enter="chosseGenderByKeydown(GENDER.MALE, 'Nam')"
                >
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
                <div
                  class="flex gap-x-12 align-center"
                  @keydown.enter="chosseGenderByKeydown(GENDER.FEMALE, 'N???')"
                >
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
                      data-label="N???"
                      :checked="Employee.Gender == 0"
                      hidden
                      @click="choseGender"
                    />
                    <div></div>
                  </label>
                  <label for="women">N???</label>
                </div>
                <div
                  class="flex gap-x-12 align-center"
                  @keydown.enter="chosseGenderByKeydown(GENDER.OTHER, 'Kh??c')"
                >
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
                      data-label="Kh??c"
                      hidden
                      :checked="Employee.Gender == 2"
                      @click="choseGender"
                    />
                    <div></div>
                  </label>
                  <label for="other">Kh??c</label>
                </div>
              </div>
            </div>
            <inputLabelAndError
              :label="FieldName.identityNumber"
              name="IdentityNumber"
              tabIndex="6"
              :placeholderText="placeHolder.identityNumber"
              classProps="flex-col  grow-1 wrap__textfield"
              @returnValue="returnValue"
              :valueInput="Employee.IdentityNumber"
              :error="error.IdentityNumber"
              :title="Tooltip.identityNumber"
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
              :placeholderText="placeHolder.identityPlace"
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
          :placeholderText="placeHolder.address"
          :valueInput="Employee.Adress"
          @returnValue="returnValue"
        ></inputLabelAndError>
        <div class="flex gap-x-8">
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              :label="FieldName.telePhoneNumber"
              name="TelephoneNumber"
              :placeholderText="placeHolder.telephoneNumber"
              tabIndex="10"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.TelephoneNumber"
              @returnValue="returnValue"
              :error="error.TelephoneNumber"
              :title="Tooltip.telephoneNumber"
            ></inputLabelAndError>
            <inputLabelAndError
              :label="FieldName.phoneNumber"
              name="PhoneNumber"
              :placeholderText="placeHolder.phoneNumber"
              tabIndex="11"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.PhoneNumber"
              @returnValue="returnValue"
              :error="error.PhoneNumber"
              :title="Tooltip.phoneNumber"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              :label="FieldName.email"
              name="Email"
              :placeholderText="placeHolder.email"
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
              :label="FieldName.bankNumber"
              name="BankNumber"
              tabIndex="13"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankNumber"
              @returnValue="returnValue"
              :error="error.BankNumber"
              :placeholderText="placeHolder.bankNumber"
            ></inputLabelAndError>
            <inputLabelAndError
            :label="FieldName.bankName"
              name="BankName"
              tabIndex="14"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankName"
              @returnValue="returnValue"
              :placeholderText="placeHolder.bankName"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
            :label="FieldName.branchName"
              name="BankBranch"
              tabIndex="15"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankBranch"
              @returnValue="returnValue"
              :placeholderText="placeHolder.branchName"
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
          @click.prevent="closePopup"
          :title="Tooltip.close"
        ></div>
      </div>
    </form>
  </div>
</template>
<script>
// import axios from "axios";
import myButton from "../Button/MyButtonPrimary.vue";
import inputLabelAndError from "../Input/InputLabelAndError.vue";
import myDropdown from "../dropdown/MyDropdown.vue";
import _ from "lodash";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import {
  SET_MODIFIED_FORM,
  SET_ONE_EMPLOYEE,
  STATUS_POPUP,
} from "@/store/Mutatios.Type";
import {
  COLOR,
  MESSAGE_VALIDATE,
  NAME_DISPLAY,
  NAME_PROPERTIES,
  REGEX_NUMBER,
} from "@/config/Common";
import { KEY_CODES, GENDER } from "../../Enums/Enums";
import { TEXT, FIELD_NAME, TOOLTIP, PLACEHOLDER } from "../../resource/ResourceVN";
export default {
  components: {
    myButton,
    inputLabelAndError,
    myDropdown,
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
      GENDER: {},
      Text: TEXT,
      FieldName: FIELD_NAME,
      Tooltip: TOOLTIP,
      color: COLOR,
      placeHolder: PLACEHOLDER,
    };
  },

  methods: {
    closePopup() {
      if (
        !_.isEqual(this.$store.state.Employee, this.$store.state.cloneEmployee)
      ) {
        this.dialogData.dialogShow = true;
        this.dialogData.type = "info";
        this.dialogData.description = this.Text.descriptionDialogChangeData;
        this.dialogData.handleChoseYes = this.handleChoseYes;
        this.dialogData.btnText = this.Text.confirm;
        this.dialogData.btnTextSecondary = this.Text.cancel;
        this.dialogData.btnSecondaryChoseNo = this.Text.deny;
      } else {
        this.handleShowPopup();
      }
    },

    /**
     * Thay ?????i gi???i t???nh b???ng ph??m m??i t??n
     * @param {*} e
     */
    changeGenderByKeyDown(e) {
      if (e.keyCode == KEY_CODES.ARROW_LEFT) {
        console.log(this.$store.state.Employee?.Gender);
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          Gender: +this.$store.state.Employee?.Gender - 1,          
        });
      }
      if (e.keyCode == KEY_CODES.ARROW_RIGHT) {
        console.log(this.$store.state.Employee?.Gender);
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          Gender: +this.$store.state.Employee?.Gender + 1,
        });
      }
    },

    /**
     * Thay ?????i gi???i t??nh b???ng ph??m
     */
    chosseGenderByKeydown(value, name) {
      this.$store.commit(SET_ONE_EMPLOYEE, {
        ...this.$store.state.Employee,
        Gender: Number(value),
        GenderName: name,
      });
    },

    /**
     * X??? l?? khi nh???n c??c ph??m t???t tr??n b??n ph??m
     * Author : DTANH (22/11/2022)
     */
    handleKeyPressPopup(e) {
      if (e.keyCode === KEY_CODES.ESC) {
        this.handleShowPopup();
      }
      if (e.ctrlKey && e.keyCode === KEY_CODES.CTRL_F8) {
        this.handleSaveData();
      }
      if (e.ctrlKey && e.keyCode === KEY_CODES.CTRL_F9) {
        this.handleShowPopup();
      }
    },
    /**
     * x??? l?? khi tab ?????n n??t H???y
     * Author : DTANH (22/11/2022)
     */
    handleLoopFocus() {
      this.$refs.empCode.focus();
    },
    /**
     * n???u ch??? click v??o dropdown v?? ch??a ch???n ????n v??? n??o
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
          !this.checkPropertyExist(
            this.$store.state.Employee,
            NAME_PROPERTIES.EMPLOYEECODE
          )
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
     * Validate m?? nh??n vi??n k???t th??c b???ng s???
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
     * ?????nh d???ng email
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

    /**
     * ?????nh d???ng ng??y th??ng
     * @param {date} value
     */
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
     * Nh???n emit t??? dropdown g???i l??n
     * Author : DTANH (25/10/2022)
     * @param {*} param0
     */
    returnValue({ target, value }) {
      try {
        if (value == "") value = null;
        /**
         * Ki???m tra xem l?? form ch???nh s???a hay l?? form th??m m???i
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
        this.checkPropertyExist(
          this.$store.state.Employee,
          NAME_PROPERTIES.EMPLOYEENAME
        )
      ) {
        this.error.EmployeeName =
          MESSAGE_VALIDATE.MESSAGE_REQUIRED_EMPLOYEE_NAME;
        result = false;
      } else {
        this.error.EmployeeName = null;
      }
      if (
        this.$store.state.Employee?.Email &&
        !this.validateEmail(this.$store.state.Employee?.Email) &&
        this.checkPropertyExist(
          this.$store.state.Employee,
          NAME_PROPERTIES.EMAIL
        )
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
        this.error.BankNumber = MESSAGE_VALIDATE.MESSAGE_ONLYNUMBER(
          NAME_DISPLAY.BANKNUMBER
        );
        result = false;
      } else {
        this.error.BankNumber = null;
      }
      if (
        !this.$store.state.Employee?.DepartmentID &&
        this.checkPropertyExist(
          this.$store.state.Employee,
          NAME_PROPERTIES.DEPARTMENTID
        )
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
     * Xem d??? li???u c?? ????ng ?????nh d???ng hay kh??ng
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
     * validate ????? d??i c???a chu???i nh???p v??o
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
     * ch???n gi???i t??nh
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
     * Ki???m tra c?? ph???i object r???ng hay kh??ng
     * @param {object} obj
     * @returns {boolean}
     * Author : DTANH(31/10/2022)
     */
    checkObjectIsEmpty(obj) {
      return _.isEmpty(obj);
    },

    /**
     * Thay ?????i tr???ng th??i c???a popup (show popup hay hide popup)
     * Author : DTANH(31/10/2022)
     */
    handleShowPopup() {
      this.$store.commit(STATUS_POPUP);
    },
    /**
     * X??? l?? khi ???n n??t c???t
     * Author : DTANH (25/10/2022)
     */
    async handleSaveData() {
      this.validateBeforeSave();
      // debugger;
      // this.validateForm();
      // this.Employee.EmployeeName
      if (!this.$store.state.editForm) {
        if (!this.validateForm()) return;
        if (
          !_.isEqual(
            this.$store.state.Employee,
            this.$store.state.cloneEmployee
          )
        ) {
          this.dialogData.dialogShow = true;
          this.dialogData.type = "info";
          this.dialogData.description = this.Text.descriptionDialogChangeData;
          this.dialogData.handleChoseYes = this.handleChoseYes;
          this.dialogData.btnText = this.Text.confirm;
          this.dialogData.btnTextSecondary = this.Text.cancel;
          this.dialogData.btnSecondaryChoseNo = this.Text.deny;
        }
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
          this.dialogData.description = this.Text.descriptionDialogChangeData;
          this.dialogData.handleChoseYes = this.handleChoseYes;
          this.dialogData.btnText = this.Text.confirm;
          this.dialogData.btnTextSecondary = this.Text.cancel;
          this.dialogData.btnSecondaryChoseNo = this.Text.deny;
        } else {
          this.handleShowPopup();
        }
      }
    },

    /**
     * validate khi click c???t v?? c???t ho???c th??m m?? kh??ng c?? d??? li???u
     * Author : DTANH (25/10/2022)
     */
    validateBeforeSave() {
      let result = true;
      if (
        !this.checkPropertyExist(
          this.$store.state.Employee,
          NAME_PROPERTIES.EMPLOYEENAME
        )
      ) {
        this.error.EmployeeName = MESSAGE_VALIDATE.MESSAGE_REQUIRED_EMPLOYEE_NAME;
        this.$store.commit(SET_ONE_EMPLOYEE, {
          ...this.$store.state.Employee,
          EmployeeName: null,
        });
        result = false;
      } else {
        this.error.EmployeeName = null;
      }
      if (
        !this.checkPropertyExist(
          this.$store.state.Employee,
          NAME_PROPERTIES.DEPARTMENTID
        )
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
     * X??? l?? khi ???n n??t C?? trong popup b??o d??? li???u thay ?????i
     * Author : DTANH (25/10/2022)
     */
    async handleChoseYes() {
      this.validateBeforeSave();
      if (this.editForm) {
        this.$store.dispatch("editEmployee", {
          id: this.$store.state.Employee.EmployeeId,
          data: this.$store.state.Employee,
        });
        this.$store.commit(SET_MODIFIED_FORM, true);
        this.$store.commit("setDialog", {
          dialogShow: false,
          color: this.color.PRIMARY,
        });
      } else {
        // this.$store.dispatch("addEmployee", this.$store.state.Employee);
        await this.$store.dispatch("addEmployee", {
          data: this.$store.state.Employee,
          closePopup: this.validateForm(),
        });
        // this.$store.commit(STATUS_POPUP);
        this.$store.commit(SET_MODIFIED_FORM, true);
        this.$store.commit("setDialog", {
          dialogShow: false,
          color: this.color.PRIMARY,
        });
      }
    },

    /**
     * ????ng popup
     * this.dataShow
     */
    handleClosePopup() {
      this.dialogData.dialogShow = false;
    },

    /**
     * Th??m nh??n vi??n
     * author : DTANH(31/10/2022)
     */
    async handleAddData() {
      await this.$store.dispatch("addEmployee", {
        data: this.$store.state.Employee,
      });
    },

    /**
     * ki???m tra properties c?? t???n t???i trong object hay kh??ng
     * @param {object} obj
     * @param {string} property
     * @returns {boolean}
     * Author : DTANH(31/10/2022)
     */
    checkPropertyExist(obj, property) {
      return hasOwnProperty.call(obj, property);
    },

    ...mapActions(["getAllDepartment", "editEmployee", "addEmployee"]),

    confirmDialog() {
      this.$store.commit("setDialog", {
        dialogShow: false,
      });
      this.$refs[this.focusInput].focus();
    }
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
      "dialogData",
      "focusInput",
    ]),
    ...mapMutations([STATUS_POPUP]),
    ...mapGetters(["getDepartmentNameById", "getNewEmployeeCode"]),
  },

  watch: {
    /**
     * Hi???n dialog khi c?? l???i
     */
    resError: function () {
      this.$store.commit("setDialog", {
        titleDialog: `Th??ng b??o`,
        dialogShow: true,
        type: "warning",
        description: this.resError.errorMsg,
        btnText: "?????ng ??",
        btnTextSecondary: null,
        handleChoseYes: this.confirmDialog,
        btnSecondaryChoseNo : null,
        color: this.color.PRIMARY,
      });
      // console.log("111");
      // if (!_.isEmpty(this.resError)) {
      //   this.dialogData.dialogShow = true;
      //   this.dialogData.type = "warning";
      //   this.dialogData.description = this.resError.errorMsg;
      //   this.dialogData.btnText = "?????ng ??";
      //   this.dialogData.btnTextSecondary = null;
      //   this.dialogData.btnSecondaryChoseNo = null;
      //   this.dialogData.handleChoseYes = this.handleClosePopup;
      // }
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
