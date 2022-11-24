<template lang="">
  <div class="pagging">
    <button class="pagging__btn" @click="selectPage($event, 1)" :class="{disable: pageNumber==1 }">
      <i class="icofont-rounded-double-left"></i>
    </button>
    <button class="pagging__btn" @click="prevPage" :class="{disable: pageNumber==1 }">
      <i class="icofont-rounded-left"></i>
    </button>
    <!-- <div :class="{disable: pageNumber==1 }" @click="prevPage" class="paggingText">Trước</div> -->
    <button
      class="pagging__btn"
      v-show="pageNumber != 1"
      @click="selectPage($event, pageNumber - 1)"
    >
      {{ pageNumber - 1 }}
    </button>
    <button class="pagging__btn active">{{ pageNumber }}</button>
    <button
      class="pagging__btn"
      v-show="pageNumber != totalPage"
      @click="selectPage($event, pageNumber + 1)"
    >
      {{ pageNumber + 1 }}
    </button>
    <!-- <button class="pagging__btn" :class="{active : pageNumber === index}" v-for="index in numberPageDisplay" :key="index">{{index}}</button> -->
    <!-- <button class="pagging__btn" :class="{active : pageNumber === 2}">2</button>
    <button class="pagging__btn" :class="{active : pageNumber === 3}">3</button> -->
    <div
      v-show="!(totalPage - pageNumber <= 2)"
      @click="showGoToPage = !showGoToPage"
      class="pagging__btn pagging__btn--gotoPage"
      title="Đi tới trang số"
    >
      ...
    </div>
    <button
      class="pagging__btn"
      :class="{ active: pageNumber === totalPage }"
      v-show="pageNumber != totalPage && !(totalPage - pageNumber <= 1)"
      @click="selectPage($event, totalPage)"
    >
      {{ totalPage }}
    </button>
    <button class="pagging__btn">
      <i class="icofont-rounded-right" @click="nextPage" :class="{disable: pageNumber==totalPage }"></i>
    </button>
    <!-- <div :class="{disable: pageNumber==totalPage }" @click="nextPage" class="paggingText">
      Sau
    </div> -->
    <button class="pagging__btn" @click="selectPage($event, totalPage)" :class="{disable: pageNumber==totalPage }">
      <i class="icofont-rounded-double-right"></i>
    </button>
    <div class="pagging__gotoPage" v-show="showGoToPage" id="goToPage">
      <div class="pagging__gotoPage--title">Chọn trang bạn muốn tới</div>
      <div class="pagging__gotoPage-input">
        <input
          type="text"
          title="Nhập trang muốn đến"
          class="input-primary"
          :value="pageNumber"
          @input="inputPageNumber"
        />
      </div>
      <ButtonPrimary
        btnText="Đi tới"
        isPrimary
        @click="selectPage($event, inputPage)"
      ></ButtonPrimary>
    </div>
  </div>
</template>
<script>
import { CHANGE_PAGE_NUMBER } from "@/store/Mutatios.Type";
import { mapState, mapActions } from "vuex";
import ButtonPrimary from "../Button/MyButtonPrimary.vue";
export default {
  data() {
    return {
      showGoToPage: false,
      inputPage: null,
    };
  },
  components: {
    ButtonPrimary,
  },
  computed: {
    ...mapState([
      "pageSize",
      "pageNumber",
      "listEmployee",
      "totalRecord",
      "totalPage",
    ]),
  },
  methods: {
    ...mapActions([
      "incrementPageNumber",
      "decrementPageNumber",
      "filterEmployee",
    ]),
    inputPageNumber(e) {
      if (e.target.value >= this.totalPage) {
        this.inputPage = this.totalPage;
      } else if (e.target.value <= 1) {
        this.inputPage = 1;
      } else {
        this.inputPage = e.target.value;
      }
      //   this.inputPage = e.target.value;
    },
    /**
     * Chuyển trang trước
     * @param {number} value
     * Author: DTANh(25/10/2022)
     */
    prevPage: function () {
      if (this.pageNumber === 1) return;
      this.$store.dispatch("decrementPageNumber");
      this.$store.dispatch("filterEmployee", {
        pageSize: this.$store.state.pageSize,
        pageNumber: this.$store.state.pageNumber,
        searchKeyword: this.$store.state.searchKeyword,
      });
    },
    /**
     * Chuyển trang sau
     * @param {number} value
     * Author: DTANh(25/10/2022)
     */
    nextPage: function () {
      if (this.pageNumber === this.totalPage) return;
      console.log(this.pageNumber, this.totalPage);
      this.$store.dispatch("incrementPageNumber");
      this.$store.dispatch("filterEmployee", {
        pageSize: this.$store.state.pageSize,
        pageNumber: this.$store.state.pageNumber,
        searchKeyword: this.$store.state.searchKeyword,
      });
    },
    /**
     * chọn số trang
     */
    selectPage(e, value) {
      this.$store.commit(CHANGE_PAGE_NUMBER, Number(value));
      this.showGoToPage = false;
    },
    /**
     * Đóng popup chọn trang
     * Author: DTANH(30/10/2022)
     */
    close(e) {
      if (
        !e.target.closest("#goToPage") &&
        !e.target.closest(".pagging__btn--gotoPage")
      ) {
        this.showGoToPage = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  unmounted() {
    document.removeEventListener("click", this.close);
  },
};
</script>
<style lang="css" scoped>
.pagging {
  display: flex;
  align-items: center;
  gap: 0 8px;
  position: relative;
}
.pagging__gotoPage {
  position: absolute;
  bottom: calc(100% + 2px);
  left: 10%;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  background-color: #fff;
}
.pagging__gotoPage--title {
  font-size: 14px;
}
.pagging__gotoPage-input {
  height: 32px;
}
.pagging__gotoPage-input > input {
  border: 1px solid var(--border-color);
  /* border: none; */
  outline: none;
  width: 100%;
  height: 100%;
  padding-right: 33px;
  padding-left: 12px;
  border-radius: 4px;
}

.pagging__btn {
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 4px;
}
.pagging__btn:hover {
  background-color: var(--hover-color);
}
.active {
  border-color: var(--primary-color);
}
.pagging__btn.disable, .paggingText.disable {
  cursor: not-allowed;
  opacity: 0.5;
}
.pagging__btn.disable:hover {
  background-color: transparent;
}
.paggingText{
  cursor: pointer;
}
</style>
