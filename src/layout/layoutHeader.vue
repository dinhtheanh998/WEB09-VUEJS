<template lang="">
    <div class="content__header">
        <leftHeader></leftHeader>
        <rightHeader></rightHeader>
    </div>
</template>
<script>

import leftHeader from "../components/header/LeftHeader.vue"
import rightHeader from "../components/header/RightHeader.vue"
export default {
    components: {
        leftHeader,
        rightHeader
    }
}
</script>
<style lang="css" scoped>
    .content__header {
    width: 100%;
    height: 56px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    color: #424242;
}
</style>