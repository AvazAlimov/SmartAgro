<template>
    <div class="container-fluid text-center" >
      <img :src="active" class="main-image img-thumbnail m-1">
      <br>
      <div class="image-container">
          <div v-for="i in images" v-bind:key="i._id" style="white-space: nowrap;">
            <div class="slide-image m-1">
              <img :src="APIBase + i.filename" class="img-thumbnail" v-on:click="clickImage(APIBase + i.filename)">
              <p>{{ new Date(i.created_at).toLocaleTimeString("ru", options) }}</p>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  props: ["rkey"],
  data() {
    return {
      APIBase: "http://www.agridata.uz/",
      active: "",
      images: [],
      options: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    };
  },
  methods: {
    loadImages: function() {
      var vm = this;
      if (vm.r_key === "") return;
      DataService.loadImages(vm.rkey, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(response => {
          if (response.status === 200) {
            vm.images = response.data;
            if (vm.images.length > 0)
              vm.active = vm.APIBase + vm.images[0].filename;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickImage: function(value) {
      this.active = value;
    }
  },
  created() {
    this.loadImages();
  }
};
</script>

<style>
.main-image {
  width: 480px;
}
.image-container {
  display: flex;
  width: 100%;
  overflow: auto;
}
.slide-image {
  cursor: pointer;
  display: inline-block !important;
  width: 200px;
}
</style>
