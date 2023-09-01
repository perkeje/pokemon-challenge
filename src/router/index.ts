import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayView from "../views/PlayView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import RegistrationSubmit from "../views/RegistrationSubmit.vue";
import Verification from "../views/Verification.vue";
import NotVerified from "../views/NotVerified.vue";
import ResetPasswordVue from "@/views/ResetPassword.vue";
import ResetPasswordRequestVue from "@/views/ResetPasswordRequest.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/registration-submitted",
      name: "registration-submitted",
      component: RegistrationSubmit,
    },
    {
      path: "/not-verified",
      name: "not-verified",
      component: NotVerified,
    },
    {
      path: "/auth/verify/:token",
      name: "verify",
      component: Verification,
    },
    {
      path: "/auth/password-reset/:token",
      name: "reset",
      component: ResetPasswordVue,
    },
    {
      path: "/reset-request",
      name: "reset-request",
      component: ResetPasswordRequestVue,
    },
    {
      path: "/play",
      name: "play",
      component: PlayView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not_found",
      component: NotFoundView,
    },
  ],
});

export default router;
