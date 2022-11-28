import axios from "axios";
import { createStore } from "vuex";
import {
  API,
  COLOR,
  DEFAULT_GENDER,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  SECON_API,
  TIMEOUT_SEC,
  TIME_TO_SHOW_TOAST,
  // ID_DEPARTMENT_DEFAULT,
} from "../config/Common";
import {
  FETCH_START,
  SET_TOAST,
  CLEAR_EMPLOYEE,
  SET_ONE_EMPLOYEE,
  SET_LIST_DELETE_EMP,
  SET_EDITFORM,
  SET_ERROR,
  SEARCH_KEYWORD,
  ADD_EMPLOYEE,
  SET_MODIFIED_FORM,
  SET_TITLE_POPUP,
  STATUS_POPUP,
  SET_EMPLOYEE,
  SET_TOTAL_RECORD,
  SET_TOTAL_PAGE,
  CHANGE_PAGE_SIZE,
  CHANGE_PAGE_NUMBER,
  FETCH_EMPLOYEE,
  FETCH_DEPARTMENT,
  SET_NEW_CODE,
  SET_CHECK_ALL,
} from "./Mutatios.Type";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export default createStore({
  state: {
    //hiển thị loading
    loading: false,

    // Danh sách phòng ban
    listDepartment: [],

    //danh sách nhân viên
    listEmployee: [],

    //danh sách nhân viên đã chọn để xóa
    listDeleteIdEmployee: [],

    // số lượng bản ghi / trang
    pageSize: DEFAULT_PAGE_SIZE,

    // số trang hiện tại
    pageNumber: DEFAULT_PAGE_NUMBER,

    // tổng số trang
    totalPage: 0,

    // tông số bản ghi
    totalRecord: 0,

    // từ khóa tìm kiếm
    searchKeyword: null,

    // thông tin của 1 nhân viên
    Employee: {
      Gender: 1,
    },

    // Bản sao chép của Employee ( dùng để so sánh khi thay đổi thông tin nhân viên)
    cloneEmployee: {},

    // trạng thái của popup
    showPopup: false,

    // Là true nếu là thêm mới, false nếu là sửa
    modifiedForm: true,

    // tiêu đề của popup
    titlePopup: "",

    // là false nếu là thêm mới, true nếu là sửa
    editForm: false,

    // thông báo lỗi trả về từ serve
    resError: {},

    // thông báo toast
    toastState: {
      show: false,
      type: "success",
      message: "",
    },

    // Mã nhân viên mới
    newEmployeeCode: "",

    // check all
    isCheckAll: false,

    // Filter nhiều điều kiện
    filterCondition: {},

    // Thông tin cột filter
    filterInfo: {
      status: false,
      name: "",
      coord: {},
      title: "",
    },

    // thông báo cho người dùng
    dialogData: {
      dialogShow: false,
      type: "",
      description: "",
      btnText: "Có",
      btnTextSecondary: "Hủy",
      btnSecondaryChoseNo: "Không",
      handleChoseYes: "",
      color: COLOR.PRIMARY
    },
  },

  mutations: {
    // Hiển thị thông báo lỗi
    setDialog(state, payload) { 
      state.dialogData = {
        ...state.dialogData,
        ...payload,
      };
    },

    //
    setErrorValid(state, payload) {
      state.errorValid = payload;
    },
    // set filterInfo
    setFilterInfo(state, payload) {
      state.filterInfo = payload;
    },

    //setFilter
    setFilterCondition(state, payload) {
      state.filterCondition = payload;
    },

    // Thay đổi trạng thái của isCheckAll
    [SET_CHECK_ALL](state, payload) {
      state.isCheckAll = payload;
    },

    // Sao chép employee vào cloneEmployee
    copyEmployee(state, employee) {
      state.cloneEmployee = { ...employee };
    },
    /**
     *  Lấy danh sách phòng ban
     */
    [FETCH_DEPARTMENT](state, payload) {
      state.listDepartment = payload;
    },
    /**
     *  Lấy danh sách nhân viên
     */
    [FETCH_EMPLOYEE](state, list) {
      state.listEmployee = list;
    },
    /**
     *  Thay đổi số trang
     */
    [CHANGE_PAGE_NUMBER](state, payload) {
      state.pageNumber = payload;
    },
    /**
     *  Thay đổi số lượng bản ghi trên 1 trang
     */
    [CHANGE_PAGE_SIZE](state, payload) {
      state.pageSize = payload;
    },
    /**
     *  Lấy tổng số trang
     */
    [SET_TOTAL_PAGE](state, payload) {
      state.totalPage = payload;
    },
    /**
     *  Lấy tổng số bản ghi
     */
    [SET_TOTAL_RECORD](state, payload) {
      state.totalRecord = payload;
    },
    /**
     *  lấy thông tin 1 nhân viên
     */
    [SET_EMPLOYEE](state, payload) {
      state.Employee = payload;
    },
    /**
     *  Thay đổi trạng thái popup
     */
    [STATUS_POPUP](state) {
      state.showPopup = !state.showPopup;
    },
    /**
     *  Thay đổi title popup
     */
    [SET_TITLE_POPUP](state, payload) {
      state.titlePopup = payload;
    },
    /**
     *  Đặt trạng thái của form ( sửa hay thêm mới )
     */
    [SET_MODIFIED_FORM](state, payload) {
      state.modifiedForm = payload;
    },
    // updateMessage(state, message) {
    //   state.formEmp.message = message;
    // },

    /**
     * Clear Employee khi đóng popup
     * Author : DTANH (01/11/2022)
     */
    [CLEAR_EMPLOYEE](state) {
      state.Employee = {};
    },

    /**
     * Sau khi thêm nhân viên thành công thì thêm vào đầu danh sách
     * Author : DTANH (01/11/2022)
     */
    [ADD_EMPLOYEE](state, payload) {
      state.listEmployee.unshift(payload);
      // state.showPopup = false;
      state.Employee = {};
    },

    /**
     * SET từ khóa tìm kiếm để sử dụng trong API
     * Author : DTANH (01/11/2022)
     */
    [SEARCH_KEYWORD](state, payload) {
      state.searchKeyword = payload;
    },

    /**
     * Nội dung của thông báo lỗi khi gọi API
     * @param {*} payload
     * Author : DTANH (01/11/2022)
     */
    [SET_ERROR](state, payload) {
      state.resError = payload;
    },

    /**
     * Trạn thái của popup
     * @param {Boolean} payload
     * true nếu là form edit, false nếu là form add
     */
    [SET_EDITFORM](state, payload) {
      state.editForm = payload;
    },

    /**
     * Chọn nhiều bản ghi để xóa
     * @param {Array} payload
     * Author: DTANH (01/11/2022)
     */
    [SET_LIST_DELETE_EMP](state, payload) {
      state.listDeleteIdEmployee = payload;
    },

    /**
     * Trạng thái của loading khi gọi api
     * Author: DTANH(01/11/2022)
     */
    [FETCH_START](state, payload) {
      state.loading = payload;
    },

    /**
     * Lấy dữ liệu của 1 nhân viên
     * Author: DTANH(01/11/2022)
     */
    [SET_ONE_EMPLOYEE](state, payload) {
      state.Employee = payload;
    },

    /**
     * thay đổi trạng thái của toast
     * Author: DTANH(01/11/2022)
     */
    [SET_TOAST](state, payload) {
      state.toastState = payload;
    },

    /**
     * Lấy mã nhân viên mới
     */
    [SET_NEW_CODE](state, payload) {
      state.newEmployeeCode = payload;
    },
  },

  actions: {
    /**
     * Lấy tất cả các phòng ban
     * Author: DTANH(29/10/2022)
     */
    getAllDepartment({ commit }) {
      axios
        .get(`${SECON_API.GET_ALL_DEPARTMENT}`)
        .then((res) => {
          commit(FETCH_DEPARTMENT, res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * Tìm kiếm nhân viên
     * Author: DTANH(29/10/2022)
     */
    searchEmployee({ commit }, { pageSize, pageNumber, param }) {
      commit(FETCH_START, true);
      axios
        .get(
          `${API.FILTER_EMPLOYEE}pageSize=${pageSize}&pageNumber=${pageNumber}&employeeFilter=${param}`
        )
        .then((res) => {
          commit(FETCH_EMPLOYEE, res.data.Data);
          commit(SET_TOTAL_PAGE, res.data.TotalPage);
          commit(SET_TOTAL_RECORD, res.data.TotalRecord);
          commit(FETCH_START, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * Phân trang nhân viên
     * Author: DTANH(29/10/2022)
     * */
    async filterEmployee({ commit, getters }, { pageSize, pageNumber }) {
      if (getters["keyWord"]) {
        commit(CHANGE_PAGE_NUMBER, 1);
      }
      try {        
        commit(FETCH_START, true);
        let callAPI = axios.get(
          `${SECON_API.FILTER_EMPLOYEE}${
            getters["keyWord"] ? `keyword=${getters["keyWord"]}&` : ""
          }pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        const res = await Promise.race([callAPI, timeout(TIMEOUT_SEC)]);
        res.data.Data.map(item => {
          getters["getListSelected"].includes(item.EmployeeId) ? item.isChecked = true : item.isChecked = false;
        })
        commit(SET_CHECK_ALL, false);
        commit(FETCH_EMPLOYEE, res.data.Data);
        commit(SET_TOTAL_PAGE, res.data.TotalPage);
        commit(SET_TOTAL_RECORD, res.data.TotalRecord);
        commit(FETCH_START, false);
      } catch (error) {
        commit(FETCH_START, false);
      }
    },

    /**
     * Sang trang tiếp theo
     * Author: DTANH(29/10/2022)
     */
    incrementPageNumber({ commit, state }) {
      commit(CHANGE_PAGE_NUMBER, state.pageNumber + 1);
    },

    /**
     * Về trang trước
     * Author: DTANH(29/10/2022)
     */
    decrementPageNumber({ commit, state }) {
      commit(CHANGE_PAGE_NUMBER, state.pageNumber - 1);
    },

    /**
     * Lấy thông tin nhân viên theo id
     * Author: DTANH(30/10/2022)
     */
    getEmployeeById({ commit, getters, state }, id) {
      try {
        axios.get(`${SECON_API.EMPLOYEE}/${id}`).then((res) => {
          let empDepartmentName = getters.getDeparmentNameById(
            res.data.DepartmentID
          );
          commit(SET_ONE_EMPLOYEE, {
            ...res.data,
            DepartmentName: empDepartmentName,
          });
          commit("copyEmployee", state.Employee);
        });
      } catch (error) {
        commit(SET_ERROR, {
          errorCode: error.response.data.ErrorCode,
          errorMsg: error.response.data.UserMsg,
        });
      }
    },

    /**
     * Sửa nhân viên theo id
     * Author: DTANH(30/10/2022)
     */
    editEmployee({ commit, dispatch }, { id, data }) {
      axios
        .post(`${SECON_API.UPDATE_OR_INSERT_EMP}?recordID=${id}`, {
          ...data,
          ModifiedDate: new Date(),
          ModifiedBy: "Đinh Thế Anh",
        })
        .then((res) => {
          if (res.status == 200) {
            dispatch("reloadData");
            commit(CLEAR_EMPLOYEE);
            commit(STATUS_POPUP);
            commit(SET_EDITFORM, false);
            commit(SET_TOAST, {
              show: true,
              type: "success",
              message: "Sửa thành công",
            });
            setTimeout(() => {
              commit(SET_TOAST, {
                show: false,
                type: "success",
                message: "Sửa thành công",
              });
            }, TIME_TO_SHOW_TOAST * 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          commit(SET_ERROR, {
            errorCode: error.response.data.ErrorCode,
            errorMsg: error.response.data.UserMsg,
          });
        });
    },

    /**
     * Thêm mới nhân viên
     */
    async addEmployee({ commit, dispatch }, { data ,closePopup = false}) {
      axios
        .post(`${SECON_API.UPDATE_OR_INSERT_EMP}`, {
          ...data,
          JobPositionID: "6b47b37f-3123-3ce7-14cf-9712082ff6cb",
          ModifiedDate: new Date(),
          ModifiedBy: "Đinh Thế Anh",
        })
        .then(async (res) => {
          if (res.status === 201) {
            commit(ADD_EMPLOYEE, { ...data, EmployeeId: res.data });
            if (closePopup) { 
              commit(STATUS_POPUP);
              commit(SET_MODIFIED_FORM, true);
            }
            commit(SET_MODIFIED_FORM, false);
            commit(SET_EDITFORM, false);
            let newCode = await dispatch("getNewEmployeeCod");
            commit(SET_ONE_EMPLOYEE, {
              ...DEFAULT_GENDER,
              EmployeeCode: newCode,
            });
            commit(SET_TOAST, {
              show: true,
              type: "success",
              message: "Thêm thành công",
            });
            setTimeout(() => {
              commit(SET_TOAST, {
                show: false,
                type: "success",
                message: "Sửa thành công",
              });
            }, 2500);
            return true;
          }
          return false;
        })
        .catch((error) => {
          console.log(error);
          commit(SET_ERROR, {
            errorCode: error.response.data.ErrorCode,
            errorMsg: error.response.data.UserMsg,
          });
        });
    },

    /**
     * Reload data
     */
    reloadData({ getters, dispatch }) {
      dispatch("filterEmployee", {
        pageSize: getters["pageSize"],
        pageNumber: getters["pageNumber"],
      });
    },
    /**
     * Xóa bản ghi
     */
    deleteEmployee({ commit, dispatch, getters }, id) {
      axios
        .delete(`${SECON_API.EMPLOYEE}/${id}`)
        .then((res) => {
          if (res.status === 200) {
            commit(SET_CHECK_ALL, false);
            commit(SET_LIST_DELETE_EMP, []);
            if (getters["getListEmployee"].length == 1) {
              if (getters["pageNumber"] > 1) {
                commit(CHANGE_PAGE_NUMBER, getters["pageNumber"] - 1);
              }
            }
            dispatch("reloadData");
            commit(SET_TOAST, {
              show: true,
              type: "success",
              message: "Xóa thành công",
            });
            setTimeout(() => {
              commit(SET_TOAST, {
                show: false,
                type: "success",
                message: "Xóa thành công",
              });
            }, TIME_TO_SHOW_TOAST * 1000);
          }
        })
        .catch((error) => {
          commit(SET_ERROR, {
            errorCode: error.response.data.ErrorCode,
            errorMsg: error.response.data.UserMsg,
          });
        });
    },

    /**
     * lấy mã nhân viên mới
     */
    async getNewEmployeeCod({ commit }) {
      try {
        let res = await axios.get(SECON_API.GET_NEWCODE_EMP);
        commit(SET_NEW_CODE, res.data);
        return res.data;
      } catch (error) {
        commit(SET_ERROR, {
          errorCode: error.response.data.ErrorCode,
          errorMsg: error.response.data.UserMsg,
        });
      }
    },

    /**
     * xóa nhiều nhân viên
     */
    deleteMultiEmployee({ commit, dispatch, getters }, ids) {
      axios
        .post(`${SECON_API.BATCH_DELETE_EMP}`, { EmployeeIDs: ids })
        .then(() => {
          commit(SET_CHECK_ALL, false);
          commit(SET_LIST_DELETE_EMP, []);
          if (getters["getListEmployee"].length == ids.length) {
            if (getters["pageNumber"] > 1) {
              commit(CHANGE_PAGE_NUMBER, getters["pageNumber"] - 1);
            }
          }
          dispatch("reloadData");
        })
        .catch((error) => {
          commit(SET_ERROR, {
            errorCode: error.response.data.ErrorCode,
            errorMsg: error.response.data.UserMsg,
          });
        });
    },

    /**
     * Xuất khẩu file excel
     */
    exportExcel({ commit }) {
      axios
        .post(`${SECON_API.EMPLOYEE}/ExportExcel`)
        .then((res) => { 
          console.log(res)
          res.config.responseType = "blob";
          axios(res.config).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "file.xlsx");
            document.body.appendChild(link);
            link.click();
          });
        })
        .catch((error) => {
          console.log(error.response.data.UserMsg);
          commit(SET_ERROR, {
            errorCode: error.response.data.ErrorCode,
            errorMsg: error.response.data.UserMsg,
          });
        });
    },
  },

  getters: {
    keyWord: (state) => {
      return state.searchKeyword;
    },
    pageSize: (state) => {
      return state.pageSize;
    },
    pageNumber: (state) => {
      return state.pageNumber;
    },
    listDepartment: (state) => {
      return state.listDepartment;
    },
    getDeparmentNameById: (state) => (id) => {
      console.log(state.listDepartment.find((item) => item.DepartmentId == id));
      return state.listDepartment.find((item) => item.DepartmentId == id)
        .DepartmentName;
    },
    getListEmployee: (state) => {
      return state.listEmployee;
    },
    getNewEmployeeCode: (state) => {
      return state.newEmployeeCode;
    },
    getListSelected: (state) => { 
      return state.listDeleteIdEmployee;
    }
  },
});

