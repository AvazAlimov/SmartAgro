<template>
    <div id="station">
    <div class="card bg-white p-4 shadow-sm">
        <h4>Add a new station</h4>
            <div>
            <div class="form-row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="read key" v-model="station.r_key">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="write key" v-model="station.w_key">
                </div>
                <div class="col">
                    <button class="btn btn-success btn-block" v-on:click="insertStation">
                        Add
                    </button>
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
import AdminService from "../../services/AdminService.js";

export default {
  data: function() {
    return {
      station: {
        w_key: "",
        r_key: ""
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
    this.loadStations();
  }
};
</script>

<style>
</style>
