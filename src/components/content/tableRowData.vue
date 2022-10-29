<template lang="">
  <tr class="table__body" :class="{checked: checked}">
    <td class="headcol">
      <!-- <myCheckbox @rowChecked="selectRow" :id="code"></myCheckbox> -->
      <label class="checkbox custom__checkbox" :for-html="id">
        <input
          type="checkbox"
          :id="id"
          hidden
          v-model="checked"
          @change="rowChecked"
          :checked="isChecked"
        />       
        <div v-if="checked" class="wrap__icon-custom">
          <i class="icofont-check-alt"></i>
        </div>
      </label>
    </td>
    <td>{{ code }}</td>
    <td>{{ fullName }}</td>
    <td>
      {{ gender == 1 ? "Nữ" : gender == 0 ? "Nam" : gender == 2 ? "Khác" : "" }}
    </td>
    <td class="text-center">
      {{ DateOfBirth && new Date(DateOfBirth).toLocaleDateString("vi-VN") }}
    </td>
    <td>125816832</td>
    <td>Nhân viên</td>
    <td>VP01</td>
    <td>Văn Phòng 01</td>
    <td></td>
    <td></td>
    <td></td>
    <td>21510002190948</td>
    <td>BIDV</td>
    <td></td>
    <td>Cổ nhuế - Bắc từ liêm -hà nội</td>
    <td>0961494001</td>
    <td class="text-right">5.000.000</td>
    <td
      class="lastcol text-center"
      :style="{ zIndex: showContextMenu ? 3 : 0 }"
    >
      <div class="wrap__context">
        <button class="context__btn-edit">Sửa</button>
        <div
          class="context__icon"
          @click="handleClickContextIcon"
          :class="{ show: showContextMenu }"
        ></div>
        <div class="context__menu" :class="{ active: showContextMenu }">
          <div class="context__menu__item" @click.self="handleDelete">
            <a> Xóa </a>
          </div>
          <div class="context__menu__item">
            <a> Nhân bản </a>
          </div>
          <div class="context__menu__item">
            <a> Xóa </a>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>
<script>
export default {
  data: function () {
    return {
      rowSelect: false,
      showContextMenu: false,
      checked:false,
    };
  },
  components: {
  },
  props: {
    fullName: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
    },
    DateOfBirth: {
      type: String,
    },
    id: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
    },
    isCheckAll: {
      type: Boolean,
    },
  },
  methods: {
    rowChecked() {
      
    },
    // selectRow() {
    //   this.$emit("selectRow", this.id);
    // },
    handleClickContextIcon() {
      this.showContextMenu = !this.showContextMenu;
    },
    handleDelete() {
      this.$emit("deleteRow", { id: this.$props.id, option: true });
    },
  },
};
</script>
<style lang="css">
.table__body td {
  height: 48px;
  /* line-height: 48px; */
  vertical-align: middle;
  white-space: nowrap;
  text-align: left;
  padding: 0 16px;
  border-bottom: 1px solid #cecece;
  transition: all 0.1s;
}
.table__body td.text-center {
  text-align: center;
}
.table__body td.text-right {
  text-align: right;
}
.table__body {
  border-bottom: 1px solid #cecece;
}
.table__body td:last-child {
  border-right: unset;
}
.table__body td:nth-child(1) {
  text-align: center;
}
.table__body td:nth-child(1) {
  position: sticky;
  left: 0;
  z-index: 3;
  background-color: #fff;
}
.table__body td:nth-child(2) {
  position: sticky;
  left: 50px;
  z-index: 3;
  background-color: #fff;
}
td.lastcol {
  position: sticky;
  right: 0;
  background-color: #fff;
  z-index: 2;
  /* border-left: 1px dashed #cecece; */
}
.table__body td {
  /* border-right: 1px dashed #cecece; */
  font-size: 13px;
}
.table__body td:first-child:hover .custom__checkbox {
  background-color: #fff;
}
.table__body:hover > td {
  background-color: var(--hover-color);
}
.table__body.checked > td {
  background-color: var(--hover-color);
}
.wrap__context {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
}
.context__btn-edit {
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  padding: 4px;
  color: var(--primary-color);
  font-weight: 700;
}
.context__icon {
  background: url("../../assets/images/Sprites.64af8f61.svg");
  background-position: -892px -359px;
  width: 26px;
  height: 18px;
  padding: 4px 8px;
  cursor: pointer;
  position: relative;
}
.context__icon.show {
  border: 1px solid var(--primary-color);
}
.context__icon:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 10px;
  background-color: transparent;
  bottom: -6px;
  left: 0;
}

.context__menu {
  position: absolute;
  width: 130px;
  top: 100%;
  padding: 8px 0;
  right: 0;
  display: none;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #cecece;
  z-index: 999;
}

.context__menu.active {
  display: block;
}

.context__menu__item {
  padding: 0 8px;
  width: 100%;
  cursor: pointer;
  transition: all 0.1s;
  height: 24px;
  align-items: center;
  display: flex;
}
.context__menu__item:hover {
  background-color: #e0e0e0;
  color: var(--primary-color);
}
.context__menu__item a {
  display: block;
  font-size: 13px;
  line-height: 17px;
}
.custom__checkbox {
  width: 18px;
  height: 18px;
  border: 1px solid #cecece;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
</style>
