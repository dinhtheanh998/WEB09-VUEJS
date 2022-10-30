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
    Employee: {},
    showPopup: false,
    modifiedForm: true,
    titlePopup: "",
    editForm: false,
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
    setModifiedForm(state,payload){ 
      state.modifiedForm = payload;
    },
    updateMessage (state, message) {
      state.formEmp.message = message
    },
    clearEmployee(state) { 
      state.Employee = {};
    },
    addEmployee(state, payload) { 
      state.listEmployee.unshift(payload);
      state.showPopup = false;
      state.Employee = {};
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
    filterEmployee({ commit }, { pageSize, pageNumber }) {
      axios
        .get(
          `${API.GET_ALL_EMPLOYEE}/filter?pageSize=${pageSize}&pageNumber=${pageNumber}`
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
    editEmployee({ commit }, { id, data }) {
      axios.put(`${API.GET_ALL_EMPLOYEE}/${id}`, data).then((res) => {
        if (res.status == 200) {
          commit("clearEmployee");
          commit("setShowPopup");
        }
      }).catch((error) => { 
        console.log(error)
      });
    },
    /**
     * Thêm mới nhân viên
     */
    addEmployee({ commit }, data) { 
      axios.post(`${API.GET_ALL_EMPLOYEE}`, data).then((res) => {
        if (res.status === 201) { 
          commit("addEmployee", data);
        }
      }).catch((error) => { 
        console.log(error);
      })
    }
  },
});
