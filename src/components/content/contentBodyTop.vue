<template lang="">
  <div class="wrap__top__body">
    <h2 class="body__header__title">Nhân Viên</h2>
    <myButton
      btnText="Thêm mới nhân viên"
      isPrimary
      @click="handleShowPopup"
    ></myButton>
    <Teleport to="body">
      <myPopup v-if="showPopup"></myPopup>
      <!-- <myPopup v-show="showPopup" :infoEmployee="Employee"></myPopup> -->
    </Teleport>
  </div>
</template>
<script>
import { CLEAR_EMPLOYEE, SET_ONE_EMPLOYEE, SET_TITLE_POPUP, STATUS_POPUP } from "@/store/Mutatios.Type";
import { mapState } from "vuex";
import myButton from "../Button/MyButtonPrimary.vue";
import myPopup from "../popup/MyPopup.vue";
import { DEFAULT_GENDER } from '@/config/Constraint';
export default {
  components: {
    myButton,
    myPopup,
  },
  data: function () {
    return {
      // showPopup: false,
      refeshData: Function,
      recordPerPage: 10,
    };
  },
  computed: {
    ...mapState(["Employee", "showPopup"]),
  },
  methods: {
    /**
     * Hàm hiển thị popup và thay đổi title của popup
     * Author : DTANH (30/10/2022)
     */
    handleShowPopup() {
      this.$store.commit(CLEAR_EMPLOYEE);
      this.$store.commit(SET_ONE_EMPLOYEE, DEFAULT_GENDER)
      this.$store.commit(SET_TITLE_POPUP, "Thêm mới nhân viên");
      this.$store.commit(STATUS_POPUP);
    },

    /**
     * Load lại dữ liệu
     * Author : DTANH (30/10/2022)
     */
    reloadData() {
      this.refeshData(this.recordPerPage);
    },
  },
  created() {
    this.eventBus.on("reloadData", (data) => {
      this.refeshData = data.returnValue;
      this.recordPerPage = data.recordPerPage;
    });
    this.eventBus.on("recordPerPage", (data) => {
      this.recordPerPage = data;
    });
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Insert") {
        this.handleShowPopup();
      }
    });
  },
  unmounted() {
    document.removeEventListener("keydown", (e) => {
      if (e.key === "Insert") {
        this.handleShowPopup();
      }
    });
  },
};
</script>
<style lang="css" scoped>
.wrap__top__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.body__header__title {
  font-size: 20px;
  line-height: 26px;
  text-transform: uppercase;
  color: var(--text-color);
  font-weight: 700;
}
</style>
