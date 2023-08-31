<script setup lang="ts">
import { type RouteLocationNormalized, useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(useUserStore());

const allowedRoutes = [
  "login",
  "register",
  "registration-submitted",
  "home",
  "not_found",
  "verify",
];
const redirectIfLogged = ["login", "register", "registration-submitted"];

// Call setRefreshSession only once, probably during the app initialization
userStore.setRefreshSession();

const checkIfLoggedIn = async (to: RouteLocationNormalized) => {
  if (userStore?.getCSRFHeader() && !user?.value) {
    await useUserStore().refreshSession();
  }

  if (allowedRoutes.includes(to.name as string)) {
    return;
  }
  // User has no token or has logged out
  if (!userStore?.getCSRFHeader() || !user?.value) {
    await router.replace("/login");
  }
};

// Navigation guard
router.beforeEach(async (to, from) => {
  await checkIfLoggedIn(to);

  if (
    user?.value &&
    userStore?.getCSRFHeader() &&
    redirectIfLogged.includes(to.name as string)
  ) {
    // Redirect to home if the user is already logged in and tries to access login/register
    await router.replace("/");
  }
});
</script>

<template>
  <slot></slot>
</template>
