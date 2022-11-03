<template lang="">
  <div
    class="toast"
    :class="{ show: toastState.show, success: toastState.type }"
  >
    <div class="toast__icon"><i class="icofont-check-circled"></i></div>
    <div class="toast__text">{{ toastState.message }}</div>
    <div class="toast--process"></div>
  </div>
  
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["toastState"]),
  },
};
</script>
<style lang="css" scoped>
.toast {
  position: fixed;
  top: 100px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0px 24px;
  padding: 10px 0;
  background-color: #28a745;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 999;
  height: 60px;
  min-width: 250px;
  transform: translateX(calc(100% + 50px));
  transition: all 0.1s linear;
  padding: 10px;
  border-radius: 4px;
  /* position: relative; */
}
.toast.show {
  transform: translateX(10%);
}
.toast.success {
}
.toast__icon {
  font-size: 24px;
  color: #fff;
  font-weight: 300;
}
.toast__text {
  font-size: 14px;
  color: #fff

}
.toast--process{
  width: 100%;
  height: 4px;
  background: #fff;
  position: absolute;
  bottom: 0;
  transition: all 2s linear;
  left: 0;
  border-bottom-left-radius: 4px;
}

.toast.show .toast--process{
  width: 0px;
}

/* @keyframes process {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
} */
</style>
