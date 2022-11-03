import axios from "axios";
import { createStore } from "vuex";
import {
  API,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  TIMEOUT_SEC,
  TIME_TO_SHOW_TOAST,
  // ID_DEPARTMENT_DEFAULT,
} from "../config/Constraint";
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
    loading: false,
    listDepartment: [],
    listEmployee: [],
    listDeleteIdEmployee: [],
    pageSize: DEFAULT_PAGE_SIZE,
    pageNumber: DEFAULT_PAGE_NUMBER,
    totalPage: 0,
    totalRecord: 0,
    searchKeyword: null,
    Employee: {},
    showPopup: false,
    modifiedForm: true,
    titlePopup: "",
    editForm: false,
    resError: {},
    toastState: {
      show: false,
      type: "success",
      message: "",
    },
  },
  mutations: {
    [FETCH_DEPARTMENT](state, payload) {
      state.listDepartment = payload;
    },
    [FETCH_EMPLOYEE](state, list) {
      state.listEmployee = list;
    },
    [CHANGE_PAGE_NUMBER](state, payload) {
      state.pageNumber = payload;
    },
    [CHANGE_PAGE_SIZE](state, payload) {
      state.pageSize = payload;
    },
    [SET_TOTAL_PAGE](state, payload) {
      state.totalPage = payload;
    },
    [SET_TOTAL_RECORD](state, payload) {
      state.totalRecord = payload;
    },
    [SET_EMPLOYEE](state, payload) {
      state.Employee = payload;
    },
    [STATUS_POPUP](state) {
      state.showPopup = !state.showPopup;
    },
    [SET_TITLE_POPUP](state, payload) {
      state.titlePopup = payload;
    },
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
      state.showPopup = false;
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
  },
  actions: {
    /**
     * Lấy tất cả các phòng ban
     * Author: DTANH(29/10/2022)
     */
    getAllDepartment({ commit }) {
      axios.get(`${API.GET_ALL_DEPARTMENT}`).then((res) => {
        commit(FETCH_DEPARTMENT, res.data);
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
        });
    },

    /**
     * Phân trang nhân viên
     * Author: DTANH(29/10/2022)
     * */
    async filterEmployee({ commit, getters }, { pageSize, pageNumber }) {
      try {
        commit(FETCH_START, true);
        let callAPI = axios.get(
          `${
            API.GET_ALL_EMPLOYEE
          }/filter?pageSize=${pageSize}&pageNumber=${pageNumber}${
            getters["keyWord"] ? `&employeeFilter=${getters["keyWord"]}` : ""
          }`
        );
        const res = await Promise.race([callAPI, timeout(TIMEOUT_SEC)]);
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
    getEmployeeById({ commit, getters }, id) {
      try {
        axios.get(`${API.GET_ALL_EMPLOYEE}/${id}`).then((res) => {
          let empDepartmentName = getters["getDeparmentNameById"](
            res.data.DepartmentId
          );
          commit(SET_ONE_EMPLOYEE, {
            ...res.data,
            DepartmentName: empDepartmentName,
          });
        });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Sửa nhân viên theo id
     */
    editEmployee({ commit, dispatch }, { id, data }) {
      axios
        .put(`${API.GET_ALL_EMPLOYEE}/${id}`, data)
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
            errorCode: error.response.status,
            errorMsg: error.response.data.userMsg,
          });
        });
    },

    /**
     * Thêm mới nhân viên
     */
    addEmployee({ commit }, data) {
      axios
        .post(`${API.GET_ALL_EMPLOYEE}`, data)
        .then((res) => {
          if (res.status === 201) {
            commit(ADD_EMPLOYEE, data);
            commit(SET_MODIFIED_FORM, false);
            commit(SET_EDITFORM, false);
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
          }
        })
        .catch((error) => {
          console.log(error);
          commit(SET_ERROR, {
            errorCode: error.response.status,
            errorMsg: error.response.data.userMsg,
          });
        });
    },

    /**
     * Reload data
     */
    reloadData({ getters, dispatch }) {
      // commit("setPageNumber", DEFAULT_PAGE_NUMBER);
      // commit("setPageSize", DEFAULT_PAGE_SIZE);
      // commit("setSearchKeyword", null);
      dispatch("filterEmployee", {
        pageSize: getters["pageSize"],
        pageNumber: getters["pageNumber"],
      });
    },
    /**
     * Xóa bản ghi
     */
    deleteEmployee({ commit, dispatch }, id) { 
      axios.delete(`${API.GET_ALL_EMPLOYEE}/${id}`).then((res) => { 
        if (res.status === 200) {
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
    }
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
      return state.listDepartment.find((item) => item.DepartmentId == id)
        .DepartmentName;
    },
  },
});
