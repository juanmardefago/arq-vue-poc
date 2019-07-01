import Vue from "vue";
import Router from "vue-router";
import AccommodationList from "./components/AccommodationList.vue";
import AccommodationForm from "./components/AccommodationForm.vue";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/accommodations",
      name: "accommodations",
      component: AccommodationList
    },
    {
      path: "/accommodations-form",
      name: "accommodations-form",
      component: AccommodationForm
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    }
  ]
});
