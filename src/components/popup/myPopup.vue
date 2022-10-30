<template lang="">
  <div v-show="showPopup" class="pop__up">
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
                :defaultValue="Employee.DepartmentId"
              ></myDropdown>
              <span class="input__text-error">{{ error.Department }}</span>
            </div>
            <inputLabelAndError
              label="Chức danh"
              name="EmployeeCode"
              placeholderText="Trưởng phòng kinh doanh"
              tabIndex="1"
              classProps="flex-col w-full wrap__textfield"
              @returnValue="returnValue"
              :error="error.EmployeeCode"
            ></inputLabelAndError>
          </div>
          <div class="right__details">
            <inputLabelAndError
              label="Ngày sinh"
              name="DateOfBirth"
              tabIndex="1"
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
              tabIndex="1"
              placeholderText="125816832"
              classProps="flex-col  grow-1 wrap__textfield"
              @returnValue="returnValue"
              :valueInput="Employee.IdentityNumber"
            ></inputLabelAndError>
            <inputLabelAndError
              label="Ngày cấp"
              name="identityDate"
              tabIndex="1"
              typeInput="date"
              classProps="flex-col grow-1 wrap__textfield"
              :valueInput="
                Employee.IdentityDate
                  ? String(Employee.IdentityDate).slice(0, 10)
                  : ''
              "
            ></inputLabelAndError>
            <inputLabelAndError
              label="Nơi cấp"
              name="EmployeeCode"
              tabIndex="1"
              placeholderText="Bắc Ninh"
              classProps="flex-col w-full wrap__textfield"
              :valueInput="Employee.IdentityPlace"
            ></inputLabelAndError>
          </div>
        </div>
        <inputLabelAndError
          label="Địa chỉ"
          name="EmployeeCode"
          tabIndex="1"
          classProps="flex-col w-full wrap__textfield"
          :valueInput="Employee.Address"
        ></inputLabelAndError>
        <div class="flex gap-x-8">
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="ĐT di động"
              name="EmployeeCode"
              placeholderText="0987654321"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.TelephoneNumber"
            ></inputLabelAndError>
            <inputLabelAndError
              label="ĐT cố định"
              name="EmployeeCode"
              placeholderText="0241234567"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.PhoneNumber"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="Email"
              name="Email"
              placeholderText="company@gmail.com"
              tabIndex="1"
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
              name="EmployeeCode"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankAccountNumber"
            ></inputLabelAndError>
            <inputLabelAndError
              label="Tên ngân hàng"
              name="EmployeeCode"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankName"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="Chi nhánh"
              name="EmployeeCode"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
              :valueInput="Employee.BankBranchName"
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
  </div>
</template>
<script>
// import axios from "axios";
import myButton from "../Button/myButtonPrimary.vue";
import inputLabelAndError from "../Input/inputLabelAndError.vue";
import myDropdown from "../dropdown/myDropdown.vue";
import _ from "lodash";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  components: {
    myButton,
    inputLabelAndError,
    myDropdown,
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
    };
  },
  props: {
    reloadData: {
      type: Function,
    },
    infoEmployee: {
      type: Object,
    },
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
      }
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

      } else if (!this.validateEmployeeCode(this.$store.state.Employee?.EmployeeCode)) {
        this.error.EmployeeCode =
          "Mã nhân viên bắt đầu bằng chữ và kết thúc là số";
        isValid = false;

      }
      if (this.$store.state.Employee?.Email && !this.validateEmail(this.$store.state.Employee?.Email)) {
        this.error.Email = "Vui lòng nhập đúng định dạng của email";
        isValid = false;
      }
      if (isValid) {
        this.$store.dispatch("addEmployee", this.$store.state.Employee);
      }
      // call api
      this.validateEmail(this.$store.state.Employee?.Email);
      console.log(this.$store.state.Employee);
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
    returnValue({ target, value }) {
      console.log({ target, value });
      console.log(target == 'department')
      if (!this.$store.state.editForm) {
        if (target == 'department') {
          this.$store.state.Employee.DepartmentId = value.deparmentID;
          this.$store.state.Employee.DepartmentName = value.departmentName;
        } else {          
          this.$store.state.Employee[target] = value;
        }        
      }
    },
    choseGender(e) {
      this.$store.state.Employee.Gender = e.target.value;
      this.$store.state.Employee.GenderName = e.target.dataset.label;
      this.$store.commit("setModifiedForm",false)
    },
    checkObjectIsEmpty(obj) {
      return _.isEmpty(obj);
    },
    handleShowPopup() {
      this.$store.commit("setShowPopup");
    },
    handleSaveData() {
      if (this.modifiedForm) {
        console.log("Chưa chỉnh sửa gì trong form");
      } else {
        this.$store.dispatch("editEmployee", {
          id: this.$store.state.Employee.EmployeeId,
          data: this.$store.state.Employee,
        });
      }
    },
    ...mapActions(["getAllDepartment", "editEmployee","addEmployee"]),
  },
  created() {},
  computed: {
    ...mapState([
      "listDepartment",
      "showPopup",
      "Employee",
      "titlePopup",
      "modifiedForm",
      "formEmp",
    ]),
    ...mapMutations(["setShowPopup"]),
  },
  mounted() {
    this.$refs.empCode.$el.querySelector("input[type=text]").focus();
    this.getAllDepartment();
  },
};
</script>
<style lang="css" scoped>
@import url("../../css/component/popup.css");
</style>
