<template>
    <div class="login">
        <app-navbar/>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6 col-12 card bg-white shadow border-light">
                    <div class="card-body text-center">
                        <h3 class="font-weight-light text-muted">AUTHENTICATION</h3>
                        <hr>
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="email" placeholder="@email" v-model="userdata.email">
                            <br>
                            <input class="form-control form-control-lg" type="password" placeholder="@password" v-model="userdata.password">
                            <label for="">{{ auth_error }}</label>
                            <button class="btn btn-lg btn-block btn-outline-success" v-on:click="submit">LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from "./Navbar";
import UserService from "../services/UserService.js";

export default {
  data() {
    return {
      auth_error: "",
      userdata: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submit: function() {
      this.auth_error = "";
      var vm = this;
      UserService.login({
        email: this.userdata.email,
        password: this.userdata.password
      })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
              "userdata",
              JSON.stringify({
                username: response.data.username,
                email: vm.userdata.email,
                password: vm.userdata.password
              })
            );
            this.$router.push({ name: "Home" });
          }
        })
        .catch(function(error) {
          console.log(error);
          vm.auth_error = error.response.data.message;
        });
    }
  },
  components: {
    "app-navbar": Navbar
  }
};
</script>

<style scoped>
@media (max-width: 576px) {
  .card {
    min-width: 100% !important;
  }
}

@media (max-width: 768px) {
  .card {
    min-width: 90% !important;
  }
}
.card {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
