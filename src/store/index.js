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
  },
  mutations: {
    setDepartment(state, payload) {
      state.listDepartment = payload;
    },
    setEmployee(state, list) {
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
    searchEmployee({ commit }, param) {
      axios.get(`${API.FILTER_EMPLOYEE}${param}`).then((res) => {
        commit("setEmployee", res.data);
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
          commit("setEmployee", res.data.Data);
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
  },
});
