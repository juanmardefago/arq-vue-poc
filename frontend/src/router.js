import Vue from "vue";
import Router from "vue-router";
import AccommodationList from "./components/AccommodationList.vue";
import UnapprovedAccommodationList from "./components/UnapprovedAccommodationList.vue";
import AccommodationForm from "./components/AccommodationForm.vue";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
import CreateCustomUser from "./components/CreateCustomUser.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: "/new-user",
      name: "new-user",
      component: CreateCustomUser,
      beforeEnter: (to, from, next) => {
        const { permissions } = store.state;
        if (permissions !== "admin") {
          next(from.path);
        } else {
          next();
        }
      }
    },
    {
      path: "/unapproved-accommodations",
      name: "unapproved-accommodations",
      component: UnapprovedAccommodationList,
      beforeEnter: (to, from, next) => {
        const { permissions } = store.state;
        if (permissions !== "admin") {
          next(from.path);
        } else {
          next();
        }
      }
    },
    {
      path: "*",
      redirect: "/signin"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { logged } = store.state;
  if (!logged && to.path !== "/signin" && to.path !== "/signup") {
    next("/signin");
  } else {
    next();
  }
});

export default router;
