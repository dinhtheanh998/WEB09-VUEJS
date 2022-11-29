<template lang="">
  <div
    class="dropdown"
    :id="id"
    :class="{ 'dropdown--forcus': isOpen, isValidate: errorMesage }"
    @keydown="selectItemDrop"
  >
    <div class="flex wrap-dropdown">
      <input
        type="text"
        class="input__search"
        @click.prevent="isOpen = !isOpen"
        :value="defaultValue"
        :readonly="onlyRead"
        :tabindex="tabIndex"
        ref="inputref"
        @keydown.enter.prevent="pressShowDropdown"
        v-click-away = "onClickAway"
      />
      <div
        class="dropdown__icon"
        :class="{ open: isOpen, 'icon-top': moveToTop }"
        @click.prevent="isOpen = !isOpen"
      >
        <i class="icofont-caret-down"></i>
      </div>
    </div>
    <span class="input__text-error mt-8" :class="{ show: errorMesage }">{{
      errorMesage
    }}</span>
    <div
      class="dropdown-list"
      :class="{ top: moveToTop, bottom: moveToBot }"
      v-if="isOpen"
      ref="listDropdown"
      @keydown.enter.prevent="pressSelectByEnter"
    >
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
// import _ from "lodash";
import { mapState } from "vuex";
import { KEY_CODES } from "@/Enums/Enums";
export default {
  components: {
    Item,
  },
  data() {
    return {
      isOpen: false,
      value: "",
      isValidate: false,
      indexSelected: -1,
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
    onlyRead: {
      type: Boolean,
      default: true,
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
    errorMesage: {
      type: String,
      default: null,
    },
  },
  methods: {

    pressSelectByEnter() {
      this.$refs.listDropdown.children[this.indexSelected].click();
      this.$refs.inputref.focus();
    },

    /**
     *
     * Dùng phím để chọn item trong dropdown
     */
    selectItemDrop(e) {
      if (e.keyCode === KEY_CODES.ARROW_DOWN) { 
        if (this.indexSelected < this.arrays.length) {
          if(this.indexSelected === this.arrays.length - 1 ){
            this.indexSelected = 0;
          } else {
            this.indexSelected++;
          }
          this.$refs.listDropdown.children[this.indexSelected].focus();          
        }
      }
      if(e.keyCode === KEY_CODES.ARROW_UP){
        if (this.indexSelected < this.arrays.length) {
          if(this.indexSelected === 0){
            this.indexSelected = this.arrays.length- 1;
          }else {
            this.indexSelected--;
          }
          this.$refs.listDropdown.children[this.indexSelected].focus();
          this.$refs.listDropdown.scrollIntoView({ behavior: "smooth"});
        }
      }
    },

    /**
     * Đóng dropdown
     */
    callToClose() {
      this.isOpen = false;
    },
    /**
     * Chọn value hiển thị
     */
    selectedValue(value) {
      this.value = value;
      this.callToClose();
    },

    /**
     *  gửi value lên component cha
     */
    returnValue(value) {
      this.$emit("returnDepartments", value);
      this.$emit("returnPaggingRange", value);
      this.isValidate = false;
    },
    /**
     * đóng dropdown khi click ra ngoài
     */

    pressShowDropdown() {
      this.isOpen = !this.isOpen;
      // this.$refs.listDropdown.children[this.indexSelected].focus();
      // if(this.id === "dropdown__department"){
      //   this.isOpen = !this.isOpen;
      // }
    },

    onClickAway() {
      this.isOpen = false;
    },
    focus() {
      this.$refs.inputref.focus();
    },
  },

  computed: {
    ...mapState(["Employee", "errorValid"]),
  },

  // created() {
  //   window.addEventListener('click', this.clickOutSide)
  // },
  // unmounted() {
  //   window.addEventListener('click', this.clickOutSide)
  // },
};
</script>
<style lang="css" scoped>
@import url("../../css/component/dropdown.css");
.dropdown.isValidate .input__search {
  border: 1px solid red;
}
.wrap-dropdown {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
}
.dropdown__icon {
  position: absolute;
  right: 8px;
}
.input__search[read-only] {
  cursor: pointer;
}
.dropdown:focus,
.wrap-dropdown:focus {
  outline: none;
  border: 1px solid red;
}
</style>
