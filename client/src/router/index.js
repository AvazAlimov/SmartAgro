import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/components/MainPage";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";
import AdminLogin from "@/components/AdminLogin";
import AdminHome from "@/components/AdminHome";

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
    },
    {
      path: "/adminlogin",
      name: "AdminLogin",
      component: AdminLogin
    },
    {
      path: "/adminhome",
      name: "AdminHome",
      component: AdminHome
    },
  ]
});
