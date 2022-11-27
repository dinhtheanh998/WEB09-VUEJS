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
        <!-- <span>Tổng bản ghi/trang:</span> -->
        <myDropdown
          id="dropdown__range--pagging"
          :arrays="paggingRange"
          moveToTop
          :defaultValue="pageSize + ' bản ghi trên trang'"
          isValidate         
        ></myDropdown>
      </div>
      <div class="flex align-center gap-x-16">       
        <Pagging></Pagging>
      </div>
    </div>
  </div>
</template>
<script>
import myDropdown from "../dropdown/MyDropdown.vue";
import  Pagging from "../pagging/Pagging.vue"
// import axios from "axios";
import { mapActions, mapState } from 'vuex';
export default {
  data: function () {
    return {
      paggingRange: [
        { value: "10", text: "10 bản ghi trên 1 trang" },
        { value: "20", text: "20 bản ghi trên 1 trang" },
        { value: "30", text: "30 bản ghi trên 1 trang" },
        { value: "50", text: "50 bản ghi trên 1 trang" },
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
    
  },
  
  
  computed: {
    /**
     * Tính bản ghi bắt đầu của trang hiện tại
     */
    startPage: function () {
      return (this.pageNumber - 1) * this.pageSize + 1;
    },
    /**
     * Tính bản ghi kết thúc của trang hiện tại
     */
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
    /**
     * Theo dõi page number thay đổi để thực hiện load lại dữ liệu
     */
    pageNumber: function () {
      this.$store.dispatch("filterEmployee", { pageSize: this.$store.state.pageSize, pageNumber: this.$store.state.pageNumber })
    },
    /**
     * Theo dõi page size thay đổi để thực hiện load lại dữ liệu
     */
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
  width: 200px;
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
