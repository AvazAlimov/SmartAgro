<template>
        <div class="admin">
          <header class="admin__header border">
            <router-link class="logo" :to="{ name: 'Home'}">
                <img src="../assets/logo.png" class="mr-2" width="50" alt=""> SmartAgro
            </router-link>
            <div class="toolbar">
              <station-list class="m-1" ref="stations" v-on:setKey="setKey" style="line-height: 70px;"/>
              <button class="btn rounded rounded--primary" data-toggle="modal" data-target="#addStationModal">Add/Remove Station</button>
            </div>
          </header>

          <nav class="admin__nav border-right">
            <div class="nav flex-column nav-pills" style="width: 100%;">
              <a class="nav-link active pl-4" data-toggle="pill" href="#" role="tab" v-on:click="setSection('dashboard')"><icon name="home" class="icon mr-2" scale="1.2"></icon> Dashboard</a>
              <a class="nav-link pl-4" data-toggle="pill" href="#" role="tab" v-on:click="setSection('data')"><icon name="database" class="icon mr-2" scale="1.2"></icon> Station Data</a>
              <a class="nav-link pl-4" data-toggle="pill" href="#" role="tab" v-on:click="setSection('picture')"><icon name="image" class="icon mr-2" scale="1.2"></icon> Pictures</a>
              <div class="dropdown-divider"></div>
              <a class="nav-link pl-4" href="#" v-on:click="logout"><icon name="power-off" class="icon mr-2" scale="1.2"></icon> Logout</a>
            </div>
          </nav>
          
          <main class="admin__main">
            <div class="row" v-if="section === 'dashboard'">
              <div class="col-md-6 mb-4">
                <h1>Dashboard</h1>
              </div>
            </div>

            <div class="row" v-if="section === 'data'">
              <div class="col-md-6 mb-4">
                <div class="card bg-white p-4">
                  <line-chart-temperature :rkey="rkey" ref="temperature"></line-chart-temperature>
                </div>
              </div>

              <div class="col-md-6 mb-4">
                <div class="card bg-white p-4">
                  <line-chart-humidity :rkey="rkey" ref="humidity"></line-chart-humidity>
                </div>
              </div>
              
              <div class="col-md-6 mb-4">
                <div class="card bg-white p-4">
                  <line-chart-windspeed :rkey="rkey" ref="windspeed"></line-chart-windspeed>
                </div>
              </div>

              <div class="col-md-6 mb-4">
                <div class="card bg-white p-4">
                  <line-chart-winddirection :rkey="rkey" ref="winddirection"></line-chart-winddirection>
                </div>
              </div>

              <div class="col-md-6 mb-4">
                <div class="card bg-white p-4">
                  <line-chart-rainunit :rkey="rkey" ref="rainunit"></line-chart-rainunit>
                </div>
              </div>

              <div class="col-md-6 mb-4">
                <div class="card bg-white p-4">
                  <line-chart-status :rkey="rkey" ref="status"></line-chart-status>
                </div>
              </div>
            </div>

            <div class="row" v-if="section === 'picture'">
                <pictures :rkey="rkey" ref="picture"></pictures>
            </div>
          </main>

          <!-- Modals -->
          <add-station v-on:addStation="addStation"/>
        </div>
</template>

<script>
import UserService from "../services/UserService.js";
import AddStation from "./UserControls/AddStation";
import StationList from "./UserControls/StationList";
import Temperature from "./UserControls/Temperature";
import Humidity from "./UserControls/Humidity";
import WindSpeed from "./UserControls/WindSpeed";
import RainUnit from "./UserControls/RainUnit";
import Status from "./UserControls/Status";
import WindDirection from "./UserControls/WindDirection";
import Picture from "./UserControls/Picture";

export default {
  data: function() {
    return {
      section: "dashboard",
      rkey: ""
    };
  },
  components: {
    "add-station": AddStation,
    "station-list": StationList,
    "line-chart-temperature": Temperature,
    "line-chart-humidity": Humidity,
    "line-chart-windspeed": WindSpeed,
    "line-chart-rainunit": RainUnit,
    "line-chart-status": Status,
    "line-chart-winddirection": WindDirection,
    "pictures": Picture
  },
  methods: {
    setSection: function(value) {
      this.section = value;
    },
    logout: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("userdata");
      this.$router.push({ name: "MainPage" });
    },
    addStation: function() {
      this.$refs.stations.loadStations();
    },
    setKey: function(value) {
      this.rkey = value;
      if(this.section === "data") {
        this.$refs.temperature.loadData();
        this.$refs.humidity.loadData();
        this.$refs.windspeed.loadData();
        this.$refs.winddirection.loadData();
        this.$refs.rainunit.loadData();
        this.$refs.status.loadData();
      } else if(this.section === "picture") {
        this.$refs.picture.loadImages();
      }
    },
    check: function() {
      var vm = this;
      if (localStorage.getItem("token") !== null) {
        UserService.check({
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
          .then(response => {
            if ((vm.isLogedIn = response.status === 200)) {
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

<style lang="scss">
$admin-header-height: 70px;
$admin-nav-width: 200px;

*,
*::before,
*::after {
  box-sizing: border-box;
}
.admin {
  --spacing: 1rem;
  display: flex;
  flex-wrap: wrap;
  display: grid;
  height: 100vh;
  grid-template-rows: $admin-header-height 1fr;
  grid-template-columns: $admin-nav-width 1fr;
  grid-template-areas: "header header" "nav    main";
}
.admin__header {
  display: flex;
  flex-basis: 100%;
  grid-area: header;
  height: $admin-header-height;
  background-color: white;
  position: relative;
}
.admin__nav {
  grid-area: nav;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: white;
}
.admin__main {
  flex: 1;
  grid-area: main;
  padding: var(--spacing);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background-color: #f4f7fa;
}
@media screen and (min-width: 48rem) {
  .admin {
    --spacing: 2rem;
  }
}
.logo {
  display: flex;
  flex: 0 0 $admin-nav-width;
  height: $admin-header-height;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0;
  color: #000;
  font-size: 1rem;
}
.logo:hover {
  color: #000;
  text-decoration: none;
}
.menu {
  list-style-type: none;
  padding: 0;
}
.nav-pills .nav-link {
  font-size: 1.1em;
  color: #555;
}
.nav-pills .nav-link.active {
  border-radius: 0;
  background-color: #56bf89;
}
.toolbar {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing);
}
.rounded {
  display: inline-block;
  border-radius: 5em !important;
  border: 0;
  padding: 0.5rem 1rem;
  white-space: nowrap;

  &--primary {
    color: #fff;
    background-color: #56bf89 !important;
  }
}
.icon {
  display: inline;
  display: inline-table;
  display: inline-block;
  vertical-align: middle;
}
</style>