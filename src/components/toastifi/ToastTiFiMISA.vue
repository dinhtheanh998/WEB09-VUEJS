<template lang="">
    <div class="wrap-toastify" :class="{ show: toastState.show, success: toastState.type }">
        <div class="toastify__icon" :class="toastState.type">
            <i class="icofont-check"></i>
        </div>
        <div class="toastify-description "> <span class="description__text" :class="toastState.type">Thành công! </span>
            <span class="description__mess">{{toastState.message}}</span>
        </div>
        <div class="toastify__icon--close" @click="closeToast">
            <i class="icofont-close-line"></i>
        </div>
    </div>
</template>
<script>
import { SET_TOAST } from '@/store/Mutatios.Type';
import { mapState } from 'vuex';
export default {
    computed : {  
    ...mapState(["toastState"]),
    },
    methods: {
        closeToast() {
            this.$store.commit(SET_TOAST, {
                show: false,
                type: 'success',
                message: ''
            })
        }
    }
}
</script>
<style lang="css" scoped>
    .wrap-toastify {
        min-width: 450px;
        max-width: 650px;
        height: 56px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        padding: 0 16px;
        gap: 0 8px;
        position: fixed;
        top: 0;
        z-index: 999;
        left: 50%;
        transform: translate(-50%, -100%);
        transition: all 0.2s linear;
        font-size: 14px;
        line-height: 18px;
    }
    .wrap-toastify.show {
        transform: translate(-50%,100%);
    }
    .toastify__icon.success {
        /* background: url(../../assets/images/Sprites.64af8f61.svg);
        width: 20px;
        height: 20px;
        background-position: -1602px -258px; */
        width: 24px;
        height: 24px;
        background: #50B83C;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
    .toastify__icon > i {
        font-size: 20px;
    }
    .description__text {
        font-weight: 600;
    }

    .description__text.success {
        color: #50B83C;
    }
    .description__mess {
       
        color: var(--text-color)
    }
    .toastify-description {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
        flex: 1;
    }
    .toastify__icon--close {
        cursor: pointer;
    }
</style>