<template lang="">
  <div :class="classProps">
    <label :for="name" :class="{field__required : required}" :title="title">{{ label }}</label>
    <input
      :type="typeInput"
      class="input__custom primary-input" :class="{error: error}"
      :placeholder="placeholderText"
      :name="name"
      :id="name"
      :value="valueInput || ''"
      @blur="onChange"
      @input="onChange"
      ref="focusMe"
      :tabindex="tabIndex"
      autoforcus
    />
    <span class="input__text-error" :class="{show:error}" :title="error">{{error}}</span>
  </div>
</template>
<script>
import { SET_MODIFIED_FORM } from '@/store/Mutatios.Type';

export default {
  data: function () {
    return {
      dataInput: {
        type: String,
      },
    };
  },
  props: {
    typeInput: {
      type: String,
      default: "text",
    },
    classProps: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Label",
    },
    placeholderText: {
      type: String,
    },
    tabIndex: {
      type: String,
    },
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    error: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    valueInput: {
      type: [String, Date],
      default: "",
    },
    autoforcus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * gửi dữ liệu từ input lên component cha
     */
    onChange: function (event) {
      this.$store.commit(SET_MODIFIED_FORM,false)
      this.$emit("returnValue", {
        target: this.$props.name,
        value: event.target.value,
      });
    },
    /**
     * focus vào input
     */
    focus: function () {
    this.$refs.focusMe.focus()
    }
  },
  mounted() {
    /**
     * Auto focus vào input khi có props autoforcus
     */
    if (this.autoforcus) {     
      this.$refs.focusMe.focus();
    }
  }
};
</script>
<style lang="css">
.wrap__textfield {
  gap: 8px 0;
  margin-bottom: 3px;
}
.wrap__textfield > label {
  font-size: 13px;
  font-weight: 600;
  color: #666666;
}

.field__required:after {
  content: "*";
  color: #ff0000;
}
.primary-input {
  min-width: 75px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  outline: none;
  height: 36px;
  padding: 0px 8px 0px 12px;
  font-size: 14px;
  line-height: 18px;
}
.primary-input::placeholder {
  font-style: italic;
  opacity: 0.7;
}
.primary-input:focus {
  border-color: var(--primary-color)
}
.primary-input.error{
  border-color: var(--error-color);
}
.input__text-error {
  opacity: 0;
  visibility: hidden;
  display: block;
  font-size: 12px;
  color: var(--error-color);
  height: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 13px;
}
.input__text-error.show {
  opacity: 1;
  visibility: visible;
}
</style>
