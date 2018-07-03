<template>
<nav class="navbar navbar-expand-lg navbar-light shadow-sm bg-white">
  <div class="container">
    <router-link class="nav-brand" to="/">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" width="50" alt=""> SmartAgro
      </a>
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container">
    </div>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-link" :to="{ name: 'Login'}">Login</router-link>
        <router-link class="nav-link" to="/register">Register</router-link>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import UserService from "../services/UserService.js";

export default {
  data: function() {
    return {
      isLogedIn: false,
      userdata: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    check: function() {
      var vm = this;
      if (localStorage.getItem("token") !== null) {
        UserService.check({
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
          .then(response => {
            if ((vm.isLogedIn = response.status === 200)) {
              if (localStorage.getItem("userdata") !== null) {
                vm.userdata.username = JSON.parse(
                  localStorage.getItem("userdata")
                ).username;
                vm.userdata.email = JSON.parse(
                  localStorage.getItem("userdata")
                ).email;
              }
              var banned_routes = ["Login", "Register", "MainPage"];
              if (banned_routes.includes(this.$route.name))
                this.$router.push({ name: "Home" });
            }
          })
          .catch(error => {
            if (error.response.status === 401) {
              var banned_routes = ["Home"];
              if (banned_routes.includes(this.$route.name))
                this.$router.push({ name: "MainPage" });
            }
          });
      } else {
        vm.showLogin = vm.showRegister = true;
        vm.isLogedIn = false;
        var banned_routes = ["Home"];
        if (banned_routes.includes(this.$route.name))
          this.$router.push({ name: "MainPage" });
      }
    }
  },
  created() {
    this.check();
  }
};
</script>

<style scoped>
icon {
  margin: 10px;
}
</style>