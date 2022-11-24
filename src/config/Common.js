const BASE_URL = "https://amis.manhnv.net/api/v1";
const SECONDARY_URL = "http://localhost:31530/api/v1";
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE_NUMBER = 1;
export const TIMEOUT_SEC = 4;
export const TIME_TO_SHOW_TOAST = 2;
export const REGEX_NUMBER_LIMIT12 = /^[0-9]{1,12}$/;
export const REGEX_NUMBER = /^[0-9]*$/;
export const ID_DEPARTMENT_DEFAULT = "142cb08f-7c31-21fa-8e90-67245e8b283e";
export const DEFAULT_GENDER = {
    Gender: 1,
    GenderName:"Nam"
}

export const MESSAGE_VALIDATE = {
    MESSAGE_VALIDATE_EMAIL : "Email không hợp lệ",
    MESSAGE_REQUIRED_EMPLOYEE_NAME : "Vui lòng nhập tên nhân viên",
    MESSAGE_REQUIRED_EMPLOYEE_CODE : "Vui lòng nhập mã nhân viên",
    MESSAGE_VALIDATE_PHONE_NUMBER: "Số điện thoại chỉ được là số",
    MESSAGE_REQUIRED_DEPARTMENT: "Vui lòng chọn phòng ban",
    MESSAGE_VALIDATE_DATEOFBIRTH: "Ngày sinh không hợp lệ",
    MESSAGE_REQUIRED_PHONE_LENGTH: (LENGTH) =>  `Số điện thoại tối đa ${LENGTH} chữ số` ,
    MESSAGE_VALIDATE_CMND: "Số chứng minh nhân dân chỉ được nhập số",
    MESSAGE_ONLYNUMBER: (name) => `${name} chỉ được là số`,
}

export const NAME_DISPLAY = {
    EMPLOYEECODE: "Mã nhân viên",
    EMPLOYEENAME: "Tên nhân viên",
    DEPARTMENT: "Đơn vị",
    POSITION: "Chức vụ",
    INDENTITYNUMBER: "Số chứng minh nhân dân",
    DATEOFBIRTH: "Ngày sinh",
    BANKNUMBER: "Số tài khoản",
    BANKNAME: "Tên ngân hàng",
    BRANCHNAME: "Chi nhánh",
    EMAIL: "Email",
    TELEPHONENUMBER: "Số điện thoại",
    PHONENUMBER: "Số điện thoại cố định",
}

export const NAME_PROPERTIES = {
    EMPLOYEECODE: "EmployeeCode",
    EMPLOYEENAME: "EmployeeName",
    DEPARTMENTID: "DepartmentID",
    POSITION: "JobPotionName",
    INDENTITYNUMBER: "IndentityNumber",
    DATEOFBIRTH: "DateOfBirth",
    BANKNUMBER: "BankNumber",
    BANKNAME: "BankName",
    BRANCHNAME: "BranchName",
    EMAIL: "Email",
    TELEPHONENUMBER: "TelephoneNumber",
    PHONENUMBER: "PhoneNumber",
}


export const API = {
    GET_ALL_DEPARTMENT: `${BASE_URL}/Departments`,
    GET_ALL_EMPLOYEE: `${BASE_URL}/Employees`,
    FILTER_EMPLOYEE: `${BASE_URL}/Employees/filter?`,
};

export const SECON_API = {
    GET_ALL_DEPARTMENT: `${SECONDARY_URL}/Departments`,
    EMPLOYEE: `${SECONDARY_URL}/Employees`,
    FILTER_EMPLOYEE: `${SECONDARY_URL}/Employees/filter?`,
    GET_NEWCODE_EMP: `${SECONDARY_URL}/Employees/getNewCode`,
    BATCH_DELETE_EMP: `${SECONDARY_URL}/Employees/DeleteBatch`,
    GET_EMP_BY_CODE: `${SECONDARY_URL}/Employees/getByCode`,
    UPDATE_OR_INSERT_EMP: `${SECONDARY_URL}/Employees/updateOrInsert`,
}


//https://amis.manhnv.net/api/v1/Employees/filter?pageSize=10&pageNumber=2&employeeFilter=a
