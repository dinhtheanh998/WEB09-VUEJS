<template lang="">
  <div class="dialog" :style="[zIndex ? 'z-index: 9999999' : '']">
    <div class="dialog__overlay"></div>
    <div class="dialog__container flex-col">
      <div class="dialog__body--title">{{titleDialog}}</div>
      <div class="dialog__body flex align-center gap-x-16 grow-1">
        <div class="dialog__body-type" :class="type" v-show="type"></div>
        <div class="dialog__body-description">
          {{ description }}
        </div>
      </div>
      <div
        class="dialog__footer flex gap-x-8"
        :class="[btnTextSecondary ? 'justify-end' : 'justify-end']"
      >
        <myButton
          v-show="btnTextSecondary"
          :btnText="btnTextSecondary"
          isSecondary
          @click="handleDeleteFalse"
        ></myButton>
        <div class="flex gap-x-8">
          <myButton
            v-show="btnSecondaryChoseNo"
            :btnText="btnSecondaryChoseNo"
            isSecondary
            @click="handleSecondaryChoseNo"
          ></myButton>
          <myButton
            :btnText="btnTextPrimary"
            isPrimary
            @click="handleDeleteTrue"
            :color="color"
          ></myButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import myButton from "../Button/MyButtonPrimary.vue";
export default {
  props: {
    description: {
      type: String,
      default: "",
    },
    handleDeleteFalse: {
      type: Function,
    },
    handleDeleteTrue: {
      type: Function,
    },
    handleSecondaryChoseNo: {
      type: Function,
    },
    type: {
      type: String,
      default:null
    },
    btnTextPrimary: {
      type: String,
      default: "Có",
    },
    btnTextSecondary: {
      type: String,
      default: null,
    },
    btnSecondaryChoseNo: {
      type: String,
    },
    zIndex: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "",
    },
    titleDialog: {
      type: String,
      default: "Thông báo",
    }
  },
  components: {
    myButton,
  },
  computed: {
    ...mapState(["dialogData"])
  },
  methods: {},
};
</script>
<style lang="css" scoped>
.dialog {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  justify-content: center;
  align-items: center;
  display: flex;
}
.dialog__container {
  background-color: #fff;
  padding: 24px;
  border-radius: 4px;
  min-width: 400px;
  max-width: 450px;
}

.dialog__body {
  padding: 24px 0;
  border-bottom: 1px solid var(--border-color);
}
.dialog__footer {
  padding-top: 24px;

}

.dialog__body--title {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  color: var(--text-color);
}
.dialog__body-description {
  color: var(--text-color);
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 18px;
}

.dialog__body-type {
  flex-shrink: 0;
}
.dialog__body-type.warning {
  width: 36px;
  height: 36px;
  background-image: url(../../assets/images/Sprites.64af8f61.svg);
  background-position: -598px -463px;
}
.dialog__body-type.error {
  width: 36px;
  height: 36px;
  background-image: url(../../assets/images/Sprites.64af8f61.svg);
  background-position: -752px -462px;
}

.dialog__body-type.question {
  width: 36px;
  height: 36px;
  background-image: url(../../assets/images/Sprites.64af8f61.svg);
  background-position: -832px -462px;
}

.dialog__body-type.info {
  width: 36px;
  height: 36px;
  background-image: url(../../assets/images/Sprites.64af8f61.svg);
  background-position: -672px -462px;
}
</style>
