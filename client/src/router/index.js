import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/components/MainPage";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    }
  ]
});
