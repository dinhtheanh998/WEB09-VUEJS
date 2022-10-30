<template lang="">
  <div class="wrap__top__body">
    <h2 class="body__header__title">Nhân Viên</h2>
    <myButton
      btnText="Thêm mới nhân viên"
      isPrimary
      @click="handleShowPopup"
    ></myButton>
  </div>
  <Teleport to="body">
    <myPopup v-show="showPopup" :reloadData="reloadData" :infoEmployee="Employee"></myPopup>
  </Teleport>
</template>
<script>
import { mapState } from 'vuex';
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
      this.$store.commit("setTitlePopup", "Thêm mới nhân viên");
      this.$store.commit("setShowPopup");
    },
    reloadData() {
      this.refeshData(this.recordPerPage)    
    }
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
