<template lang="">
  <div class="wrap__input--icon">
    <input
      type="text"
      class="input__search"
      placeholder="Tìm theo mã, tên nhân viên"
    />
    <div class="search__icon"></div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Tìm theo mã, tên nhân viên",
    },
  },
};
</script>
<style lang="css" scoped>
.wrap__input--icon {
  height: 32px;
  max-width: 300px;
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  /* border: 1px solid #cecece; */
}
.input__search {
  border: 1px solid var(--border-color);
  /* border: none; */
  outline: none;
  width: 100%;
  height: 100%;
  padding-right: 33px;
  padding-left: 10px;
  border-radius: 4px;
}
.input__search::placeholder {
  font-style: italic;
}
.input__search:focus {
  border: 1px solid var(--primary-color);
}
.search__icon {
  width: 20px;
  height: 20px;
  background-image: url("../../assets/images/Sprites.64af8f61.svg");
  background-position: -991px -358px;
  position: absolute;
  left: auto;
  right: 8px;
  cursor: pointer;
}
</style>
