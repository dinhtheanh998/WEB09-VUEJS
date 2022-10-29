<template lang="">
  <div v-if="isShow" class="pop__up">
    <div class="popup__overlay" @click="handlePopup"></div>
    <form action="" class="form__employee" @submit="submitForm">
      <div class="employee__top flex">
        <h2 class="employee__title">Thông tin nhân viên</h2>
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
              required
            ></inputLabelAndError>
            <div class="flex-col w-full wrap__textfield">
              <label for="" class="field__required">Đơn vị</label>
              <myDropdown
                id="dropdown__department"
                :arrays="listDepartment"
                moveToBot
                @returnDepartments="returnValue"
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
                      value="0"
                      data-label="Nam"
                      hidden
                      checked
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
                      value="1"
                      data-label="Nữ"
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
            ></inputLabelAndError>
            <inputLabelAndError
              label="Ngày cấp"
              name="identityDate"
              tabIndex="1"
              typeInput="date"
              classProps="flex-col grow-1 wrap__textfield"
            ></inputLabelAndError>
            <inputLabelAndError
              label="Nơi cấp"
              name="EmployeeCode"
              tabIndex="1"
              placeholderText="Bắc Ninh"
              classProps="flex-col w-full wrap__textfield"
            ></inputLabelAndError>
          </div>
        </div>
        <inputLabelAndError
          label="Địa chỉ"
          name="EmployeeCode"
          tabIndex="1"
          classProps="flex-col w-full wrap__textfield"
        ></inputLabelAndError>
        <div class="flex gap-x-8">
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="ĐT di động"
              name="EmployeeCode"
              placeholderText="0987654321"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
            ></inputLabelAndError>
            <inputLabelAndError
              label="ĐT cố định"
              name="EmployeeCode"
              placeholderText="0241234567"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
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
            ></inputLabelAndError>
            <inputLabelAndError
              label="Tên ngân hàng"
              name="EmployeeCode"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
            ></inputLabelAndError>
          </div>
          <div class="flex align-center w-full gap-x-8">
            <inputLabelAndError
              label="Chi nhánh"
              name="EmployeeCode"
              tabIndex="1"
              classProps="flex-col w-50 wrap__textfield"
            ></inputLabelAndError>          
          </div>          
        </div>
      </div>
      <div class="employee__button">
        <myButton btnText="Hủy" isSecondary  @click.prevent="handlePopup"></myButton>
        <div class="flex align-center gap-x-12">
          <myButton btnText="Cất" isSecondary></myButton>
          <myButton btnText="Cất và thêm" isPrimary></myButton>
        </div>
      </div>
      <div class="flex align-item gap-x-16 wrap__question__close">
        <div class="btn__question"></div>
        <div class="btn__close" @click="handlePopup"></div>
      </div>
    </form>
  </div>
</template>
<script>
// import axios from "axios";
import myButton from "../Button/myButtonPrimary.vue";
import inputLabelAndError from "../Input/inputLabelAndError.vue";
import myDropdown from "../dropdown/myDropdown.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    myButton,
    inputLabelAndError,
    myDropdown,
  },
  data: function () {
    return {
      isShow: true,
      // listDepartments: [],
      formData: {
        EmployeeName: "",
        EmployeeCode: "",
        DateofBirth: "",
        DepartmentId: "",
        DepartmentName: "",
        Gender: "0",
        GenderName: "Nam",
        Email:"",
      },
      error: {
        EmployeeName: "",
        EmployeeCode: "",
        DateofBirth: "",
        DepartmentId: "",
        DepartmentName: "",
        Email:""
      },
    };
  },
  props: {
    handlePopup: {
      type: Function,
      required: true,
    },
    reloadData: {
      type:Function
    }
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      // validate form
      if(!this.formData.EmployeeName) {
        this.error.EmployeeName = "Vui lòng nhập tên nhân viên";        
      } 
      if(!this.formData.EmployeeCode) {
        this.error.EmployeeCode = "Vui lòng nhập mã nhân viên";        
      }else if(this.formData.EmployeeCode.length < 6) {
        this.error.EmployeeCode = "Mã nhân viên phải có ít nhất 6 ký tự";        
      }else if(this.formData.EmployeeCode.length > 20) {
        this.error.EmployeeCode = "Mã nhân viên không được quá 20 ký tự";        
      }else if (!this.validateEmployeeCode(this.formData.EmployeeCode)) {
        this.error.EmployeeCode = "Mã nhân viên bắt đầu bằng chữ và kết thúc là số";        
      }
      if (this.formData.Email && !this.validateEmail(this.formData.Email)) {
        this.error.Email = "Vui lòng nhập đúng định dạng của email";
      }
      // call api
      this.validateEmail(this.formData.Email);
      console.log(this.formData)
      // axios.post("https://amis.manhnv.net/api/v1/Employees", this.formData).then((res) => {
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
      let regex = /^\D.*[0-9]$/
      return regex.test(value);
    },
    validateEmail(email) {
      let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/      
      return regex.test(email);
    },
    returnValue({ target, value }) {
      console.log({ target, value });
      switch (target) {
        case "EmployeeName":
          this.formData.EmployeeName = value;
          break;
        case "EmployeeCode":
          this.formData.EmployeeCode = value;
          break;
        case "DateOfBirth":
          this.formData.DateofBirth = value;
          break;
        case "department":
          this.formData.DepartmentName = value.departmentName;
          this.formData.DepartmentId = value.deparmentID;
          break;
        case "Email":
          this.formData.Email = value;
          break;
        default:
          break;
      }
    },
    // async getAllDepartments() {
    //   try {
    //     const res = await axios.get(
    //       "https://amis.manhnv.net/api/v1/Departments"
    //     );
    //     const data = await res.data;
    //     this.listDepartments = data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    ...mapActions(["getAllDepartment"]),
    choseGender(e) {   
      this.formData.Gender = e.target.value;
      this.formData.GenderName = e.target.dataset.label;
    }
  },
  created() {
    // this.getAllDepartments();    
  },
  computed: {
    ...mapState(["listDepartment"])
  },
  mounted() {
    this.$refs.empCode.$el.querySelector("input[type=text]").focus();
    this.getAllDepartment()
    // this.$refs.empCode.$el.focus();
  }
};
</script>
<style lang="css" scoped>
@import url("../../css/component/popup.css");
</style>
