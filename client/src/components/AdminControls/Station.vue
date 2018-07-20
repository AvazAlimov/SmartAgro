<template>
    <div id="station">
      <div class="card bg-white p-4 shadow-sm">
          <div>
            <div class="form-row">
                <div class="col">
                  <h4>Add a new station</h4>
                  <hr>
                  <div class="mb-2">
                    <input type="text" class="form-control" placeholder="station name" v-model="station.name">
                  </div>
                  <div class="mb-2">
                    <input type="text" class="form-control" placeholder="read key" v-model="station.r_key">
                  </div>
                  <div class="mb-2">
                    <input type="text" class="form-control" placeholder="write key" v-model="station.w_key">
                  </div>
                  <div class="mb-2 row">
                    <div class="col">
                      <input type="text" class="form-control" placeholder="longitude" v-model="station.longitude">
                    </div>
                    <div class="col">
                      <input type="text" class="form-control" placeholder="latitude" v-model="station.latitude">
                    </div>
                  </div>
                  <hr>
                  <div class="mb-2">
                      <button class="btn btn-success btn-block" v-on:click="insertStation">
                          Add
                      </button>
                  </div>
                </div>
                <div class="col" style="height: 100%;">
                    <div id="map" class="map border">

                    </div>
                </div>
            </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-sm-12">
          <table class="table table-bordered table-light shadow-sm">
            <thead class="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Write Key</th>
                <th scope="col">Read Key</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="(s,index) in stations" v-bind:key="index">
              <tr>
                <th scope="row">{{ index + 1 }}.</th>
                <td>{{ s.w_key }}</td>
                <td>{{ s.r_key }}</td>
                <td>
                  <button class="btn btn-danger btn" v-on:click="deleteStation(s._id)">
                    <icon name="trash"></icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import Vue from "vue";
import AdminService from "../../services/AdminService.js";
import ymaps from "ymaps";

export default {
  data: function() {
    return {
      station: {
        name: "",
        w_key: "",
        r_key: "",
        longitude: 64.585262,
        latitude: 41.377491
      },
      stations: []
    };
  },
  methods: {
    loadStations: function() {
      AdminService.loadStations({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("admintoken")
        }
      }).then(response => {
        if (response.status === 200) {
          this.stations = response.data.stations;
        }
      });
    },
    insertStation: function() {
      var token = localStorage.getItem("admintoken");
      var vm = this;
      if (this.station.w_key !== "" && this.station.r_key !== "") {
        AdminService.insertStation(
          {
            w_key: vm.station.w_key,
            r_key: vm.station.r_key
          },
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json"
            }
          }
        )
          .then(response => {
            if (response.status === 201) vm.loadStations();
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    deleteStation: function(id) {
      var token = localStorage.getItem("admintoken");
      var vm = this;
      AdminService.deleteStation(id, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.status === 200) vm.loadStations();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    ymaps.load("https://api-maps.yandex.ru/2.1/?lang=ru_RU").then(maps => {
      const map = new maps.Map("map", {
        center: [41.3775, 64.5853]
      });
    });
    this.loadStations();
  }
};
</script>

<style>
.map {
  height: 310px;
}
</style>
