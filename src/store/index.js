import axios from "axios";
import { createStore } from "vuex";
import {
  API,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "../config/Constraint";
export default createStore({
  state: {
    listDepartment: [],
    listEmployee: [],
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
    resError:{}
  },
  mutations: {
    setDepartment(state, payload) {
      state.listDepartment = payload;
    },
    setListEmployee(state, list) {
      state.listEmployee = list;
    },
    setPageNumber(state, payload) {
      state.pageNumber = payload;
    },
    setPageSize(state, payload) {
      state.pageSize = payload;
    },
    setTotalPage(state, payload) {
      state.totalPage = payload;
    },
    setTotalRecord(state, payload) {
      state.totalRecord = payload;
    },
    setEmployee(state, payload) {
      state.Employee = payload;
    },
    setShowPopup(state) {
      state.showPopup = !state.showPopup;
    },
    setTitlePopup(state, payload) {
      state.titlePopup = payload;
    },
    setModifiedForm(state, payload) {
      state.modifiedForm = payload;
    },
    updateMessage(state, message) {
      state.formEmp.message = message;
    },
    clearEmployee(state) {
      state.Employee = {};
    },
    addEmployee(state, payload) {
      state.listEmployee.unshift(payload);
      state.showPopup = false;
      state.Employee = {};
    },
    setSearchKeyword(state, payload) {
      state.searchKeyword = payload;
    },
    setError(state, payload) { 
      state.resError = payload;
    }
  },
  actions: {
    /**
     * Lấy tất cả các phòng ban
     * Author: DTANH(29/10/2022)
     */
    getAllDepartment({ commit }) {
      axios.get(`${API.GET_ALL_DEPARTMENT}`).then((res) => {
        commit("setDepartment", res.data);
      });
    },
    /**
     * Tìm kiếm nhân viên
     * Author: DTANH(29/10/2022)
     */
    searchEmployee({ commit }, { pageSize, pageNumber, param }) {
      axios
        .get(
          `${API.FILTER_EMPLOYEE}pageSize=${pageSize}&pageNumber=${pageNumber}&employeeFilter=${param}`
        )
        .then((res) => {
          commit("setListEmployee", res.data.Data);
          commit("setTotalPage", res.data.TotalPage);
          commit("setTotalRecord", res.data.TotalRecord);
        });
    },
    /**
     * Phân trang nhân viên
     * Author: DTANH(29/10/2022)
     * */
    filterEmployee({ commit, getters }, { pageSize, pageNumber }) {
      axios
        .get(
          `${
            API.GET_ALL_EMPLOYEE
          }/filter?pageSize=${pageSize}&pageNumber=${pageNumber}${
            getters["keyWord"] ? `&employeeFilter=${getters["keyWord"]}` : ""
          }`
        )
        .then((res) => {
          commit("setListEmployee", res.data.Data);
          commit("setTotalPage", res.data.TotalPage);
          commit("setTotalRecord", res.data.TotalRecord);
        });
    },
    /**
     * Sang trang tiếp theo
     * Author: DTANH(29/10/2022)
     */
    incrementPageNumber({ commit, state }) {
      commit("setPageNumber", state.pageNumber + 1);
    },
    /**
     * Về trang trước
     * Author: DTANH(29/10/2022)
     */
    decrementPageNumber({ commit, state }) {
      commit("setPageNumber", state.pageNumber - 1);
    },
    /**
     * Lấy thông tin nhân viên theo id
     * Author: DTANH(30/10/2022)
     */
    getEmployeeById({ commit }, id) {
      try {
        axios.get(`${API.GET_ALL_EMPLOYEE}/${id}`).then((res) => {
          commit("setEmployee", res.data);
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
            commit("clearEmployee");
            commit("setShowPopup");
          }
        })
        .catch((error) => {
          console.log(error);
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
            commit("addEmployee", data);
          }
        })
        .catch((error) => {
          console.log(error);
          commit("setError", {
            errorCode: error.response.status,
            errorMsg: error.response.data.userMsg
          });
        });
    },
    /**
     * Reload data
    */
    reloadData({ getters,dispatch  }) { 
      // commit("setPageNumber", DEFAULT_PAGE_NUMBER);
      // commit("setPageSize", DEFAULT_PAGE_SIZE);
      // commit("setSearchKeyword", null);
      dispatch("filterEmployee", {
        pageSize: getters["pageSize"],
        pageNumber: getters["pageNumber"],
      });
    }
  },
  getters: {
    keyWord: (state) => {
      return state.searchKeyword;
    },
    pageSize: (state) => { 
      return state.pageSize
    },
    pageNumber: (state) => { 
      return state.pageNumber
    }
  },
});
