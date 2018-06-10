<template>
    <div id="login">
        <app-navbar/>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-6 col-12 card bg-white shadow border-light">
                    <div class="card-body text-center">
                        <h3 class="font-weight-light text-muted">AUTHENTICATION</h3>
                        <hr>
                        <div class="form-group">
                            <input class="form-control form-control-lg" type="text" placeholder="@username" v-model="userdata.username">
                            <br>
                            <input class="form-control form-control-lg" type="email" placeholder="@email" v-model="userdata.email">
                            <br>
                            <input class="form-control form-control-lg" type="password" placeholder="@password" v-model="userdata.password">
                            <label class="error">{{ auth_error }}</label>
                            <button class="btn btn-lg btn-block btn-outline-success" v-on:click="submit">REGISTER</button>
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
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    submit: function() {
      var vm = this;
      vm.auth_error = "";
      UserService.signUp({
        username: this.userdata.username,
        email: this.userdata.email,
        password: this.userdata.password
      })
        .then(response => {
          if (response.status === 201) this.$router.push({ name: "Login" });
        })
        .catch(function(error) {
          console.log(error);
          if (error.response.status === 409)
            vm.auth_error = error.response.data.message;
          else if (error.response.status === 500)
            vm.auth_error = error.response.data.error;
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

.error {
  font-size: 1.3em;
  color: red;
}
</style>
