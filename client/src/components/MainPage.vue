<template>
  <div class="hello">

    <app-navbar :showLogin="true" :showRegister="true"/>

    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <div class="row">
          <div class="col">
              <h1 class="display-4 text-white">SmartAgro</h1>
              <p class="lead">Control agriculture in a smart way</p>
          </div>
          <div class="col text-right">
            <img src="../assets/leaf.svg" width="160" alt="">
          </div>
        </div>
      </div>
      </div>
    </div>

</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    "app-navbar": Navbar
  }
};
</script>

<style scoped>
.jumbotron {
  background: linear-gradient(to left, #66bb6a, #43a047);
}
</style>