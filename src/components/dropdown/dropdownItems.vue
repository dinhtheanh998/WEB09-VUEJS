<template lang="">
  <div class="dropdown__item" @click="doFunc" :data-value="dataValue">
    {{ item.text || item.DepartmentName }}
  </div>
</template>
<script>
import {mapMutations} from "vuex"
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
      if(this.item.value) {
        this.$store.commit("setPageSize", this.item.value);
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
    ...mapMutations(["setPageSize"])
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
</style>
