<template>
    <div class="login">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6 col-12 card bg-white shadow border-light">
                    <div class="card-body text-center">
                        <h3 class="font-weight-light text-muted">AUTHENTICATION</h3>
                        <hr>
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="login" v-model="admindata.login">
                            <br>
                            <input class="form-control form-control-lg" type="password" placeholder="password" v-model="admindata.password">
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
import AdminService from "../services/AdminService.js";

export default {
  data() {
    return {
      auth_error: "",
      admindata: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    submit: function() {
      this.auth_error = "";
      var vm = this;
      AdminService.login({
        login: this.admindata.login,
        password: this.admindata.password
      })
        .then(response => {
          if (response.status === 200) {
            localStorage.setItem("admintoken", response.data.token);
            localStorage.setItem(
              "admindata",
              JSON.stringify({
                login: vm.admindata.login,
                password: vm.admindata.password
              })
            );
            this.$router.push({ name: "AdminHome" });
          }
        })
        .catch(function(error) {
          vm.auth_error = error.response.data.message;
        });
    }
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
