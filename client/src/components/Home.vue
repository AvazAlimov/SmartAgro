<template>
        <div class="grid-container">
          <app-navbar :showLogout="true" class="sticky-top" style="grid-column: 1 / span 3">
          </app-navbar>

          <div class="sidebar text-center shadow-sm">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <a class="nav-link active" data-toggle="pill" href="#" role="tab"><icon name="home" scale="1.5" title="Dashboard"></icon></a>
              <a class="nav-link" data-toggle="pill" href="#" role="tab"><icon name="database" scale="1.5" title="Station Data"></icon></a>
              <a class="nav-link" data-toggle="pill" href="#" role="tab"><icon name="cloud" scale="1.5" title="Weather Forecast"></icon></a>
              <a class="nav-link" data-toggle="pill" href="#" role="tab"><icon name="leaf" scale="1.5" title="Disease models"></icon></a>
              <a class="nav-link" data-toggle="pill" href="#" role="tab"><icon name="tint" scale="1.5" title="Soil moisture"></icon></a>
              <a class="nav-link" data-toggle="pill" href="#" role="tab"><icon name="cog" scale="1.5" title="Station settings"></icon></a>
            </div>
          </div>
          
          <div id="content">
            <div class="content">
              <div class="container-fluid mt-3">
                <div class="card bg-white p-4">
                  <line-chart-temperature :rkey="rkey"></line-chart-temperature>
                </div>
                <br>
                <div class="card bg-white p-4">
                  <line-chart-humidity :rkey="rkey"></line-chart-humidity>
                </div>
              </div>
            </div>

            <station-list id="station_container" class="shadow closed"/>
            
          </div>
          <!-- Modals -->
          <add-station/>
        </div>
</template>

<script>
import Navbar from "./Navbar";
import AddStation from "./UserControls/AddStation";
import StationList from "./UserControls/StationList";
import Temperature from "./UserControls/Temperature";
import Humidity from "./UserControls/Humidity";

export default {
  data: function() {
    return {
      rkey: "aGZ8Le0wI7"
    };
  },
  components: {
    "app-navbar": Navbar,
    "add-station": AddStation,
    "station-list": StationList,
    "line-chart-temperature": Temperature,
    "line-chart-humidity": Humidity
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
  position: fixed;
  margin-top: 80px;
  background-color: white !important;
  height: 100%;
}
.nav-pills .nav-link {
  color: #666666;
}
.nav-pills .nav-link.active {
  border-radius: 0;
  background-color: green;
}
#content {
  display: grid;
  grid-template-columns: auto fit-content(100%);
  grid-column: 2 / span 2;
}
.content {
  width: 100% !important;
}
#station_container {
  position: fixed;
  right: 0;
  height: 100%;
  background-color: white;
  width: 250px !important;
  transform: translate3d(0, 0px, 0px);
  -webkit-transform: translate3d(0, 0px, 0px);
  -webkit-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
}
#station_container.closed {
  transform: translate3d(100%, 0px, 0px);
  -webkit-transform: translate3d(100%, 0px, 0px);
}
</style>