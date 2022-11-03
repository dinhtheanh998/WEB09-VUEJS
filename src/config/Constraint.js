const BASE_URL = "https://amis.manhnv.net/api/v1";
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_NUMBER = 1;
export const TIMEOUT_SEC = 4;
export const TIME_TO_SHOW_TOAST = 2;
export const ID_DEPARTMENT_DEFAULT = "142cb08f-7c31-21fa-8e90-67245e8b283e";
export const MESSAGE_VALIDATE_EMAIL = "Email không hợp lệ";
export const MESSAGE_REQUIRED_EMPLOYEE_NAME = "Vui lòng nhập tên nhân viên";
export const MESSAGE_REQUIRED_EMPLOYEE_CODE = "Vui lòng nhập mã nhân viên";
export const MESSAGE_VALIDATE_PHONE_NUMBER = "Số điện thoại không hợp lệ";
export const MESSAGE_VALIDATE_CMND = "Số chứng minh nhân dân chỉ được nhập số";
export const API = {
    GET_ALL_DEPARTMENT: `${BASE_URL}/Departments`,
    GET_ALL_EMPLOYEE: `${BASE_URL}/Employees`,
    FILTER_EMPLOYEE: `${BASE_URL}/Employees/filter?`,
}
//https://amis.manhnv.net/api/v1/Employees/filter?pageSize=10&pageNumber=2&employeeFilter=a
