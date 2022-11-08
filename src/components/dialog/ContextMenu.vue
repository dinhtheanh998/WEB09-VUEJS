<template lang="">
  <div class="context__menu" :style="{top: (coord.top+ coord.height + 1)+'px', left: (coord.right - 130)+'px'}">
    <div class="context__menu__item" @click="emmitClickDelete">
      <a> Xóa </a>
    </div>
    <div class="context__menu__item">
      <a> Nhân bản </a>
    </div>
    <div class="context__menu__item">
      <a> Xóa </a>
    </div>
  </div>
</template>
<script>
export default {
    props: {
        coord: {
            type:Object,
        },
        item: {
            type: Object,
        }
    },
    methods: {
      emmitClickDelete() {
        debugger
        console.log(this.item.EmployeeID)
            this.$emit("clickDelete", this.item.EmployeeId);
        }
    }
};
</script>
<style lang="css" scoped>

.context__menu {
  position: fixed;
  width: 130px;  
  padding: 8px 0;
  display: block;
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
