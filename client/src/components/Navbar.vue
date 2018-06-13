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
      <ul class="navbar-nav mr-auto" v-if="!isLogedIn">
        <!-- <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Register</a>
        </li> -->
        <router-link class="nav-link" :to="{ name: 'Login'}">Login</router-link>
        <router-link class="nav-link" to="/register">Register</router-link>
      </ul>
      <ul class="navbar-nav mr-auto" v-if="isLogedIn">
        <div class="dropdown">
            <a class="btn toggle btn-sm" href="#" role="button" id="dropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-user fa-lg"></i>
            </a>
            <div class="dropdown-menu shadow-sm" aria-labelledby="dropdownProfile">
              <a class="dropdown-item border-bottom mb-2" href="#">
                <div class="media">
                  <i class="fa fa-user-circle-o fa-2x mr-2 align-self-center"></i>
                  <div class="media-body pt-3">
                    <p>{{ userdata.username }}<br>{{ userdata.email }}</p>
                  </div>
                </div></a>
              <a class="dropdown-item" href="#"><i class="fa fa-plus-circle mr-3"></i>Add / Remove station</a>
              <a class="dropdown-item" href="#"><i class="fa fa-cog mr-3"></i>Account settings</a>
              <a class="dropdown-item" href="#"><i class="fa fa-key mr-3"></i>Licensing</a>
              <a class="dropdown-item" href="#"><i class="fa fa-question-circle  mr-3"></i>Help</a>
              <a class="dropdown-item" href="#"><i class="fa fa-shield  mr-3"></i>Privacy and Terms</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" v-on:click="logout"><i class="fa fa-power-off mr-3"></i>Logout</a>
            </div>
        </div>
        <a class="btn toggle btn-sm" id="station_toggle" href="#" role="button" v-on:click="toggleStation">
          <i class="fa fa-wifi fa-lg"></i>
        </a>
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
  name: "Navbar",
  props: ["showLogout"],
  methods: {
    logout: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      this.check();
      var banned_routes = ["Home"];
      if (banned_routes.includes(this.$route.name))
        this.$router.push({ name: "MainPage" });
    },
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
              var banned_routes = ["Login", "Register"];
              if (banned_routes.includes(this.$route.name))
                this.$router.push({ name: "MainPage" });
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
    },
    toggleStation: function() {
      var stations = document.getElementById("station_container");
      stations.classList.toggle("closed");
    }
  },
  created() {
    this.check();
  }
};
</script>

<style scoped>
.toggle {
  background-color: transparent;
  color: gray;
}
</style>