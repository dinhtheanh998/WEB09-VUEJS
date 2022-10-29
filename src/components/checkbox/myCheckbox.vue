<template lang="">
  <label class="checkbox custom__checkbox" :for-html="id">
    <input type="checkbox" :id="id" hidden :checked="modelValue" @change="checkboxChange"/>
    <div v-if="modelValue" class="wrap__icon-custom">
      <i class="icofont-check-alt"></i>
    </div>
  </label>
</template>
<script>

export default {
  data: function () {
    return{
    }
  },  
  props: {
    id: {
      type: String,
      default: "tableCheck",
    },
    modelValue: {
      type: Boolean,
    },
  },
  methods: {
    checkboxChange() {
      this.$emit("checkboxChange");
    }
  },
};

</script>
<style lang="css">
.custom__checkbox {
  width: 18px;
  height: 18px;
  border: 1px solid #cecece;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: #fff;
}
.wrap__icon-custom {
  line-height: 17px;
  width: 100%;
  height: 100%;
  font-size: 20px;
  align-items: center;
  color: #007aff;
  justify-content: center;
  display: flex;
}
/* .custom__checkbox input:checked + div.wrap__icon-custom {
  display: flex;
} */
</style>
