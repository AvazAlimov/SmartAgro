// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import jquery from "../node_modules/jquery/dist/jquery.min.js";
import Vue from "vue";
import App from "./App";
import router from "./router";
import jQuery from "jquery";
import popper from "popper.js/dist/umd/popper.js";

import "bootstrap/dist/css/bootstrap.min.css";
let bootstrap = require("bootstrap");

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("icon", Icon);

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
