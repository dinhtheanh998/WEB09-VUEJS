<template lang="">
  <div class="dropdown" :id="id" :class="{'dropdown--forcus': isOpen, isValidate: isValidate !=''  }"> 
    <button
      :class="{ isActive: isOpen }"
      class="dropdown__label"
      @click.prevent="isOpen = !isOpen"
    >
      <div class="dropdown__label--text">{{defaultValue }}</div>
      <div class="dropdown__icon" :class="{open : isOpen , 'icon-top':moveToTop}">
        <i class="icofont-caret-down"></i>
      </div>
    </button>
    <div class="dropdown-list" :class="{ top: moveToTop, bottom:moveToBot }" v-if="isOpen">
      <Item
        v-for="(item, index) in arrays"
        :key="index"
        :item="item"
        :closeDropdown="callToClose"
        :selectedValue="selectedValue"
        :changePaggingRange="changePaggingRange"
        :dataValue="item.value || item.DepartmentId"
        @returnValue="returnValue"
      >
      </Item>
    </div>
  </div>
</template>
<script>
import Item from "./DropdownItems.vue";
export default {
  components: {
    Item,
  },
  data() {
    return {
      isOpen: false,
      value: "",
    };
  },
  props: {
    arrays: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
    moveToTop: {
      type: Boolean,
      default: false,
    },
    moveToBot: {
      type: Boolean,
      default: false,
    },
    changePaggingRange: {
      type: Function,
      default: () => {},
    },
    defaultValue: {
      type: [Number, String],
    },
    isValidate: {
      type: String,
    }
  },
  methods: {
    callToClose() {
      this.isOpen = false;
    },
    selectedValue(value) {
      this.value = value;
      this.callToClose();
    },
    returnValue(value) {
      this.$emit("returnDepartments", value);
      this.$emit("returnPaggingRange", value);
    },
    close(e) {
      if(!e.target.closest(`#${this.id}`)){
        this.isOpen = false;
      }
    }
  },
  // created() {
  //   this.$emit("returnPaggingRange", 10);
  // },
  mounted(){
    document.addEventListener('click', this.close)
  },
  unmounted() {
    document.removeEventListener('click', this.close)
  },
};
</script>
<style lang="css" scoped>
 @import url("../../css/component/dropdown.css");
 .dropdown.isValidate{
   border: 1px solid red;
 }
</style>
