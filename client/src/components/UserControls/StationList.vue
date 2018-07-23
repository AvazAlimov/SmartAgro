<template>
    <div class="row">
      <select class="custom-select" v-for="s in stations" v-bind:key="s._id">
        <option :value="s.r_key" v-on:click="$emit('setKey', s.r_key)">{{ s.r_key }}</option>
      </select>
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
        
      })
        .then(response => {
          if (response.status === 200) {
            vm.stations = response.data;
            if(vm.stations.length > 0)
              this.$emit('setKey', vm.stations[0].r_key);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created(value) {
    this.loadStations(value);
  }
};
</script>

<style>
</style>