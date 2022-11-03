<template lang="">
  <div class="dropdown__item" @click="doFunc" :data-value="dataValue" :class="{active: pageSize == dataValue || dataValue == Employee.DepartmentId}">
    {{ item.text || item.DepartmentName }}
  </div>
</template>
<script>
import { CHANGE_PAGE_NUMBER, CHANGE_PAGE_SIZE } from "@/store/Mutatios.Type";
import {mapMutations, mapState} from "vuex"
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    closeDropdown: {
      type: Function,
      default: () => {},
    },
    selectedValue: {
      type: Function,
      default: () => {},
    },
    changePaggingRange: {
      type: Function,
      default: () => {},
    },
    dataValue: {
      type: String,
      default: "",
    },
  },
  methods: {
    doFunc() {
      this.selectedValue(this.item.text || this.item.DepartmentName);
      this.closeDropdown();
      if (this.item.value) {
        console.log(this.pageNumber)
        let newTotalRecord = this.pageNumber * Number(this.item.value);
        
        if(newTotalRecord > this.totalRecord){
          this.$store.commit(CHANGE_PAGE_NUMBER,1);
        }
        this.$store.commit(CHANGE_PAGE_SIZE, this.item.value);
        
      }
      this.$emit(
        "returnValue",
        this.item.value || {target: "department" ,value: {
        departmentName: this.item.DepartmentName,
        deparmentID: this.item.DepartmentId,
      }}
      );
    },
  },
  computed: {
    ...mapMutations([CHANGE_PAGE_SIZE]),
    ...mapState(["pageNumber", "pageSize","totalRecord","Employee"]),
  },
};
</script>
<style lang="css" scoped>
.dropdown__item {
  height: 36px;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.dropdown__item:hover {
  background-color: var(--hover-color);
}
.dropdown__item.active {
  background-color: var(--hover-color);
}
</style>
