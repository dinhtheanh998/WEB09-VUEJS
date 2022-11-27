<template lang="">
    <div id="idolLam">
        Other Component
        <input type="text" v-model="text">
        <span>{{text}}</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: "1",
            text: "",
            number:1
        }
    },
    beforeCreate() {
        console.log("beforeCreated");
    },

    created() {
        document.title = "Amis - Quản lý tài sản";
    },

    beforeMount() {
        console.log("beforeMount");
    },

    mounted() {
        console.log("Mouted idol hải anh xong rồi")
    },

    beforeUpdate() {

        console.log("beforeUpdate");
    },

    updated() {
        console.log("updated");
    },

    unmounted() {
        console.log("Idol hải anh mãi đỉnh làm xong hết rồi")
    },
}
</script>
<style lang="">
    
</style>