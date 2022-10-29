<template lang="">
  <div>hehe</div>
  <button @click="todo">Click here</button>
  <input type="text" @change="handleSearchData">
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      infos: [],
    };
  },
  computed: {    
    // ...mapGetters(["getDepartmentByName"]),
    ...mapState(["listEmployee", "listDepartment"]),
  },
  methods: {
    todo() {
      return this.getDepartmentByName("Phòng nhân sự");
    },
    handleSearchData(e) {
      
      this.searchEmployee(e.target.value);

      this.$store.dispatch("searchEmployee", e.target.value);
    },
    ...mapActions(["getAllDepartment","searchEmployee"])
  },
  // computed: mapState(["listEmployees"]),
  mounted() {
    this.getAllDepartment();
    // console.log(this.getAllEmployees)
  },
};
</script>
<style lang=""></style>
