<template>
  <div class="grid-container">
    
    <nav class="navbar navbar-expand-lg navbar-light shadow-sm bg-white" style="grid-column: 1 / span 3">
      <router-link class="nav-brand" to="/">
      <a class="navbar-brand" href="#">
        <img src="../assets/logo.png" width="50" alt=""> SmartAgro
      </a>
    </router-link>
    </nav>

    <div class="sidebar text-center sticky-top shadow-sm">
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a class="nav-link active" data-toggle="pill" href="#" role="tab"><icon name="microchip" scale="1.5" title="Stations"></icon></a>
        <a class="nav-link" data-toggle="pill" href="#" role="tab"><icon name="database" scale="1.5" title="Station Data"></icon></a>
      </div>
    </div>

    <div id="content">
      <div class="content">
        <div class="container-fluid mr-3 mt-3">

          <station-control/>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminService from "../services/AdminService.js";
import StationControl from "./AdminControls/Station";

export default {
  data: function() {
    return {
      admindata: {}
    };
  },
  methods: {
    check: function() {
      var vm = this;
      var token = localStorage.getItem("admintoken");
      if (
        token !== null &&
        AdminService.check({
          headers: { Authorization: "Bearer " + token }
        })
          .then(response => {
            if (response.status !== 200) {
              this.$router.push({ name: "MainPage" });
            }
          })
          .catch(error => {
            this.$router.push({ name: "MainPage" });
          })
      ) {
      }
    }
  },
  created() {
    this.check();
  },
  components: {
    "station-control": StationControl
  }
};
</script>

<style>
#app,
.grid-container {
  width: 100% !important;
  height: 100% !important;
}
.grid-container {
  display: grid;
  grid-template-columns: 60px fit-content(100%);
  grid-template-rows: 80px auto;
}
.sidebar {
  background-color: white !important;
}
.nav-pills .nav-link {
  color: #666666;
}
.nav-pills .nav-link.active {
  border-radius: 0;
  background-color: green;
}
#content {
  grid-column: 2 / span 2;
}
</style>