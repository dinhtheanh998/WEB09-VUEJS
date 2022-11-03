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
import { CLEAR_EMPLOYEE, SET_TITLE_POPUP, STATUS_POPUP } from "@/store/Mutatios.Type";
import { mapState } from "vuex";
import myButton from "../Button/myButtonPrimary.vue";
import myPopup from "../popup/myPopup.vue";
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
    handleShowPopup() {
      this.$store.commit(CLEAR_EMPLOYEE);
      this.$store.commit(SET_TITLE_POPUP, "Thêm mới nhân viên");
      this.$store.commit(STATUS_POPUP);
    },
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
