<template>
    <div>
        <div class="container">
            <div class="input-group mt-3">
                <input type="search" class="form-control form-control-sm" placeholder="search stations">
                <div class="input-group-append">
                <button type="button" class="btn btn-sm btn-outline-secondary">
                    <icon name="search"></icon>
                </button>
                </div>
            </div>
        </div>
        <div class="list-group list-group-flush mt-3" v-for="s in stations" v-bind:key="s._id">
            <a class="list-group-item list-group-item-action p-3">
                <small><strong>Key:</strong> {{ s.r_key }}</small>
            </a>
        </div>
    </div>
</template>

<script>
import UserService from "../../services/UserService";

export default {
  data: function() {
    return {
      stations: []
    };
  },
  methods: {
    loadStations() {
      var vm = this;
      UserService.loadStations({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(response => {
          if (response.status === 200) {
            vm.stations = response.data;
          }
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
