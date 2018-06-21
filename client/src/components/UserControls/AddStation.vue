<template>
    <div class="modal fade" id="addStationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Add Station</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Station Key:</label>
                    <div class="col-sm-9">
                    <input type="text" class="form-control" id="inputPassword" placeholder="station key" v-model="r_key">
                     <small class="form-text text-muted" v-text="error_message"></small>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" v-on:click="addStation">Add Station</button>
                <button type="button" class="btn btn-danger">Remove Station</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "../../services/UserService";
export default {
  data: function() {
    return {
      r_key: "",
      error_message: ""
    };
  },
  methods: {
    addStation: function() {
      var vm = this;
      vm.error_message = "";
      UserService.addStation(
        {
          r_key: vm.r_key
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => {
          if (response.status === 200) {
            this.error_message = response.data.message;
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.$router.push({ name: "Login" });
          } else if (error.response.status === 400) {
            vm.error_message = error.response.data.message;
          }
        });
    }
  }
};
</script>

<style>
</style>
