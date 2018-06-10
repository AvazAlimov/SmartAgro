// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import jquery from "../node_modules/jquery/dist/jquery.min.js";
import Vue from "vue";
import App from "./App";
import router from "./router";
import jQuery from "jquery";
import popper from "popper.js/dist/umd/popper.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

let bootstrap = require("bootstrap");

Vue.config.productionTip = false;
global.jQuery = jQuery;
global.popper = popper;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
