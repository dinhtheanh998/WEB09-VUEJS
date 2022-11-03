<template lang="">
  <div class="wrap__pagging">
    <div class="total__documents">
      <span
        >Tổng:
        <strong class="number__documents">{{ totalRecord }}</strong></span
      >
    </div>
    <div class="pagging--range-numberPage">
      <div class="pagging__range">
        <span>Tổng bản ghi/trang:</span>
        <myDropdown
          id="dropdown__range--pagging"
          :arrays="paggingRange"
          moveToTop
          :defaultValue="pageSize"
        ></myDropdown>
      </div>
      <div class="flex align-center gap-x-16">
        <!-- <div>
          <span class="pagging__range__number"
            >{{ startPage }} -
            {{ endPage }}
          </span>
          <span>bản ghi</span>
        </div> -->
        <!-- <span class="pagging__option" @click="prevPage">
          <i class="icofont-rounded-left"></i
        ></span>
        <span class="pagging__option" @click="nextPage"
          ><i class="icofont-rounded-right"></i
        ></span> -->
        <Pagging></Pagging>
      </div>
    </div>
  </div>
</template>
<script>
import myDropdown from "../dropdown/myDropdown.vue";
import  Pagging from "../pagging/Pagging.vue"
// import axios from "axios";
import { mapActions, mapState } from 'vuex';
export default {
  data: function () {
    return {
      paggingRange: [
        { value: "10", text: "10" },
        { value: "20", text: "20" },
        { value: "30", text: "30" },
        { value: "50", text: "50" },
      ],
    };
  },
  props: {
  },
  components: {
    myDropdown,
    Pagging,
  },
  methods: {
    ...mapActions(["incrementPageNumber","decrementPageNumber","filterEmployee"]),
    /**
     * Nhận số bản ghi từ drop gửi lên và gọi api theo số bản ghi đó
     * @param {number} value
     * Author: DTANh(25/10/2022)
     */
    // returnValue(value) {
    //   // if(value === this.recordPerPage) return;
    //   if (value > this.totalRecord) {
    //     this.paggingIndex = 1;
    //   }
    //   axios
    //     .get(
    //       `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${value}&pageNumber=${this.paggingIndex}`
    //     )
    //     .then((res) => {
    //       this.totalRecord = res.data.TotalRecord;
    //       if (this.totalRecord === 0) return;
    //       let data = res.data.Data?.map((item) => ({
    //         ...item,
    //         isChecked: false,
    //       }));
    //       this.setEmployees(data);
    //       this.TotalPage = res.data.TotalPage;
    //       this.recordPerPage = value;
    //       this.eventBus.emit("recordPerPage", this.recordPerPage);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    /**
     * Chuyển trang trước
     * @param {number} value
     * Author: DTANh(25/10/2022)
     */
    // prevPage: function () {
    //   if(this.pageNumber === 1 ) return;
    //   this.$store.dispatch("decrementPageNumber")
    //   this.$store.dispatch("filterEmployee", { pageSize: this.$store.state.pageSize, pageNumber: this.$store.state.pageNumber });
    // },
    // /**
    //  * Chuyển trang sau
    //  * @param {number} value
    //  * Author: DTANh(25/10/2022)
    //  */
    // nextPage: function () {
    //   if(this.pageNumber === this.totalPage ) return;
    //   console.log(this.pageNumber, this.totalPage)
    //   this.$store.dispatch("incrementPageNumber");
    //   this.$store.dispatch("filterEmployee", { pageSize: this.$store.state.pageSize, pageNumber: this.$store.state.pageNumber });
    // },
  },
  computed: {
    startPage: function () {
      return (this.pageNumber - 1) * this.pageSize + 1;
    },
    endPage: function () {
      if (this.pageNumber * this.pageSize > this.totalRecord) {
        return this.totalRecord;
      } else {
        return this.pageNumber * this.pageSize;
      }
    },
    ...mapState(["pageSize", "pageNumber","listEmployee","totalRecord","totalPage"]),
  },
  // created() {
  //   this.eventBus.emit("reloadData", {
  //     returnValue: this.returnValue,
  //     recordPerPage: this.recordPerPage,
  //   });
  // },
  watch: {
    pageNumber: function () {
      this.$store.dispatch("filterEmployee", { pageSize: this.$store.state.pageSize, pageNumber: this.$store.state.pageNumber })
    },
    pageSize: function () {
      this.$store.dispatch("filterEmployee", { pageSize: this.$store.state.pageSize, pageNumber: this.$store.state.pageNumber })
    },
  }
};
</script>
<style lang="css" scoped>
.pagging__range {
  display: flex;
  align-items: center;
}
.pagging-dropdown {
  width: 60px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pagging-dropdown > div:focus {
  border-color: var(--primary-color);
}
.input__dropdown__pagging {
  border-color: var(--border-color);
  user-select: none;
}
.pagging-dropdown:hover {
  background-color: var(--input-hover-color);
}
.pagging__range__number {
  background: transparent;
  color: var(--text-color);
  font-weight: 600;
  outline: none;
  border: none;
  margin-right: 4px;
}
.wrap__pagging {
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 16px;
  position: sticky;
  left: 0;
  right: 0;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 17px;
  padding: 12px 12px 12px 0;
}

.total__documents .number__documents {
  font-weight: 600;
}
.pagging--range-numberPage {
  display: flex;
  align-items: center;
  gap: 0 16px;
}
.pagging .pagging__option {
  padding: 4px 8px;
  cursor: pointer;
}

.pagging .pagging__option.disable {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagging .pagging__number.active {
  border: 1px solid #cecece;
}
</style>
