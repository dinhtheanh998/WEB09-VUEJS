<template lang="">
  <div class="content__body">
    <div class="wrap__content">
      <contentBodyTop></contentBodyTop>
      <div class="content__bottom">
        <contentBodyFunc></contentBodyFunc>
        <contentTableData :key="componentKey" :forceRender="forceRender" id="tableData"></contentTableData>
      </div>
    </div>
  </div>
</template>
<script>
import contentBodyTop from "../content/ContentBodyTop.vue";
import contentBodyFunc from "../content/ContentBodyFunc.vue";
import contentTableData from "../content/ContentTableData.vue";
import {TEXT} from '@/resource/ResourceVN';
export default {
  data: function () {
    return {
      componentKey: 0,
    };
  },
  components: {
    contentBodyTop,
    contentBodyFunc,
    contentTableData,
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    forceRender(){
      this.componentKey++
    },
  },
  created() {
    document.title = TEXT.titleBrowser;
  },
  
};
</script>
<style lang="css" scoped>
.content__body {
  width: 100%;
  height: calc(100vh - 56px);
  background-color: #f1f1f1;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 16px;
  padding-bottom: 12px;
}
.wrap__content {
  width: 100%;
  height: 100%;
}
.content__bottom {
  width: 100%;
  background-color: #fff;
  height: calc(100% - 36px - 16px);
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
